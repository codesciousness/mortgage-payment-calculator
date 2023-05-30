import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import TabPanel from '../TabPanel';

const children = <section data-testid="TabPanel-element">Test Node</section>;
const valueVisible = 0;
const valueHidden = 1;
const index = 0;

describe('<TabPanel />', () => {
    test('TabPanel component is defined', () => {
        expect(<TabPanel children={children} value={valueHidden} index={index}/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<TabPanel children={children} value={valueVisible} index={index}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('displays children when the value equals the index', () => {
        render(<TabPanel children={children} value={valueVisible} index={index}/>);
        expect(screen.getByTestId('TabPanel-element')).toBeInTheDocument();
        expect(screen.getByText('Test Node')).toBeInTheDocument();
    });
    test('does not display children when the value is not equal to the index', () => {
        render(<TabPanel children={children} value={valueHidden} index={index}/>);
        expect(screen.queryByTestId('TabPanel-element')).not.toBeInTheDocument();
        expect(screen.queryByText('Test Node')).not.toBeInTheDocument();
    });
});