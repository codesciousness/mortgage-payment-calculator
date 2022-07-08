import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
const axios = require('axios');

interface AmortizationDetail {
    year: string;
    principal: string;
    interest: string;
    remainingBalance: string;
}

interface LoanState {
    name: string;
    email: string;
    homePrice: string;
    downPayment: string;
    loanAmount: string;
    loanTerm: number;
    interestRate: number;
    totalInterest: string;
    loanType?: string;
    propertyTaxes?: string;
    homeInsurance?: string;
    hoaFees?: string;
    otherCosts?: string;
    startDate: string;
    payoffDate: string;
    principalAndInterest: string;
    totalMonthlyPayment: string;
    totalLoanCost: string
    amortizationSchedule: AmortizationDetail[];
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
    homePrice: '',
    downPayment: '',
    loanAmount: '',
    loanTerm: 30,
    interestRate: 4.75,
    totalInterest: '',
    loanType: '',
    propertyTaxes: '',
    homeInsurance: '',
    hoaFees: '',
    otherCosts: '',
    startDate: '',
    payoffDate: '',
    principalAndInterest: '',
    totalMonthlyPayment: '',
    totalLoanCost: '',
    amortizationSchedule: [],
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
            state.homePrice = action.payload;
            return state;
        },
        setDownPayment: (state: RootState, action: PayloadAction<string>) => {
            state.downPayment = action.payload;
            return state;
        },
        setLoanAmount: (state: RootState, action: PayloadAction<string>) => {
            state.loanAmount = action.payload;
            return state;
        },
        setLoanTerm: (state: RootState, action: PayloadAction<string>) => {
            state.loanTerm = action.payload;
            return state;
        },
        setInterestRate: (state: RootState, action: PayloadAction<string>) => {
            state.interestRate = action.payload;
            return state;
        },
        setTotalInterest: (state: RootState, action: PayloadAction<string>) => {
            state.totalInterest = action.payload;
            return state;
        },
        setLoanType: (state: RootState, action: PayloadAction<string>) => {
            state.loanType = action.payload;
            return state;
        },
        setPropertyTaxes: (state: RootState, action: PayloadAction<string>) => {
            state.propertyTaxes = action.payload;
            return state;
        },
        setHomeInsurance: (state: RootState, action: PayloadAction<string>) => {
            state.homeInsurance = action.payload;
            return state;
        },
        setHOAFees: (state: RootState, action: PayloadAction<string>) => {
            state.hoaFees = action.payload;
            return state;
        },
        setOtherCosts: (state: RootState, action: PayloadAction<string>) => {
            state.otherCosts = action.payload;
            return state;
        },
        setStartDate: (state: RootState, action: PayloadAction<string>) => {
            state.startDate = action.payload;
            return state;
        },
        setPayoffDate: (state: RootState, action: PayloadAction<string>) => {
            state.payoffDate = action.payload;
            return state;
        },
        setPrincipalAndInterest: (state: RootState, action: PayloadAction<string>) => {
            state.principalAndInterest = action.payload;
            return state;
        },
        setTotalMonthlyPayment: (state: RootState, action: PayloadAction<string>) => {
            state.totalMonthlyPayment = action.payload;
            return state;
        },
        setTotalLoanCost: (state: RootState, action: PayloadAction<string>) => {
            state.totalLoanCost = action.payload;
            return state;
        },
        setAmortizationSchedule: (state: RootState, action: PayloadAction<string>) => {
            state.amorizationSchedule = action.payload;
            return state;
        },
        reset: (state: RootState) => {
            state.name = '';
            state.email = '';
            state.homePrice = '';
            state.downPayment = '';
            state.loanAmount = '';
            state.loanTerm = 30;
            state.interestRate = 4.75;
            state.totalInterest = '';
            state.loanType = '';
            state.propertyTaxes = '';
            state.homeInsurance = '';
            state.hoaFees = '';
            state.otherCosts = '';
            state.startDate = '';
            state.payoffDate = '';
            state.principalAndInterest = '';
            state.totalMonthlyPayment = '';
            state.totalLoanCost = '';
            state.amortizationSchedule = [];
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

export const { setName, setEmail, setHomePrice, setDownPayment, setLoanAmount, setLoanTerm, setInterestRate, setTotalInterest, setLoanType, 
    setPropertyTaxes, setHomeInsurance, setHOAFees, setOtherCosts, setStartDate, setPayoffDate, setPrincipalAndInterest, setTotalMonthlyPayment, 
    setTotalLoanCost, setAmortizationSchedule, reset, clearStatusUpdates } = loansSlice.actions;
export default loansSlice.reducer;

export const selectName = (state: RootState) => state.loans.name;
export const selectEmail = (state: RootState) => state.loans.email;
export const selectHomePrice = (state: RootState) => state.loans.products;
export const selectDownPayment = (state: RootState) => state.loans.homePrice;
export const selectLoanAmount = (state: RootState) => state.loans.loanAmount;
export const selectLoanTerm = (state: RootState) => state.loans.loanTerm;
export const selectInterestRate = (state: RootState) => state.loans.interestRate;
export const selectTotalInterest = (state: RootState) => state.loans.totalInterest;
export const selectLoanType = (state: RootState) => state.loans.loanType;
export const selectPropertyTaxes = (state: RootState) => state.loans.propertyTaxes;
export const selectHomeInsurance = (state: RootState) => state.loans.homeInsurance;
export const selectHOAFees = (state: RootState) => state.loans.hoaFees;
export const selectOtherCosts = (state: RootState) => state.loans.othercosts;
export const selectStartDate = (state: RootState) => state.loans.startDate;
export const selectPayoffDate = (state: RootState) => state.loans.payoffDate;
export const selectPrincipalAndInterest = (state: RootState) => state.loans.principalAndInterest;
export const selectTotalMonthlyPayment = (state: RootState) => state.loans.totalMonthlyPayment;
export const selectTotalLoanCost = (state: RootState) => state.loans.totalLoanCost;
export const selectAmortizationSchedule = (state: RootState) => state.loans.amortizationSchedule;
export const selectSavingLoan = (state: RootState) => state.loans.savingLoan;
export const selectSaveLoanSuccess = (state: RootState) => state.loans.saveLoanSuccess;
export const selectSaveLoanError = (state: RootState) => state.loans.saveLoanError;

