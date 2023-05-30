import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import Label from '../Label';

const name = 'Label Name';
const focused = true;

describe('<Label />', () => {
    test('Label component is defined', () => {
        expect(<Label name={name}/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<Label name={name} focused={focused}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly when name prop is provided', () => {
        render(<Label name={name} focused={focused}/>);
        expect(screen.getByText('Label Name')).toBeInTheDocument();
    });
});