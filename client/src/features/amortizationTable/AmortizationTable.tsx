import React from 'react';
import DataTable from '../../components/dataTable/DataTable';
import './AmortizationTable.css';

const columns = [
    { field: 'year', headerName: 'Year',  sortable: true, minWidth: 100, flex: 1 },
    { field: 'principal', headerName: 'Principal', sortable: false, minWidth: 100, flex: 1 },
    { field: 'interest', headerName: 'Interest', sortable: false, minWidth: 100, flex: 1 },
    { field: 'remainingBalance', headerName: 'Remaining balance', sortable: false, minWidth: 150, flex: 1 }
];

const AmortizationTable = (): JSX.Element => {
    const rows = [
        { id: 0, year: 2022, principal: '$1,395.27', interest: '$6,289.73', remainingBalance: '$262,604.73' },
        { id: 1, year: 2023, principal: '$4,882.66', interest: '$21,246.34', remainingBalance: '$259,117.34' },
        { id: 2, year: 2024, principal: '$8,575.21', interest: '$35,997.79', remainingBalance: '$255,424.79' },
        { id: 3, year: 2025, principal: '$12,484.99', interest: '$50,532.01', remainingBalance: '$251,515.01' },
        { id: 4, year: 2026, principal: '$16,624.79', interest: '$64,836.21', remainingBalance: '$247,375.21' },
        { id: 5, year: 2027, principal: '$21,008.11', interest: '$78,896.89', remainingBalance: '$242,991.89' }
    ];

    return (
        <section id='AmortizationTable' className='AmortizationTable'>
            <h2>Amortization schedule breakdown</h2>
            <p>This table lists how much principal and interest are scheduled to be paid each year.</p>
            <DataTable rows={rows} columns={columns}/>
        </section>
    );
};

export default AmortizationTable;