import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { store } from '../../../app/store';
import LineChart from '../LineChart';

jest.mock('react-google-charts', () => ({Chart: () => <section data-testid="Chart">Chart</section>}));

describe('<LineChart />', () => {
    test('LineChart component is defined', () => {
        expect(<LineChart/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(
            <Provider store={store}>
                <LineChart/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders a Chart component', () => {
        render(
            <Provider store={store}>
                <LineChart/>
            </Provider>
        );
        expect(screen.getByTestId('Chart')).toBeInTheDocument();
        expect(screen.getByText('Chart')).toBeInTheDocument();
    });
});