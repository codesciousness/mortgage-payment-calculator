import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { store } from '../../../app/store';
import DonutChartLegend from '../DonutChartLegend';

describe('<DonutChartLegend />', () => {
    test('DonutChartLegend component is defined', () => {
        expect(<DonutChartLegend/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(
            <Provider store={store}>
                <DonutChartLegend/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly with initial state from Redux store', () => {
        render(
            <Provider store={store}>
                <DonutChartLegend/>
            </Provider>
        );
        expect(screen.getByText('Principal & interest')).toBeInTheDocument();
        expect(screen.getByText('$1,838')).toBeInTheDocument();
        expect(screen.getByText('Property tax')).toBeInTheDocument();
        expect(screen.getByText('$315')).toBeInTheDocument();
        expect(screen.getByText("Homeowner's insurance")).toBeInTheDocument();
        expect(screen.getByText('$175')).toBeInTheDocument();
        expect(screen.getByText('Private mortgage insurance')).toBeInTheDocument();
        expect(screen.getByText('HOA fees')).toBeInTheDocument();
        expect(screen.getByText('Total monthly payment')).toBeInTheDocument();
        expect(screen.getByText('$2,328')).toBeInTheDocument();
    });
});