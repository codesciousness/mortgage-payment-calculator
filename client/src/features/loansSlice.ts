import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { formatAmount, formatPercent, fromPercent, toPercent, calc } from '../util/calculations';
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
}

interface LoanState {
    name: string;
    email: string;
    homePrice: string;
    downPayment: DualInput;
    loanTerm: number | number[];
    interestRate: number | number[];
    propertyTaxes?: DualInput;
    homeInsurance?: DualInput;
    hoaFees?: DualInput;
    otherCosts?: DualInput;
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
    homePrice: '250,000',
    downPayment: {
        dollar: '50,000',
        percent: '20'
    },
    loanTerm: 30,
    interestRate: 4.75,
    propertyTaxes: {
        dollar: '',
        percent: ''
    },
    homeInsurance: {
        dollar: '',
        percent: ''
    },
    hoaFees: {
        dollar: '',
        percent: ''
    },
    otherCosts: {
        dollar: '',
        percent: ''
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
            percent = formatPercent(percent);
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
        setPropertyTaxes: (state: RootState, action: PayloadAction<{dollar: string, percent: string}>) => {
            const homePrice = state.homePrice;
            let { dollar, percent } = action.payload;
            dollar = formatAmount(dollar);
            percent = formatPercent(percent);
            if (dollar && homePrice) {
                percent = toPercent(dollar, homePrice);
            }
            else if (percent && homePrice) {
                dollar = fromPercent(percent, homePrice);
            }
            state.propertyTaxes = {
                dollar,
                percent
            };
            return state;
        },
        setHomeInsurance: (state: RootState, action: PayloadAction<{dollar: string, percent: string}>) => {
            const homePrice = state.homePrice;
            let { dollar, percent } = action.payload;
            dollar = formatAmount(dollar);
            percent = formatPercent(percent);
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
        setHOAFees: (state: RootState, action: PayloadAction<{dollar: string, percent: string}>) => {
            const homePrice = state.homePrice;
            let { dollar, percent } = action.payload;
            dollar = formatAmount(dollar);
            percent = formatPercent(percent);
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
        setOtherCosts: (state: RootState, action: PayloadAction<{dollar: string, percent: string}>) => {
            const homePrice = state.homePrice;
            let { dollar, percent } = action.payload;
            dollar = formatAmount(dollar);
            percent = formatPercent(percent);
            if (dollar && homePrice) {
                percent = toPercent(dollar, homePrice);
            }
            else if (percent && homePrice) {
                dollar = fromPercent(percent, homePrice);
            }
            state.otherCosts = {
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
            state.homePrice = '';
            state.downPayment = {
                dollar: '',
                percent: ''
            };
            state.loanTerm = 30;
            state.interestRate = 4.75;
            state.propertyTaxes = {
                dollar: '',
                percent: ''
            };
            state.homeInsurance = {
                dollar: '',
                percent: ''
            };
            state.hoaFees = {
                dollar: '',
                percent: ''
            };
            state.otherCosts = {
                dollar: '',
                percent: ''
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

export const { setName, setEmail, setHomePrice, setDownPayment, setLoanTerm, setInterestRate, setPropertyTaxes, 
    setHomeInsurance, setHOAFees, setOtherCosts, setStartDate, reset, clearStatusUpdates } = loansSlice.actions;
export default loansSlice.reducer;

export const selectName = (state: RootState) => state.loans.name;
export const selectEmail = (state: RootState) => state.loans.email;
export const selectHomePrice = (state: RootState) => state.loans.homePrice;
export const selectDownPayment = (state: RootState) => state.loans.downPayment;
export const selectLoanTerm = (state: RootState) => state.loans.loanTerm;
export const selectInterestRate = (state: RootState) => state.loans.interestRate;
export const selectPropertyTaxes = (state: RootState) => state.loans.propertyTaxes;
export const selectHomeInsurance = (state: RootState) => state.loans.homeInsurance;
export const selectHOAFees = (state: RootState) => state.loans.hoaFees;
export const selectOtherCosts = (state: RootState) => state.loans.otherCosts;
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
    selectPropertyTaxes,
    selectHomeInsurance,
    selectHOAFees,
    selectOtherCosts, 
    (mortgagePayment, propertyTaxes, homeInsurance, hoaFees, otherCosts) => calc.monthlyPayment(mortgagePayment, propertyTaxes.dollar, homeInsurance.dollar, hoaFees.dollar, otherCosts.dollar)
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
    selectStartDate, 
    (loanAmount, mortgagePayment, interestRate, startDate) => calc.amortization(loanAmount, mortgagePayment, interestRate, startDate)
);