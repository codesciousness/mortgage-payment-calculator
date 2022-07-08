export const stringToNum = (str: string) => {
    return parseInt(str, 10);
};

export const numToString = (num: number) => {
    return `${num}`;
};

export const formatNum = (num: number | string) => {
    let numString: string;
    let numArr: string[];
    let wholeDigits: string;
    let decimals: string;
    if (typeof num === 'number') {
        numString = numToString(num);
    }
    else {
        numString = num.replaceAll(',', '');
    }
    if (numString.includes('.')) {
        wholeDigits = numString.split('.')[0];
        decimals = numString.split('.')[1];
        numArr = wholeDigits.split('');
    }
    else {
        numArr = numString.split('');
    }
    if (numArr.length > 3) {
        for (let i = numArr.length - 4; i >= 0; i-=3) {
            numArr[i] = numArr[i] + ',';
        }
        if (decimals) {
            return numArr.join('') + `.${decimals}`;
        }
        return numArr.join('');
    }
    else return numString;
};