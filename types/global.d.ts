export {};

declare global {
    interface DualInput {
        dollar: string;
        percent: string;
    }
}

declare global {
    interface AmortizationDetail {
        date: string;
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
        loanTerm: number;
        interestRate: number;
        propertyTaxes?: DualInput;
        homeInsurance?: DualInput;
        hoaFees?: DualInput;
        otherCosts?: DualInput;
        startDate: Date;
        payoffDate: string;
        mortgagePayment: string;
        monthlyPayment: string;
        loanAmount: string;
        loanCost: string;
        totalInterest: string;
        amortizationSchedule: AmortizationDetail[];
    }
}