export const isInt = (num: number | string): boolean => {
    let number: number;
    typeof num === 'string' ? number = stringToNum(num) : number = num;
    return Number.isInteger(number);
};

export const rmvCommas = (num: string): string => {
    return num.split(',').join('');
};

export const addCommas = (num: number | string): string => {
    let numString: string;
    typeof num === 'number' ? numString = numToString(num) : numString = rmvCommas(num);
    return numString.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const stringToNum = (str: string): number => {
    const num = parseFloat(rmvCommas(str));
    return num || 0;
};

export const numToString = (num: number): string => {
    return `${num}`;
};

export const dateToString = (date: Date): string => {
    let month;
    const currMonth = date.getMonth() + 1;
    const year = date.getFullYear();
    currMonth < 10 ? month = `0${currMonth}` : month = currMonth;
    return `${month}/${year}`;
};

export const round = (num: number | string): string => {
    let number: number;
    if (num === '') return '';
    typeof num === 'string' ? number = stringToNum(num) : number = num;
    return numToString(Math.round(number));
};

export const fixDecimal = (num: number | string): string => {
    let number: number;
    if (num === '') return '';
    typeof num === 'string' ? number = stringToNum(num) : number = num;
    return addCommas(number.toFixed(2));
};

export const fixDecimalInput = (num: number | string): string => {
    let numString: string;
    let decimals: string;
    typeof num === 'number' ? numString = numToString(num) : numString = num;
    decimals = numString.split('.')[1];
    if (decimals && decimals.length > 2) return numString.slice(0, numString.length - 1)
    else return numString;
};

export const formatAmount = (num: number | string): string => {
    return addCommas(round(num));
};

export const formatDecimal = (num: number | string): string => {
    return addCommas(fixDecimalInput(num));
};

export const fromPercent = (percent: string, total: string): string => {
    const percentNum = stringToNum(percent)/100;
    const totalNum = stringToNum(total);
    const amount = percentNum * totalNum;
    return formatAmount(amount);
};

export const toPercent = (amount: string, total: string): string => {
    const amountNum = stringToNum(amount);
    const totalNum = stringToNum(total);
    const percent = (amountNum / totalNum) * 100;
    if (isInt(percent)) {
        return addCommas(percent);
    }
    return fixDecimal(percent);
};

export const calc = {
    loanAmount: (homePrice: string, downPayment: string): string => {
        const price = stringToNum(homePrice);
        const paid = stringToNum(downPayment);
        const loanAmount = formatAmount(price - paid);
        return loanAmount;
    },
    mortgagePayment: (loanAmount: string, interestRate: number, loanTerm: number): string => {
        const principal = stringToNum(loanAmount);
        const r = (interestRate/12)/100;
        const n = loanTerm * 12
        const mortgagePayment = principal * (r*(1 + r)**n)/((1 + r)**n - 1);
        return addCommas(mortgagePayment);
    },
    monthlyPayment: (mortgagePayment: string, propertyTax: string, homeInsurance: string, privateMortgageInsurance: string, hoaFees: string) => {
        const payment = stringToNum(mortgagePayment);
        const pT = stringToNum(propertyTax);
        const hI = stringToNum(homeInsurance);
        const pMI = stringToNum(privateMortgageInsurance);
        const hF = stringToNum(hoaFees);
        const monthlyPayment = formatAmount(payment + pT + hI + pMI + hF);
        return monthlyPayment;
    },
    loanCost: (mortgagePayment: string, loanTerm: number): string => {
        const payment = stringToNum(mortgagePayment);
        const totalPayments = formatAmount(payment * loanTerm * 12);
        return totalPayments;
    },
    totalInterest: (loanAmount: string, loanCost: string): string => {
        const loan = stringToNum(loanAmount);
        const totalPaid = stringToNum(loanCost);
        const totalInterest = formatAmount(totalPaid - loan);
        return totalInterest;
    },
    payoffDate: (startDate: Date, loanTerm: number): string => {
        const endDate = new Date(startDate.valueOf());
        const startYear = startDate.getFullYear();
        endDate.setFullYear(startYear + loanTerm);
        return dateToString(endDate);
    },
    amortization: (loanAmount: string, mortgagePayment: string, interestRate: number, loanTerm: number, startDate: Date) => {
        const loan = stringToNum(loanAmount);
        const monthlyMortgage = stringToNum(mortgagePayment);
        const r = (interestRate/12)/100;
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
            date: dateToString(payDate),
            principal: fixDecimal(principalPayment),
            interest: fixDecimal(interestPayment),
            remainingBalance: fixDecimal(loanBalance),
            totalPrincipal: fixDecimal(principalPaid),
            totalInterest: fixDecimal(interestPaid)
        };
        const amortizationArr = [amortizationDetail];
        const nextPayDate = (date: Date) => {
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
                date: dateToString(payDate),
                principal: fixDecimal(principalPayment),
                interest: fixDecimal(interestPayment),
                remainingBalance: fixDecimal(loanBalance),
                totalPrincipal: fixDecimal(principalPaid),
                totalInterest: fixDecimal(interestPaid)
            };
            amortizationArr.push(amortizationDetail);
            n--;
        };
        return amortizationArr;
    }
};