import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import TextInput from '../TextInput';

const name = 'Label Name';
const value = 'Test Value';
const width = 300;
const placeholder = 'Placeholder Text';
const error = 'Error!';
const onChange = () => null;

describe('<TextInput />', () => {
    test('TextInput component is defined', () => {
        expect(<TextInput name={name} value={value} onChange={onChange}/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<TextInput name={name} value={value} width={width} 
            placeholder={placeholder} onChange={onChange}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly with props', () => {
        render(<TextInput name={name} value={value} width={width} 
            placeholder={placeholder} onChange={onChange}/>);
        expect(screen.getByLabelText('Label Name')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Placeholder Text')).toBeInTheDocument();
    });
    test('renders correctly when error prop is provided', () => {
        render(<TextInput name={name} value={value} width={width} 
            placeholder={placeholder} error={error} onChange={onChange}/>);
        expect(screen.getByText('Error!')).toBeInTheDocument();
    });
});