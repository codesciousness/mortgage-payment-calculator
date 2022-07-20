import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { formatAmount, formatDecimal, fromPercent, toPercent, calc } from '../util/calculations';
const axios = require('axios');

interface DualInput {
    dollar: string;
    percent: string;
}

export interface AmortizationDetail {
    date: string;
    principal: string;
    interest: string;
    remainingBalance: string;
    totalPrincipal: string;
    totalInterest: string;
}

interface LoanState {
    name: string;
    email: string;
    homePrice: string;
    downPayment: DualInput;
    loanTerm: number | number[];
    interestRate: number | number[];
    propertyTax?: DualInput;
    homeInsurance?: DualInput;
    privateMortgageInsurance?: DualInput;
    hoaFees?: DualInput;
    startDate: Date | null;
    savingLoan: boolean;
    saveLoanSuccess: boolean;
    saveLoanError: boolean;
}

export const saveLoan = createAsyncThunk('loans/saveLoan',
async (loanData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/loans/saveLoan', loanData);
        return response.data;
    }
    catch (err: any) {
        return rejectWithValue(err.response.data);
    }
});

const initialState: LoanState = {
    name: '',
    email: '',
    homePrice: '350,000',
    downPayment: {
        dollar: '35,000',
        percent: '10'
    },
    loanTerm: 30,
    interestRate: 5.75,
    propertyTax: {
        dollar: '315',
        percent: '0.09'
    },
    homeInsurance: {
        dollar: '175',
        percent: '0.05'
    },
    privateMortgageInsurance: {
        dollar: '0',
        percent: '0'
    },
    hoaFees: {
        dollar: '0',
        percent: '0'
    },
    startDate: new Date(),
    savingLoan: false,
    saveLoanSuccess: false,
    saveLoanError: false
}

const loansSlice = createSlice({
    name: 'loans',
    initialState,
    reducers: {
        setName: (state: RootState, action: PayloadAction<string>) => {
            state.name = action.payload;
            return state;
        },
        setEmail: (state: RootState, action: PayloadAction<string>) => {
            state.email = action.payload;
            return state;
        },
        setHomePrice: (state: RootState, action: PayloadAction<string>) => {
            state.homePrice = formatAmount(action.payload);
            return state;
        },
        setDownPayment: (state: RootState, action: PayloadAction<{dollar: string, percent: string}>) => {
            const homePrice = state.homePrice;
            let { dollar, percent } = action.payload;
            dollar = formatAmount(dollar);
            percent = formatDecimal(percent);
            if (dollar && homePrice) {
                percent = toPercent(dollar, homePrice);
            }
            else if (percent && homePrice) {
                dollar = fromPercent(percent, homePrice);
            }
            state.downPayment = {
                dollar,
                percent
            };
            return state;
        },
        setLoanTerm: (state: RootState, action: PayloadAction<number>) => {
            state.loanTerm = action.payload;
            return state;
        },
        setInterestRate: (state: RootState, action: PayloadAction<number>) => {
            state.interestRate = action.payload;
            return state;
        },
        setPropertyTax: (state: RootState, action: PayloadAction<{dollar: string, percent: string}>) => {
            const homePrice = state.homePrice;
            let { dollar, percent } = action.payload;
            dollar = formatAmount(dollar);
            percent = formatDecimal(percent);
            if (dollar && homePrice) {
                percent = toPercent(dollar, homePrice);
            }
            else if (percent && homePrice) {
                dollar = fromPercent(percent, homePrice);
            }
            state.propertyTax = {
                dollar,
                percent
            };
            return state;
        },
        setHomeInsurance: (state: RootState, action: PayloadAction<{dollar: string, percent: string}>) => {
            const homePrice = state.homePrice;
            let { dollar, percent } = action.payload;
            dollar = formatAmount(dollar);
            percent = formatDecimal(percent);
            if (dollar && homePrice) {
                percent = toPercent(dollar, homePrice);
            }
            else if (percent && homePrice) {
                dollar = fromPercent(percent, homePrice);
            }
            state.homeInsurance = {
                dollar,
                percent
            };
            return state;
        },
        setPMI: (state: RootState, action: PayloadAction<{dollar: string, percent: string}>) => {
            const homePrice = state.homePrice;
            let { dollar, percent } = action.payload;
            dollar = formatAmount(dollar);
            percent = formatDecimal(percent);
            if (dollar && homePrice) {
                percent = toPercent(dollar, homePrice);
            }
            else if (percent && homePrice) {
                dollar = fromPercent(percent, homePrice);
            }
            state.privateMortgageInsurance = {
                dollar,
                percent
            };
            return state;
        },
        setHOAFees: (state: RootState, action: PayloadAction<{dollar: string, percent: string}>) => {
            const homePrice = state.homePrice;
            let { dollar, percent } = action.payload;
            dollar = formatAmount(dollar);
            percent = formatDecimal(percent);
            if (dollar && homePrice) {
                percent = toPercent(dollar, homePrice);
            }
            else if (percent && homePrice) {
                dollar = fromPercent(percent, homePrice);
            }
            state.hoaFees = {
                dollar,
                percent
            };
            return state;
        },
        setStartDate: (state: RootState, action: PayloadAction<Date>) => {
            state.startDate = action.payload;
            return state;
        },
        reset: (state: RootState) => {
            state.name = '';
            state.email = '';
            state.homePrice = '350,000';
            state.downPayment = {
                dollar: '35,000',
                percent: '10'
            };
            state.loanTerm = 30;
            state.interestRate = 5.75;
            state.propertyTax = {
                dollar: '315',
                percent: '0.09'
            };
            state.homeInsurance = {
                dollar: '175',
                percent: '0.05'
            };
            state.privateMortgageInsurance = {
                dollar: '0',
                percent: '0'
            };
            state.hoaFees = {
                dollar: '0',
                percent: '0'
            };
            state.startDate = new Date();
            return state;
        },
        clearStatusUpdates: (state: RootState) => {
            state.savingLoan = false;
            state.saveLoanSuccess = false;
            state.saveLoanError = false;
            return state;
        }
    },
    extraReducers: {
        [saveLoan.pending]: (state: RootState) => {
            state.savingLoan = true;
            state.saveLoanSuccess = false;
            state.saveLoanError = false;
        },
        [saveLoan.fulfilled]: (state: RootState) => {
            state.savingLoan = false;
            state.saveLoanSuccess = true;
            state.saveLoanError = false;
        },
        [saveLoan.rejected]: (state: RootState, action: PayloadAction<string>) => {
            state.savingLoan = false;
            state.saveLoanSuccess = false;
            state.saveLoanError = action.payload;
        }
    }
});

export const { setName, setEmail, setHomePrice, setDownPayment, setLoanTerm, setInterestRate, setPropertyTax, 
    setHomeInsurance, setPMI, setHOAFees, setStartDate, reset, clearStatusUpdates } = loansSlice.actions;
export default loansSlice.reducer;

export const selectName = (state: RootState) => state.loans.name;
export const selectEmail = (state: RootState) => state.loans.email;
export const selectHomePrice = (state: RootState) => state.loans.homePrice;
export const selectDownPayment = (state: RootState) => state.loans.downPayment;
export const selectLoanTerm = (state: RootState) => state.loans.loanTerm;
export const selectInterestRate = (state: RootState) => state.loans.interestRate;
export const selectPropertyTax = (state: RootState) => state.loans.propertyTax;
export const selectHomeInsurance = (state: RootState) => state.loans.homeInsurance;
export const selectPMI = (state: RootState) => state.loans.privateMortgageInsurance;
export const selectHOAFees = (state: RootState) => state.loans.hoaFees;
export const selectStartDate = (state: RootState) => state.loans.startDate;
export const selectSavingLoan = (state: RootState) => state.loans.savingLoan;
export const selectSaveLoanSuccess = (state: RootState) => state.loans.saveLoanSuccess;
export const selectSaveLoanError = (state: RootState) => state.loans.saveLoanError;

export const selectLoanAmount = createSelector(
    selectHomePrice, 
    selectDownPayment, 
    (homePrice, downPayment) => calc.loanAmount(homePrice, downPayment.dollar)
);
export const selectMortgagePayment = createSelector(
    selectLoanAmount, 
    selectInterestRate, 
    selectLoanTerm, 
    (loanAmount, interestRate, loanTerm) => calc.mortgagePayment(loanAmount, interestRate, loanTerm)
);
export const selectMonthlyPayment = createSelector(
    selectMortgagePayment, 
    selectPropertyTax,
    selectHomeInsurance,
    selectPMI,
    selectHOAFees, 
    (mortgagePayment, propertyTax, homeInsurance, privateMortgageInsurance, hoaFees) => calc.monthlyPayment(mortgagePayment, propertyTax.dollar, homeInsurance.dollar, privateMortgageInsurance.dollar, hoaFees.dollar)
);
export const selectLoanCost = createSelector(
    selectMortgagePayment, 
    selectLoanTerm, 
    (mortgagePayment, loanTerm) => calc.loanCost(mortgagePayment, loanTerm)
);
export const selectTotalInterest = createSelector(
    selectLoanAmount, 
    selectLoanCost, 
    (loanAmount, loanCost) => calc.totalInterest(loanAmount, loanCost)
);
export const selectPayoffDate = createSelector(
    selectStartDate, 
    selectLoanTerm, 
    (startDate, loanTerm) => calc.payoffDate(startDate, loanTerm)
);
export const selectAmortizationSchedule = createSelector(
    selectLoanAmount, 
    selectMortgagePayment,
    selectInterestRate,
    selectLoanTerm,
    selectStartDate, 
    (loanAmount, mortgagePayment, interestRate, loanTerm, startDate) => calc.amortization(loanAmount, mortgagePayment, interestRate, loanTerm, startDate)
);