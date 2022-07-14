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

export const mortgageFormula = (loanAmount: string, interestRate: number, loanTerm: number): string => {
    const principal = stringToNum(loanAmount);
    const r = interestRate/12;
    const n = loanTerm * 12
    const monthlyPayment = principal * (r*(1 + r)**n)/((1 + r**n) - 1);
    return numToString(monthlyPayment);
};