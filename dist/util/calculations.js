"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calc = exports.toPercent = exports.fromPercent = exports.formatDecimal = exports.formatAmount = exports.fixDecimalInput = exports.fixDecimal = exports.round = exports.dateToString = exports.numToString = exports.stringToNum = exports.addCommas = exports.rmvCommas = exports.isInt = void 0;
const isInt = (num) => {
    let number;
    typeof num === 'string' ? number = (0, exports.stringToNum)(num) : number = num;
    return Number.isInteger(number);
};
exports.isInt = isInt;
const rmvCommas = (num) => {
    return num.split(',').join('');
};
exports.rmvCommas = rmvCommas;
const addCommas = (num) => {
    let numString;
    typeof num === 'number' ? numString = (0, exports.numToString)(num) : numString = (0, exports.rmvCommas)(num);
    return numString.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
exports.addCommas = addCommas;
const stringToNum = (str) => {
    const num = parseFloat((0, exports.rmvCommas)(str));
    return num || 0;
};
exports.stringToNum = stringToNum;
const numToString = (num) => {
    return `${num}`;
};
exports.numToString = numToString;
const dateToString = (date) => {
    let month;
    const currMonth = date.getMonth() + 1;
    const year = date.getFullYear();
    currMonth < 10 ? month = `0${currMonth}` : month = currMonth;
    return `${month}/${year}`;
};
exports.dateToString = dateToString;
const round = (num) => {
    let number;
    if (num === '')
        return '';
    typeof num === 'string' ? number = (0, exports.stringToNum)(num) : number = num;
    return (0, exports.numToString)(Math.round(number));
};
exports.round = round;
const fixDecimal = (num) => {
    let number;
    if (num === '')
        return '';
    typeof num === 'string' ? number = (0, exports.stringToNum)(num) : number = num;
    return (0, exports.addCommas)(number.toFixed(2));
};
exports.fixDecimal = fixDecimal;
const fixDecimalInput = (num) => {
    let numString;
    let decimals;
    typeof num === 'number' ? numString = (0, exports.numToString)(num) : numString = num;
    decimals = numString.split('.')[1];
    if (decimals && decimals.length > 2)
        return numString.slice(0, numString.length - 1);
    else
        return numString;
};
exports.fixDecimalInput = fixDecimalInput;
const formatAmount = (num) => {
    return (0, exports.addCommas)((0, exports.round)(num));
};
exports.formatAmount = formatAmount;
const formatDecimal = (num) => {
    return (0, exports.addCommas)((0, exports.fixDecimalInput)(num));
};
exports.formatDecimal = formatDecimal;
const fromPercent = (percent, total) => {
    const percentNum = (0, exports.stringToNum)(percent) / 100;
    const totalNum = (0, exports.stringToNum)(total);
    const amount = percentNum * totalNum;
    return (0, exports.formatAmount)(amount);
};
exports.fromPercent = fromPercent;
const toPercent = (amount, total) => {
    const amountNum = (0, exports.stringToNum)(amount);
    const totalNum = (0, exports.stringToNum)(total);
    const percent = (amountNum / totalNum) * 100;
    if ((0, exports.isInt)(percent)) {
        return (0, exports.addCommas)(percent);
    }
    return (0, exports.fixDecimal)(percent);
};
exports.toPercent = toPercent;
exports.calc = {
    loanAmount: (homePrice, downPayment) => {
        const price = (0, exports.stringToNum)(homePrice);
        const paid = (0, exports.stringToNum)(downPayment);
        const loanAmount = (0, exports.formatAmount)(price - paid);
        return loanAmount;
    },
    mortgagePayment: (loanAmount, interestRate, loanTerm) => {
        const principal = (0, exports.stringToNum)(loanAmount);
        const r = (interestRate / 12) / 100;
        const n = loanTerm * 12;
        const mortgagePayment = principal * (r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1);
        return (0, exports.addCommas)(mortgagePayment);
    },
    monthlyPayment: (mortgagePayment, propertyTax, homeInsurance, privateMortgageInsurance, hoaFees) => {
        const payment = (0, exports.stringToNum)(mortgagePayment);
        const pT = (0, exports.stringToNum)(propertyTax);
        const hI = (0, exports.stringToNum)(homeInsurance);
        const pMI = (0, exports.stringToNum)(privateMortgageInsurance);
        const hF = (0, exports.stringToNum)(hoaFees);
        const monthlyPayment = (0, exports.formatAmount)(payment + pT + hI + pMI + hF);
        return monthlyPayment;
    },
    loanCost: (mortgagePayment, loanTerm) => {
        const payment = (0, exports.stringToNum)(mortgagePayment);
        const totalPayments = (0, exports.formatAmount)(payment * loanTerm * 12);
        return totalPayments;
    },
    totalInterest: (loanAmount, loanCost) => {
        const loan = (0, exports.stringToNum)(loanAmount);
        const totalPaid = (0, exports.stringToNum)(loanCost);
        const totalInterest = (0, exports.formatAmount)(totalPaid - loan);
        return totalInterest;
    },
    payoffDate: (startDate, loanTerm) => {
        const endDate = new Date(startDate.valueOf());
        const startYear = startDate.getFullYear();
        endDate.setFullYear(startYear + loanTerm);
        return (0, exports.dateToString)(endDate);
    },
    amortization: (loanAmount, mortgagePayment, interestRate, loanTerm, startDate) => {
        const loan = (0, exports.stringToNum)(loanAmount);
        const monthlyMortgage = (0, exports.stringToNum)(mortgagePayment);
        const r = (interestRate / 12) / 100;
        let n = loanTerm * 12;
        let payDate = new Date(startDate.valueOf());
        let loanBalance = loan;
        let interestPayment = loanBalance * r;
        let principalPayment = monthlyMortgage - interestPayment;
        let principalPaid = principalPayment;
        let interestPaid = interestPayment;
        loanBalance -= principalPayment;
        n--;
        let amortizationDetail = {
            date: (0, exports.dateToString)(payDate),
            principal: (0, exports.fixDecimal)(principalPayment),
            interest: (0, exports.fixDecimal)(interestPayment),
            remainingBalance: (0, exports.fixDecimal)(loanBalance),
            totalPrincipal: (0, exports.fixDecimal)(principalPaid),
            totalInterest: (0, exports.fixDecimal)(interestPaid)
        };
        const amortizationArr = [amortizationDetail];
        const nextPayDate = (date) => {
            const currMonth = date.getMonth();
            const currYear = date.getFullYear();
            const month = currMonth === 11 ? 0 : currMonth + 1;
            const year = currMonth === 11 ? currYear + 1 : currYear;
            date.setMonth(month);
            date.setFullYear(year);
        };
        while (n > 0) {
            nextPayDate(payDate);
            interestPayment = loanBalance * r;
            principalPayment = monthlyMortgage - interestPayment;
            loanBalance -= principalPayment;
            principalPaid += principalPayment;
            interestPaid += interestPayment;
            amortizationDetail = {
                date: (0, exports.dateToString)(payDate),
                principal: (0, exports.fixDecimal)(principalPayment),
                interest: (0, exports.fixDecimal)(interestPayment),
                remainingBalance: (0, exports.fixDecimal)(loanBalance),
                totalPrincipal: (0, exports.fixDecimal)(principalPaid),
                totalInterest: (0, exports.fixDecimal)(interestPaid)
            };
            amortizationArr.push(amortizationDetail);
            n--;
        }
        ;
        return amortizationArr;
    }
};
//# sourceMappingURL=calculations.js.map