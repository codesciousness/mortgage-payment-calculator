import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import MonthlyPayment from '../MonthlyPayment';

jest.mock('../../donutChart/DonutChart', () => () => (<section data-testid="DonutChart">Donut Chart</section>));
jest.mock('../../donutChartLegend/DonutChartLegend', () => () => (<section data-testid="DonutChartLegend">Donut Chart Legend</section>));

describe('<MonthlyPayment />', () => {
    test('MonthlyPayment component is defined', () => {
        expect(<MonthlyPayment/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<MonthlyPayment/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('it renders correctly', async () => {
        render(<MonthlyPayment/>);
        expect(screen.getByText('Monthly payment breakdown')).toBeInTheDocument();
    });
    test('renders a DonutChart component', () => {
        render(<MonthlyPayment/>);
        expect(screen.getByTestId('DonutChart')).toBeInTheDocument();
        expect(screen.getByText('Donut Chart')).toBeInTheDocument();
    });
    test('renders a DonutChartLegend component', () => {
        render(<MonthlyPayment/>);
        expect(screen.getByTestId('DonutChartLegend')).toBeInTheDocument();
        expect(screen.getByText('Donut Chart Legend')).toBeInTheDocument();
    });
});