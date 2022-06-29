import React from 'react';
import DataTable from '../../components/dataTable/DataTable';

type AmortizationTableProps = {
    
};

const columns = [
    {field: 'year', headerName: 'Year',  sortable: true, minWidth: 100, flex: 1},
    {field: 'principal', headerName: 'Principal', sortable: false, minWidth: 100, flex: 1},
    {field: 'interest', headerName: 'Interest', sortable: false, minWidth: 100, flex: 1},
    {field: 'remainingBalance', headerName: 'Remaining balance', type: 'number', sortable: false, minWidth: 150, flex: 1}
];

const AmortizationTable = ({  }: AmortizationTableProps): JSX.Element => {

    return (
        <section id='AmortizationTable' style={{ width: 600, height: 500 }}>
            <h2>Amortization schedule breakdown</h2>
            <p>This table lists how much principal and interest are scheduled to be paid each year.</p>
            <DataTable rows={[]} columns={columns}/>
        </section>
    );
};

export default AmortizationTable;