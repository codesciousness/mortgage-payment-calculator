import express, { Request, Response } from 'express';
import db from '../db/mongo';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import escape from 'validator/lib/escape';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { formatAmount } from '../util/calculations';
import { validateName, validateEmail, validateCurrency, validateNumber, validateDate } from '../util/data-validation';
import 'dotenv/config';

const Router = express.Router();

const IN_PROD = process.env.NODE_ENV === 'production';

Router.post('/loans', async (req: Request, res: Response) => {
    let { name, email, homePrice, downPayment, loanTerm, interestRate, startDate, propertyTax, homeInsurance,
        privateMortgageInsurance, hoaFees, mortgagePayment, monthlyPayment, loanAmount, loanCost, totalInterest,
        payoffDate 
    } = req.body;

    const rawValues = [name, email, homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance,
        privateMortgageInsurance, hoaFees, mortgagePayment, monthlyPayment, loanAmount, loanCost, totalInterest
    ];

    rawValues.forEach(value => {
        if (typeof value === 'string') {
            value = value.trim();
            value = escape(value);
        }
    });

    let emailHtml: string;
    email = normalizeEmail(email, { gmail_remove_dots: false });
    startDate = `${startDate.slice(5,7)}/${startDate.slice(0,4)}`;
    mortgagePayment = formatAmount(mortgagePayment);
    
    const numStrings = [homePrice, downPayment.dollar, downPayment.percent, propertyTax.dollar,
        propertyTax.percent, homeInsurance.dollar, homeInsurance.percent, privateMortgageInsurance.dollar,
        privateMortgageInsurance.percent, hoaFees.dollar, hoaFees.percent, mortgagePayment, monthlyPayment, 
        loanAmount, loanCost, totalInterest
    ];

    const nums = [loanTerm, interestRate];

    const dates = [startDate, payoffDate];

    const numStringNames = ['home price', 'down payment dollar', 'down payment percentage',
        'property tax dollar', 'property tax percentage', 'home insurance dollar', 'home insurance percentage',
        'PMI dollar', 'PMI percentage', 'HOA fees dollar', 'HOA fees percentage', 'mortgage payment', 
        'monthly payment', 'loan amount', 'loan cost', 'total interest'
    ];

    const numNames = ['loan term, interest rate'];

    const dateNames = ['start date', 'payoff date'];

    if (!name || !email) {
        return res.status(400).send('Please provide a name and email address.');
    }

    if (!validateName(name)) {
        return res.status(400).send('Invalid name format.');
    }

    if (!validateEmail(email)) {
        return res.status(400).send('Invalid email address.');
    }

    for (const [index, value] of numStrings.entries()) {
        const inputName = numStringNames[index];
        if (!validateCurrency(value)) {
            return res.status(400).send(`Invalid ${inputName} format.`);
        };
    };

    for (const [index, value] of nums.entries()) {
        const inputName = numNames[index];
        if (!validateNumber(value)) {
            return res.status(400).send(`Invalid ${inputName} format.`);
        };
    };

    for (const [index, value] of dates.entries()) {
        const inputName = dateNames[index];
        if (!validateDate(value)) {
            return res.status(400).send(`Invalid ${inputName} format.`);
        };
    };

    const sanitizedAndValidated = { name, email, homePrice, downPayment, loanTerm, interestRate, startDate, propertyTax, homeInsurance,
        privateMortgageInsurance, hoaFees, mortgagePayment, monthlyPayment, loanAmount, loanCost, totalInterest, payoffDate
    };

    try {
        emailHtml = fs.readFileSync(path.join(__dirname, '../../email/email.html'), 'utf8');
    }
    catch (err) {
        console.error(err);
    }

    emailHtml = emailHtml.replace('nameVariable', name.split(' ')[0]);
    emailHtml = emailHtml.replace('homePriceVariable', homePrice);
    emailHtml = emailHtml.replace('downPaymentVariable', downPayment.dollar);
    emailHtml = emailHtml.replace('interestRateVariable', interestRate);
    emailHtml = emailHtml.replace('loanTermVariable', loanTerm);
    emailHtml = emailHtml.replace('startDateVariable', startDate);
    emailHtml = emailHtml.replace('principalVariable', mortgagePayment);
    emailHtml = emailHtml.replace('propertyTaxVariable', propertyTax.dollar);
    emailHtml = emailHtml.replace('homeInsuranceVariable', homeInsurance.dollar);
    emailHtml = emailHtml.replace('PMIVariable', privateMortgageInsurance.dollar);
    emailHtml = emailHtml.replace('HOAFeesVariable', hoaFees.dollar);
    emailHtml = emailHtml.replace('monthlyPaymentVariable', monthlyPayment);
    emailHtml = emailHtml.replace('loanAmountVariable', loanAmount);
    emailHtml = emailHtml.replace('totalInterestVariable', totalInterest);
    emailHtml = emailHtml.replace('loanCostVariable', loanCost);
    emailHtml = emailHtml.replace('payoffDateVariable', payoffDate);

    const plainText = `
    Mortgage Loan Payment Summary
    
    Loan Details

    Hi, ${name.split(' ')[0]}! Here is your requested home loan information.

    Home Price: $${homePrice}
    Down Payment: $${downPayment.dollar}
    Interest Rate: ${interestRate}%
    Loan Term: ${loanTerm} Years
    Start Date: ${startDate}

    Monthly Payment Breakdown

    Principal & Interest: $${mortgagePayment}
    Property Tax: $${propertyTax.dollar}
    Homeowner's Insurance: $${homeInsurance.dollar}
    Private Mortgage Insurance: $${privateMortgageInsurance.dollar}
    HOA Fees: $${hoaFees.dollar}
    Total Monthly Payment: $${monthlyPayment}

    Loan Totals & Payoff Date

    Loan Amount: $${loanAmount}
    Total Interest Paid: $${totalInterest}
    Total Cost of Loan: $${loanCost}
    Payoff Date: ${payoffDate}
    `;

    async function sendEmail() {
        let mailConfig;
        const testAccount = await nodemailer.createTestAccount();

        if (IN_PROD) {
            mailConfig = {
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN
                }
            } as nodemailer.TransportOptions;
        }
        else {
            mailConfig = {
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                }
            };
        }
    
        const transporter = nodemailer.createTransport(mailConfig);
    
        const emailInfo = await transporter.sendMail({
            from: `"Mortgage Payment Calculator" <${process.env.EMAIL_USERNAME}@gmail.com>`,
            to: `${name} <${email}>`,
            subject: "Mortgage Loan Payment Summary",
            text: plainText,
            html: emailHtml,
            attachments: [
                {
                    filename: 'img1.jpg',
                    path: `${__dirname}/../../email/images/towfiqu-barbhuiya-05XcCfTOzN4-unsplash.jpg`,
                    cid: 'img1'
                },
                {
                    filename: 'img2.jpg',
                    path: `${__dirname}/../../email/images/tierra-mallorca-rgJ1J8SDEAY-unsplash.jpg`,
                    cid: 'img2'
                },
                {
                    filename: 'img3.jpg',
                    path: `${__dirname}/../../email/images/tierra-mallorca-JXI2Ap8dTNc-unsplash.jpg`,
                    cid: 'img3'
                }
            ]
        });
    
        console.log('Message sent: %s', emailInfo.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(emailInfo));
    }
    
    let existingLoan;
    const loanId = uuidv4();
    const loanData = { ...sanitizedAndValidated };
    const newLoan = { ...sanitizedAndValidated, loanId };
    try {
        existingLoan = await db.loans.findLoan(email);
    }
    catch (err) {
        return res.status(500).send('Internal Server Error');
    };
    if (existingLoan) {
        const currTime = Date.now();
        const timeIntervalDiffInMin = (currTime - existingLoan.lastUpdated) / (1000 * 60);
        if (timeIntervalDiffInMin < 1) {
            return res.status(400).send('Limit exceeded. Please wait 1 minute between loan update requests.');
        }
        try {
            const updatedLoan = await db.loans.updateLoan(existingLoan.loanId, loanData);
            sendEmail().catch(err => res.status(500).send('Error sending email.'));
            return res.send(updatedLoan);
        }
        catch (err) {
            return res.status(500).send('Internal Server Error');
        };
    }
    else {
        try {
            const addedLoan = await db.loans.addLoan(newLoan);
            sendEmail().catch(err => res.status(500).send('Error sending email.'));
            return res.send(addedLoan);
        }
        catch (err) {
            return res.status(500).send('Internal Server Error');
        };
    };
});

export default Router;