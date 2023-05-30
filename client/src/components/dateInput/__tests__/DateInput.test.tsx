import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import DateInput from '../DateInput';
import { dateToString } from '../../../util/calculations';

const name = 'Label Name';
const width = 300;
const onChange = () => null;

describe('<DateInput />', () => {
    test('DateInput component is defined', () => {
        expect(<DateInput name={name} value={null} onChange={onChange}/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<DateInput name={name} value={new Date()} width={width} onChange={onChange}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly when value prop is a date', () => {
        render(<DateInput name={name} value={new Date()} width={width} onChange={onChange}/>);
        expect(screen.getByText('Label Name')).toBeInTheDocument();
        expect(screen.getByDisplayValue(dateToString(new Date()))).toBeInTheDocument();
    });
    test('renders correctly when value prop is null', () => {
        render(<DateInput name={name} value={null} width={width} onChange={onChange}/>);
        expect(screen.getByText('Label Name')).toBeInTheDocument();
        expect(screen.queryByDisplayValue(dateToString(new Date()))).not.toBeInTheDocument();
    });
});