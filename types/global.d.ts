export {};

declare global {
    interface AmortizationDetail {
        year: number;
        principle: number;
        interest: number;
        remainingBalance: number;
    }
}

declare global {
    interface Loan {
        loanId: string;
        name: string;
        email: string;
        homePrice: number;
        downPayment: number;
        loanAmount: number;
        loanTerm: number;
        interestRate: number;
        totalInterest: number;
        loanType?: string;
        propertyTaxes?: number;
        homeInsurance?: number;
        hoaFees?: number;
        otherCosts?: number;
        loanStartDate?: string
        loanEndDate?: string;
        creditScore?: number;
        totalPrincipleAndInterest: number;
        monthlyPrincipleAndInterest: number;
        totalPropertyTaxes: number;
        monthlyPropertyTaxes: number;
        totalHomeInsurance: number;
        monthlyHomeInsurance: number;
        totalHOAFees: number;
        monthlyHOAFees: number;
        totalOtherCosts: number;
        monthlyOtherCosts: number;
        totalMortgageExpenses: number;
        annualMortgageExpenses: number;
        monthlyMortgageExpenses: number;
        annualAmortizationSchedule: AmortizationDetail[];
    }
}