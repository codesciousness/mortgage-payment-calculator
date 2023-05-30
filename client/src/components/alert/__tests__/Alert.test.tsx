import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import Alert from '../Alert';

const booleanMsg = false;
const stringMsg = 'Alert!';
const errorSeverity = 'error';
const successSeverity = 'success';
const onClose = () => null;

describe('<Alert />', () => {
    test('Alert component is defined', () => {
        expect(<Alert msg={booleanMsg} severity={errorSeverity} onClose={onClose}/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<Alert msg={stringMsg} severity={successSeverity} color={successSeverity} onClose={onClose}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly when msg prop is provided', () => {
        render(<Alert msg={stringMsg} severity={successSeverity} color={successSeverity} onClose={onClose}/>);
        expect(screen.getByText('Alert!')).toBeInTheDocument();
    });
    test('renders correctly when msg prop is false', () => {
        render(<Alert msg={booleanMsg} severity={errorSeverity} color={errorSeverity} onClose={onClose}/>);
        expect(screen.queryByText('Alert!')).not.toBeInTheDocument();
    });
});