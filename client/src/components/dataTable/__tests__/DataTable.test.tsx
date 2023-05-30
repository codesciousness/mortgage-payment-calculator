import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import DataTable from '../DataTable';

const columns = [
    { field: 'date', headerName: 'Date',  sortable: false, minWidth: 100, flex: 1 },
    { field: 'principal', headerName: 'Principal', sortable: false, minWidth: 100, flex: 1 },
    { field: 'interest', headerName: 'Interest', sortable: false, minWidth: 100, flex: 1 },
    { field: 'remainingBalance', headerName: 'Remaining balance', sortable: false, minWidth: 150, flex: 1 }
];

const rows = [
    { id: 0, date: '07/2022', principal: '$1,395.27', interest: '$6,289.73', remainingBalance: '$262,604.73' },
    { id: 1, date: '08/2022', principal: '$4,882.66', interest: '$21,246.34', remainingBalance: '$259,117.34' },
    { id: 2, date: '09/2022', principal: '$8,575.21', interest: '$35,997.79', remainingBalance: '$255,424.79' },
    { id: 3, date: '10/2022', principal: '$12,484.99', interest: '$50,532.01', remainingBalance: '$251,515.01' },
    { id: 4, date: '11/2022', principal: '$16,624.79', interest: '$64,836.21', remainingBalance: '$247,375.21' },
    { id: 5, date: '12/2022', principal: '$21,008.11', interest: '$78,896.89', remainingBalance: '$242,991.89' }
];

const loadingFalse = false;

describe('<DataTable />', () => {
    test('DataTable component is defined', () => {
        expect(<DataTable rows={rows} columns={columns}/>).toBeDefined();
    });
    test('component matches the snapshot', () => {
        const component = create(<DataTable rows={rows} columns={columns} loading={loadingFalse}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly with props', () => {
        render(<DataTable rows={rows} columns={columns} loading={loadingFalse}/>);
        expect(screen.getByText('Principal')).toBeInTheDocument();
        expect(screen.getByText('$1,395.27')).toBeInTheDocument();
    });
});