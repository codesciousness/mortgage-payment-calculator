import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import Button from '../Button';

const name = 'Button Name';
const width = 300;
const loadingTrue = true;
const loadingFalse = false;
const onClick = () => null;

describe('<Button />', () => {
    test('Button component is defined', () => {
        expect(<Button name={name} onClick={onClick}/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<Button name={name} width={width} loading={loadingFalse} onClick={onClick}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly when loading prop is true', () => {
        render(<Button name={name} width={width} loading={loadingTrue} onClick={onClick}/>);
        expect(screen.getByText('Button Name')).toBeInTheDocument();
    });
    test('renders correctly when loading prop is false', () => {
        render(<Button name={name} width={width} loading={loadingFalse} onClick={onClick}/>);
        expect(screen.getByText('Button Name')).toBeInTheDocument();
    });
});