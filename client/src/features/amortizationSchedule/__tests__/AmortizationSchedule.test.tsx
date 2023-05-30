import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { store } from '../../../app/store';
import AmortizationSchedule from '../AmortizationSchedule';
import { dateToString } from '../../../util/calculations';

jest.mock('../../lineChart/LineChart', () => () => (<section data-testid="LineChart">Line Chart</section>));
jest.mock('../../lineChartLegend/LineChartLegend', () => () => (<section data-testid="LineChartLegend">Line Chart Legend</section>));
jest.mock('../../amortizationTable/AmortizationTable', () => () => (<section data-testid="AmortizationTable">Amortization Table</section>));

describe('<AmortizationSchedule />', () => {
    test('AmortizationSchedule component is defined', () => {
        expect(<AmortizationSchedule/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(
            <Provider store={store}>
                <AmortizationSchedule/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly with initial state from Redux store', () => {
        render(
            <Provider store={store}>
                <AmortizationSchedule/>
            </Provider>
        );
        const date = new Date();
        const year = date.getFullYear();
        const year30 = year + 30;
        date.setFullYear(year30);

        expect(screen.getByText('Amortization for mortgage loan')).toBeInTheDocument();
        expect(screen.getByText('Loan amount')).toBeInTheDocument();
        expect(screen.getByText('315,000')).toBeInTheDocument();
        expect(screen.getByText('Total interest paid')).toBeInTheDocument();
        expect(screen.getByText('346,772')).toBeInTheDocument();
        expect(screen.getByText('Total cost of loan')).toBeInTheDocument();
        expect(screen.getByText('661,772')).toBeInTheDocument();
        expect(screen.getByText('Payoff Date')).toBeInTheDocument();
        expect(screen.getByText(dateToString(date))).toBeInTheDocument();
    });
    test('renders a LineChart component', () => {
        render(
            <Provider store={store}>
                <AmortizationSchedule/>
            </Provider>
        );
        expect(screen.getByTestId('LineChart')).toBeInTheDocument();
        expect(screen.getByText('Line Chart')).toBeInTheDocument();
    });
    test('renders a LineChartLegend component', () => {
        render(
            <Provider store={store}>
                <AmortizationSchedule/>
            </Provider>
        );
        expect(screen.getByTestId('LineChartLegend')).toBeInTheDocument();
        expect(screen.getByText('Line Chart Legend')).toBeInTheDocument();
    });
    test('renders an AmortizationTable component', () => {
        render(
            <Provider store={store}>
                <AmortizationSchedule/>
            </Provider>
        );
        expect(screen.getByTestId('AmortizationTable')).toBeInTheDocument();
        expect(screen.getByText('Amortization Table')).toBeInTheDocument();
    });
});