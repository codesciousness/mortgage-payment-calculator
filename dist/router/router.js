"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_1 = __importDefault(require("../db/mongo"));
const nodemailer = __importStar(require("nodemailer"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const uuid_1 = require("uuid");
const escape_1 = __importDefault(require("validator/lib/escape"));
const normalizeEmail_1 = __importDefault(require("validator/lib/normalizeEmail"));
const calculations_1 = require("../util/calculations");
const data_validation_1 = require("../util/data-validation");
require("dotenv/config");
const Router = express_1.default.Router();
const IN_PROD = process.env.NODE_ENV === 'production';
Router.post('/loans', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, homePrice, downPayment, loanTerm, interestRate, startDate, propertyTax, homeInsurance, privateMortgageInsurance, hoaFees, mortgagePayment, monthlyPayment, loanAmount, loanCost, totalInterest, payoffDate } = req.body;
    const rawValues = [name, email, homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance,
        privateMortgageInsurance, hoaFees, mortgagePayment, monthlyPayment, loanAmount, loanCost, totalInterest
    ];
    rawValues.forEach(value => {
        if (typeof value === 'string') {
            value = value.trim();
            value = (0, escape_1.default)(value);
        }
    });
    let emailHtml;
    email = (0, normalizeEmail_1.default)(email, { gmail_remove_dots: false });
    startDate = `${startDate.slice(5, 7)}/${startDate.slice(0, 4)}`;
    mortgagePayment = (0, calculations_1.formatAmount)(mortgagePayment);
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
    if (!(0, data_validation_1.validateName)(name)) {
        return res.status(400).send('Invalid name format.');
    }
    if (!(0, data_validation_1.validateEmail)(email)) {
        return res.status(400).send('Invalid email address.');
    }
    for (const [index, value] of numStrings.entries()) {
        const inputName = numStringNames[index];
        if (!(0, data_validation_1.validateCurrency)(value)) {
            return res.status(400).send(`Invalid ${inputName} format.`);
        }
        ;
    }
    ;
    for (const [index, value] of nums.entries()) {
        const inputName = numNames[index];
        if (!(0, data_validation_1.validateNumber)(value)) {
            return res.status(400).send(`Invalid ${inputName} format.`);
        }
        ;
    }
    ;
    for (const [index, value] of dates.entries()) {
        const inputName = dateNames[index];
        if (!(0, data_validation_1.validateDate)(value)) {
            return res.status(400).send(`Invalid ${inputName} format.`);
        }
        ;
    }
    ;
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
    function sendEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            let mailConfig;
            const testAccount = yield nodemailer.createTestAccount();
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
            const emailInfo = yield transporter.sendMail({
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
        });
    }
    let existingLoan;
    const loanId = (0, uuid_1.v4)();
    const loanData = Object.assign({}, sanitizedAndValidated);
    const newLoan = Object.assign(Object.assign({}, sanitizedAndValidated), { loanId });
    try {
        existingLoan = yield mongo_1.default.loans.findLoan(email);
    }
    catch (err) {
        return res.status(500).send('Internal Server Error');
    }
    ;
    if (existingLoan) {
        const currTime = Date.now();
        const timeIntervalDiffInMin = (currTime - existingLoan.lastUpdated) / (1000 * 60);
        if (timeIntervalDiffInMin < 1) {
            return res.status(400).send('Limit exceeded. Please wait 1 minute between loan update requests.');
        }
        try {
            const updatedLoan = yield mongo_1.default.loans.updateLoan(existingLoan.loanId, loanData);
            sendEmail().catch(err => res.status(500).send('Error sending email.'));
            return res.send(updatedLoan);
        }
        catch (err) {
            return res.status(500).send('Internal Server Error');
        }
        ;
    }
    else {
        try {
            const addedLoan = yield mongo_1.default.loans.addLoan(newLoan);
            sendEmail().catch(err => res.status(500).send('Error sending email.'));
            return res.send(addedLoan);
        }
        catch (err) {
            return res.status(500).send('Internal Server Error');
        }
        ;
    }
    ;
}));
exports.default = Router;
//# sourceMappingURL=router.js.map