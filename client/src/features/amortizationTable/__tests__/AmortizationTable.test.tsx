import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { store } from '../../../app/store';
import AmortizationTable from '../AmortizationTable';

describe('<AmortizationTable />', () => {
    test('AmortizationTable component is defined', () => {
        expect(<AmortizationTable/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(
            <Provider store={store}>
                <AmortizationTable/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly with initial state from Redux store', () => {
        render(
            <Provider store={store}>
                <AmortizationTable/>
            </Provider>
        );
        expect(screen.getByText('Amortization schedule breakdown')).toBeInTheDocument();
        expect(screen.getByText('Principal')).toBeInTheDocument();
        expect(screen.getByText('$328.88')).toBeInTheDocument();
        expect(screen.getByText('Interest')).toBeInTheDocument();
        expect(screen.getByText('$1,509.38')).toBeInTheDocument();
    });
    test('renders an export button with two export options when clicked', () => {
        render(
            <Provider store={store}>
                <AmortizationTable/>
            </Provider>
        );
        expect(screen.getByText('Export')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Export'));
        expect(screen.getByText('Download as CSV')).toBeInTheDocument();
        expect(screen.getByText('Print')).toBeInTheDocument();
    });
    test('renders next page when Go to next page button is clicked', () => {
        render(
            <Provider store={store}>
                <AmortizationTable/>
            </Provider>
        );
        expect(screen.getByText('1–10 of 360')).toBeInTheDocument();
        expect(screen.queryByText('11–20 of 360')).not.toBeInTheDocument();
        fireEvent.click(screen.getByLabelText('Go to next page'));
        expect(screen.queryByText('1–10 of 360')).not.toBeInTheDocument();
        expect(screen.getByText('11–20 of 360')).toBeInTheDocument();
    });
});