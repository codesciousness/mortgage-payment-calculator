import express, { Request, Response } from 'express';
const Router = express.Router();
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { stringToNum, formatAmount } = require('../util/calculations');

const IN_PROD = process.env.NODE_ENV === 'production';

Router.post('/loans', async (req: Request, res: Response) => {
    const { name, email, homePrice, downPayment, loanTerm, interestRate, startDate, propertyTax, homeInsurance,
        privateMortgageInsurance, hoaFees, mortgagePayment, monthlyPayment, loanAmount, loanCost, totalInterest,
        payoffDate } = req.body;

    let emailHtml: string;

    if (!name || !email) {
        return res.status(400).send('Please provide a name and email address.');
    }

    try {
        emailHtml = fs.readFileSync(path.join(__dirname, '../../email/email.html'), 'utf8');
    }
    catch (err) {
        console.error(err);
    }

    const startDateFormatted = `${startDate.slice(5,7)}/${startDate.slice(0,4)}`;
    const mPP = (stringToNum(mortgagePayment)/stringToNum(monthlyPayment)) * 100;
    const pTP = (stringToNum(propertyTax.dollar)/stringToNum(monthlyPayment)) * 100;
    const hIP = (stringToNum(homeInsurance.dollar)/stringToNum(monthlyPayment)) * 100;
    const pMIP = (stringToNum(privateMortgageInsurance.dollar)/stringToNum(monthlyPayment)) * 100;
    const hFP = (stringToNum(hoaFees.dollar)/stringToNum(monthlyPayment)) * 100;

    emailHtml = emailHtml.replace('nameVariable', name.split(' ')[0]);
    emailHtml = emailHtml.replace('homePriceVariable', homePrice);
    emailHtml = emailHtml.replace('downPaymentVariable', downPayment.dollar);
    emailHtml = emailHtml.replace('interestRateVariable', interestRate);
    emailHtml = emailHtml.replace('loanTermVariable', loanTerm);
    emailHtml = emailHtml.replace('startDateVariable', startDateFormatted);
    emailHtml = emailHtml.replace('principalVariable', formatAmount(mortgagePayment));
    emailHtml = emailHtml.replace('propertyTaxVariable', propertyTax.dollar);
    emailHtml = emailHtml.replace('homeInsuranceVariable', homeInsurance.dollar);
    emailHtml = emailHtml.replace('PMIVariable', privateMortgageInsurance.dollar);
    emailHtml = emailHtml.replace('HOAFeesVariable', hoaFees.dollar);
    emailHtml = emailHtml.replace('monthlyPaymentVariable', monthlyPayment);
    emailHtml = emailHtml.replace('loanAmountVariable', loanAmount);
    emailHtml = emailHtml.replace('totalInterestVariable', totalInterest);
    emailHtml = emailHtml.replace('loanCostVariable', loanCost);
    emailHtml = emailHtml.replace('payoffDateVariable', payoffDate);
    emailHtml = emailHtml.replace('radial-gradient(white 40%, transparent 41%), conic-gradient(paleturquoise 0% 5%, powderblue 5% 10%, lightskyblue 10% 20%, deepskyblue 20% 35%, steelblue 35%);', 
    `radial-gradient(white 40%, transparent 41%), conic-gradient(paleturquoise ${hFP}%, powderblue ${hFP}% ${hFP + pMIP}%, lightskyblue ${pMIP}% ${pMIP + hIP}%, deepskyblue ${hIP}% ${hIP + pTP}%, steelblue ${pTP}%);`);

    const plainText = `
    Mortgage Loan Payment Summary
    
    Loan Details

    Hi, ${name.split(' ')[0]}! Here is your requested home loan information.

    Home Price: $${homePrice}
    Down Payment: $${downPayment.dollar}
    Interest Rate: ${interestRate}%
    Loan Term: ${loanTerm} Years
    Start Date: ${startDateFormatted}

    Monthly Payment Breakdown

    Principal & Interest: $${formatAmount(mortgagePayment)}
    Property Tax: $${propertyTax.dollar}
    Homeowner's Insurance: $${homeInsurance.dollar}
    Private Mortgage Insurance: $${privateMortgageInsurance.dollar}
    HOA Fees: $${hoaFees.dollar}

    Loan Totals

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
            };
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
        from: '"Mortgage Payment Calculator" <codesciousness@gmail.com>',
        to: `${name} <${email}>`,
        subject: "Mortgage Loan Payment Summary",
        text: plainText,
        html: emailHtml,
        });
    
        console.log('Message sent: %s', emailInfo.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(emailInfo));
    }
    
    sendEmail().catch(console.error);

    const loanId = uuidv4();
    const loan = { loanId, ...req.body }
    const loans = req.app.locals.mongo.loans;
    try {
        const response = await loans.addLoan(loan);
        return res.send(response);
    }
    catch (err) {
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = Router;