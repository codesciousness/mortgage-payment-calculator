export {};

declare global {
    interface DualInput {
        dollar: string;
        percent: string;
    }
}

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
        homePrice: DualInput;
        downPayment: string;
        loanAmount: string;
        loanTerm: number;
        interestRate: number;
        totalInterest: string;
        loanType?: string;
        propertyTaxes?: DualInput;
        homeInsurance?: DualInput;
        hoaFees?: DualInput;
        otherCosts?: DualInput;
        startDate: Date;
        payoffDate: Date;
        principalAndInterest: string;
        totalMonthlyPayment: string;
        totalLoanCost: string
        amortizationSchedule: AmortizationDetail[];
    }
}