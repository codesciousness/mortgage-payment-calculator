import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';
import TabsDisplay from '../TabsDisplay';

jest.mock('../../monthlyPayment/MonthlyPayment', () => () => (<section data-testid="MonthlyPayment">Monthly Payment</section>));
jest.mock('../../amortizationSchedule/AmortizationSchedule', () => () => (<section data-testid="AmortizationSchedule">Amortization Schedule</section>));

describe('<TabsDisplay />', () => {
    test('TabsDisplay component is defined', () => {
        expect(<TabsDisplay/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<TabsDisplay/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders the MonthlyPayment component as the default tab', () => {
        render(<TabsDisplay/>);
        expect(screen.getByTestId('MonthlyPayment')).toBeInTheDocument();
        expect(screen.getByText('Monthly Payment')).toBeInTheDocument();
        expect(screen.queryByTestId('AmortizationSchedule')).not.toBeInTheDocument();
        expect(screen.queryByText('Amortization Schedule')).not.toBeInTheDocument();
    });
    test('renders the AmortizationSchedule component when the Amortization tab is clicked', () => {
        render(<TabsDisplay/>);
        fireEvent.click(screen.getByText('Amortization'));
        expect(screen.getByTestId('AmortizationSchedule')).toBeInTheDocument();
        expect(screen.getByText('Amortization Schedule')).toBeInTheDocument();
        expect(screen.queryByTestId('MonthlyPayment')).not.toBeInTheDocument();
        expect(screen.queryByText('Monthly Payment')).not.toBeInTheDocument();
    });
    test('renders the MonthlyPayment component when the Monthly payment tab is clicked', () => {
        render(<TabsDisplay/>);
        fireEvent.click(screen.getByText('Amortization'));
        expect(screen.getByTestId('AmortizationSchedule')).toBeInTheDocument();
        expect(screen.getByText('Amortization Schedule')).toBeInTheDocument();
        expect(screen.queryByTestId('MonthlyPayment')).not.toBeInTheDocument();
        expect(screen.queryByText('Monthly Payment')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Monthly payment'));
        expect(screen.getByTestId('MonthlyPayment')).toBeInTheDocument();
        expect(screen.getByText('Monthly Payment')).toBeInTheDocument();
    });
});