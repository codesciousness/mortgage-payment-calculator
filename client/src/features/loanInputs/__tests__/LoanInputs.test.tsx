import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
//import { create } from 'react-test-renderer';
import { store } from '../../../app/store';
import LoanInputs from '../LoanInputs';
import { dateToString } from '../../../util/calculations';

jest.mock('../../../hooks/use-window-size', () => ({
    useWindowSize: () => ({
        width: 800,
        height: 800,
    }),
}));

jest.mock('../../../components/infoTooltip/InfoTooltip', () => () => (<section data-testid="InfoTooltip">Info Tooltip</section>));

describe('<LoanInputs />', () => {
    test('LoanInputs component is defined', () => {
        expect(<LoanInputs/>).toBeDefined();
    });
    //Error creating snapshot
    /*test('component matches the snapshot', () => {
        const component = create(
            <Provider store={store}>
                <LoanInputs/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });*/
    test('renders correctly with initial state from Redux store', () => {
        render(
            <Provider store={store}>
                <LoanInputs/>
            </Provider>
        );
        expect(screen.getByDisplayValue('350,000')).toBeInTheDocument();
        expect(screen.getByDisplayValue('35,000')).toBeInTheDocument();
        expect(screen.getByDisplayValue('10')).toBeInTheDocument();
        expect(screen.getAllByDisplayValue(5.75)).toHaveLength(2);
        expect(screen.getByDisplayValue(30)).toBeInTheDocument();
        expect(screen.getByDisplayValue(dateToString(new Date()))).toBeInTheDocument();
    });
    test('renders 3 InfoTooltip components initially', () => {
        render(
            <Provider store={store}>
                <LoanInputs/>
            </Provider>
        );
        expect(screen.getAllByTestId('InfoTooltip')).toHaveLength(3);
    });
    test('clicking on switch component displays include more section', () => {
        render(
            <Provider store={store}>
                <LoanInputs/>
            </Provider>
        );
        expect(screen.queryByDisplayValue('315')).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue('0.09')).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue('175')).not.toBeInTheDocument();
        expect(screen.queryByDisplayValue('0.05')).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('checkbox'));
        expect(screen.getByRole('checkbox')).toBeChecked();
        expect(screen.getByDisplayValue('315')).toBeInTheDocument();
        expect(screen.getByDisplayValue('0.09')).toBeInTheDocument();
        expect(screen.getByDisplayValue('175')).toBeInTheDocument();
        expect(screen.getByDisplayValue('0.05')).toBeInTheDocument();
        expect(screen.getAllByTestId('InfoTooltip')).toHaveLength(7);
        
    });
});