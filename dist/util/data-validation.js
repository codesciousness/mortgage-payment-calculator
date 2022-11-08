"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDate = exports.validateNumber = exports.validateCurrency = exports.validateEmail = exports.validateName = void 0;
const validator_1 = __importDefault(require("validator"));
const { isAlpha, isCurrency, isEmail, isEmpty, isFloat, isInt, isLength } = validator_1.default;
const validateName = (name) => {
    const correctType = typeof name === 'string';
    return correctType && isAlpha(name, 'en-US', { ignore: " -,'." }) && !isEmpty(name) && isLength(name, { min: 1, max: 50 });
};
exports.validateName = validateName;
const validateEmail = (email) => {
    const correctType = typeof email === 'string';
    return correctType && isEmail(email) && !isEmpty(email) && isLength(email, { min: 1, max: 254 });
};
exports.validateEmail = validateEmail;
const validateCurrency = (input) => {
    const correctType = typeof input === 'string';
    return correctType && isCurrency(input, { allow_negatives: false, digits_after_decimal: [0, 1, 2] }) && !isEmpty(input) && isLength(input, { min: 1, max: 15 });
};
exports.validateCurrency = validateCurrency;
const validateNumber = (num) => {
    const numString = num + '';
    const correctType = typeof num === 'number';
    return correctType && (isFloat(numString, { min: 0, max: 25 }) || isInt(numString, { min: 1, max: 50 }));
};
exports.validateNumber = validateNumber;
const validateDate = (date) => {
    const correctType = typeof date === 'string';
    const correctFormat = new RegExp('^(0[1-9]|10|11|12)/20[0-9]{2}$').test(date);
    return correctType && correctFormat && !isEmpty(date) && isLength(date, { min: 7, max: 7 });
};
exports.validateDate = validateDate;
//# sourceMappingURL=data-validation.js.map