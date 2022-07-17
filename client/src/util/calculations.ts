export const isInt = (num: number | string): boolean => {
    let number: number;
    if (typeof num === 'string') number = stringToNum(num)
    else number = num;
    return Number.isInteger(number);
};

export const rmvCommas = (num: string): string => {
    return num.replaceAll(',', '');
};

export const addCommas = (num: number | string): string => {
    let numString: string;
    if (typeof num === 'number') numString = numToString(num)
    else numString = rmvCommas(num);
    return numString.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const stringToNum = (str: string): number => {
    const num = parseFloat(rmvCommas(str));
    if (Number.isNaN(num)) return 0;
    return num;
};

export const numToString = (num: number): string => {
    return `${num}`;
};

export const dateToString = (date: Date): string => {
    return `${date.getMonth()}/${date.getFullYear()}`;
};

export const round = (num: number | string): string => {
    let number: number;
    if (num === '') return '';
    if (typeof num === 'string') number = stringToNum(num)
    else number = num;
    return numToString(Math.round(number));
};

export const fixDecimal = (num: number | string): string => {
    let numString: string;
    let decimals: string;
    if (typeof num === 'number') numString = numToString(num)
    else numString = rmvCommas(num);
    decimals = numString.split('.')[1];
    if (decimals && decimals.length > 2) return numString.slice(0, numString.length - 1)
    else return numString;
};

export const formatAmount = (num: number | string): string => {
    return addCommas(round(num));
};

export const formatPercent = (num: number | string): string => {
    return addCommas(fixDecimal(num));
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
    return addCommas(percent.toFixed(2));
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
        const r = interestRate/12;
        const n = loanTerm * 12
        const mortgagePayment = principal * (r*(1 + r)**n)/((1 + r**n) - 1);
        return formatAmount(mortgagePayment);
    },
    monthlyPayment: (mortgagePayment: string, propertyTaxes: string, homeInsurance: string, hoaFees: string, otherCosts: string) => {
        const payment = stringToNum(mortgagePayment);
        const pT = stringToNum(propertyTaxes);
        const hI = stringToNum(homeInsurance);
        const hF = stringToNum(hoaFees);
        const oC = stringToNum(otherCosts);
        const monthlyPayment = formatAmount(payment + pT + hI + hF + oC);
        return monthlyPayment;
    },
    loanCost: (mortgagePayment: string, loanTerm: number): string => {
        const payment = stringToNum(mortgagePayment);
        const totalPayments = formatAmount(payment * loanTerm);
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
    amortization: (loanAmount: string, mortgagePayment: string, interestRate: number, startDate: Date) => {
        const loan = stringToNum(loanAmount);
        const monthlyMortgage = stringToNum(mortgagePayment);
        const r = interestRate/12;
        let loanBalance = loan;
        let payDate = new Date(startDate.valueOf());
        let interestPayment = loanBalance * r;
        let principalPayment = monthlyMortgage - interestPayment;
        let amortizationDetail = {
            date: dateToString(payDate),
            principal: formatAmount(principalPayment),
            interest: formatAmount(interestPayment),
            remainingBalance: formatAmount(loanBalance)
        };
        let amortizationArr = [amortizationDetail];
        const nextMonth = (date: Date) => {
            const currMonth = date.getMonth();
            const nextMonth = currMonth === 11 ? 0 : currMonth + 1;
            date.setMonth(nextMonth);
        };
        while (loanBalance > 0) {
            loanBalance -= principalPayment;
            nextMonth(payDate);
            principalPayment = monthlyMortgage - interestPayment;
            interestPayment = loanBalance * r;
            amortizationDetail = {
                date: dateToString(payDate),
                principal: formatAmount(principalPayment),
                interest: formatAmount(interestPayment),
                remainingBalance: formatAmount(loanBalance)
            };
            amortizationArr.push(amortizationDetail);
        };
        return amortizationArr;
    }
};