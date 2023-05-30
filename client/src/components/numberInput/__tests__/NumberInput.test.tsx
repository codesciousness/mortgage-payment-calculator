import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import NumberInput from '../NumberInput';

const name = 'Label Name';
const value = 100;
const dollarSign = 'dollar';
const percentSign = 'percent'
const width = 300;
const labelTrue = true;
const labelFalse = false;
const dualTrue = true;
const error = 'Error!'
const onChange = () => null;

<NumberInput name={name} value={value} sign={dollarSign} 
    width={width} label={labelTrue} dual={dualTrue}
    onChange={onChange}/>

describe('<NumberInput />', () => {
    test('NumberInput component is defined', () => {
        expect(<NumberInput name={name} value={value} sign={dollarSign} onChange={onChange}/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<NumberInput name={name} value={value} 
            sign={dollarSign} width={width} label={labelTrue} dual={dualTrue}
            onChange={onChange}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly when sign prop is dollar', () => {
        render(<NumberInput name={name} value={value} sign={dollarSign} onChange={onChange}/>);
        expect(screen.queryByText('Label Name')).not.toBeInTheDocument();
        expect(screen.getByDisplayValue('100')).toBeInTheDocument();
        expect(screen.getByText('$')).toBeInTheDocument();
    });
    test('renders correctly when sign prop is percent', () => {
        render(<NumberInput name={name} value={value} sign={percentSign} onChange={onChange}/>);
        expect(screen.queryByText('Label Name')).not.toBeInTheDocument();
        expect(screen.getByDisplayValue('100')).toBeInTheDocument();
        expect(screen.getByText('%')).toBeInTheDocument();
    });
    test('renders correctly when label prop is true', () => {
        render(<NumberInput name={name} value={value} sign={dollarSign} label={labelTrue} onChange={onChange}/>);
        expect(screen.getByText('Label Name')).toBeInTheDocument();
        expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    });
    test('renders correctly when label prop is false', () => {
        render(<NumberInput name={name} value={value} sign={dollarSign} label={labelFalse} onChange={onChange}/>);
        expect(screen.queryByText('Label Name')).not.toBeInTheDocument();
        expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    });
    test('renders correctly when error prop is provided', () => {
        render(<NumberInput name={name} value={value} sign={dollarSign} error={error} onChange={onChange}/>);
        expect(screen.getByDisplayValue('100')).toBeInTheDocument();
        expect(screen.getByText('Error!')).toBeInTheDocument();
    });
});