import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import StyledSwitch from '../StyledSwitch';

const name = 'Label Name';
const checkedTrue = true;
const checkedFalse = false;
const onChange = () => null;

describe('<StyledSwitch />', () => {
    test('StyledSwitch component is defined', () => {
        expect(<StyledSwitch name={name} checked={checkedFalse} onChange={onChange}/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<StyledSwitch name={name} checked={checkedTrue} onChange={onChange}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly when checked prop is true', () => {
        render(<StyledSwitch name={name} checked={checkedTrue} onChange={onChange}/>);
        expect(screen.getByRole('checkbox')).toBeChecked();
    });
    test('renders correctly when checked prop is false', () => {
        render(<StyledSwitch name={name} checked={checkedFalse} onChange={onChange}/>);
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });
});