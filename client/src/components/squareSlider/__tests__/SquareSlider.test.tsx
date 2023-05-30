import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import SquareSlider from '../SquareSlider';

const name = 'Label Name';
const value = 25;
const min = 0;
const max = 50;
const steps = 1;
const width = 300;
const onChange = () => null;

describe('<SquareSlider />', () => {
    test('SquareSlider component is defined', () => {
        expect(<SquareSlider name={name} value={value} min={min} max={max} 
            steps={steps} width={width} onChange={onChange}/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<SquareSlider name={name} value={value} min={min} max={max} 
            steps={steps} width={width} onChange={onChange}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly with props', () => {
        render(<SquareSlider name={name} value={value} min={min} max={max} 
            steps={steps} width={width} onChange={onChange}/>);
        expect(screen.getByText('Label Name')).toBeInTheDocument();
        expect(screen.getByDisplayValue('25')).toBeInTheDocument();
    });
});