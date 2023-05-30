import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { store } from '../../../app/store';
import DonutChart from '../DonutChart';

describe('<DonutChart />', () => {
    test('DonutChart component is defined', () => {
        expect(<DonutChart/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(
            <Provider store={store}>
                <DonutChart/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly with initial state from Redux store', () => {
        render(
            <Provider store={store}>
                <DonutChart/>
            </Provider>
        );
        expect(screen.getByText('Monthly Payment')).toBeInTheDocument();
        expect(screen.getByText('$2,328')).toBeInTheDocument();
    });
});