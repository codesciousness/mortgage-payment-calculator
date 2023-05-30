import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { store } from '../../../app/store';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import EmailForm from '../EmailForm';

const server = setupServer(
    rest.post('/loans', (req, res, ctx) => {
        return res(ctx.json({}));
    }),
);
  
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<EmailForm />', () => {
    test('EmailForm component is defined', () => {
        expect(<EmailForm/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(
            <Provider store={store}>
                <EmailForm/>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly with initial state from Redux store', () => {
        render(
            <Provider store={store}>
                <EmailForm/>
            </Provider>
        );
        expect(screen.getByText('Email your mortgage payment summary!')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    });
    test('displays a success alert when button is clicked and name and email are filled correctly', async () => {
        render(
            <Provider store={store}>
                <EmailForm/>
            </Provider>
        );
        expect(screen.queryByText('Loan data submitted successfully!')).not.toBeInTheDocument();
        fireEvent.change(screen.getByPlaceholderText('Enter your name'), {target: {value: 'Bob Test'}});
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), {target: {value: 'bob.test@company.com'}});
        fireEvent.click(screen.getByText('Send'));
        await screen.findByText('Loan data submitted successfully!');
    });
    test('displays an error alert when button is clicked and name and email are blank', async () => {
        server.use(
            rest.post('/loans', (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json('Please provide a name and email address.')
                );
            }),
        );
        render(
            <Provider store={store}>
                <EmailForm/>
            </Provider>
        );
        expect(screen.queryByText('Please provide a name and email address.')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Send'));
        await screen.findByText('Please provide a name and email address.');
    });
});