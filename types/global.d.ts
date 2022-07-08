export {};

declare global {
    interface AmortizationDetail {
        year: string;
        principal: string;
        interest: string;
        remainingBalance: string;
    }
}

declare global {
    interface Loan {
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
    }
}