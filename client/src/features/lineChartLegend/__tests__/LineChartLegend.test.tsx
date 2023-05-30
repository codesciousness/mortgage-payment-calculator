import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import LineChartLegend from '../LineChartLegend';

describe('<LineChartLegend />', () => {
    test('LineChartLegend component is defined', () => {
        expect(<LineChartLegend/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<LineChartLegend/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('it renders correctly', () => {
        render(<LineChartLegend/>);
        expect(screen.getByText('Principal')).toBeInTheDocument();
        expect(screen.getByText('Interest')).toBeInTheDocument();
        expect(screen.getByText('Balance')).toBeInTheDocument();
    });
});