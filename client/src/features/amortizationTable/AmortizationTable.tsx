import React from 'react';
import DataTable from '../../components/dataTable/DataTable';
import './AmortizationTable.css';

const columns = [
    {field: 'year', headerName: 'Year',  sortable: true, minWidth: 100, flex: 1},
    {field: 'principal', headerName: 'Principal', sortable: false, minWidth: 100, flex: 1},
    {field: 'interest', headerName: 'Interest', sortable: false, minWidth: 100, flex: 1},
    {field: 'remainingBalance', headerName: 'Remaining balance', type: 'number', sortable: false, minWidth: 150, flex: 1}
];

const AmortizationTable = (): JSX.Element => {

    return (
        <section id='AmortizationTable' className='AmortizationTable'>
            <h2>Amortization schedule breakdown</h2>
            <p>This table lists how much principal and interest are scheduled to be paid each year.</p>
            <DataTable rows={[]} columns={columns}/>
        </section>
    );
};

export default AmortizationTable;