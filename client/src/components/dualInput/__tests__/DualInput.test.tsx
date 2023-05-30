import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import DualInput from '../DualInput';

const name = 'Label Name';
const dollar = '10000';
const percent = '20';
const width = 300;
const onChange = () => null;

describe('<DualInput />', () => {
    test('DualInput component is defined', () => {
        expect(<DualInput name={name} dollar={dollar} percent={percent} width={width} onChange={onChange}/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<DualInput name={name} dollar={dollar} percent={percent} width={width} onChange={onChange}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly with props', () => {
        render(<DualInput name={name} dollar={dollar} percent={percent} width={width} onChange={onChange}/>);
        expect(screen.getByText('Label Name')).toBeInTheDocument();
    });
    test('renders two NumberInput components', () => {
        render(<DualInput name={name} dollar={dollar} percent={percent} width={width} onChange={onChange}/>);
        expect(screen.getByDisplayValue('10000')).toBeInTheDocument();
        expect(screen.getByDisplayValue('20')).toBeInTheDocument();
    });
});