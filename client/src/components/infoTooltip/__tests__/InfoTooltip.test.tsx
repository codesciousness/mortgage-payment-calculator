import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';
import InfoTooltip from '../InfoTooltip';

const title = 'Title';

describe('<InfoTooltip />', () => {
    test('InfoTooltip component is defined', () => {
        expect(<InfoTooltip title={title}/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<InfoTooltip title={title}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly when title prop is provided', () => {
        render(<InfoTooltip title={title}/>);
        expect(screen.queryByText('Title')).not.toBeInTheDocument();
    });
    test('displays title when button is clicked', () => {
        render(<InfoTooltip title={title}/>);
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText('Title')).toBeInTheDocument();
    });
});