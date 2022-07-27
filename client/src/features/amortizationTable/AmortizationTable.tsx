import React from 'react';
import DataTable from '../../components/dataTable/DataTable';
import './AmortizationTable.css';
import { selectAmortizationSchedule, AmortizationDetail } from '../loansSlice';
import { useAppSelector } from '../../app/hooks';

const columns = [
    { field: 'date', headerName: 'Date',  sortable: false, minWidth: 100, flex: 1 },
    { field: 'principal', headerName: 'Principal', sortable: false, minWidth: 100, flex: 1 },
    { field: 'interest', headerName: 'Interest', sortable: false, minWidth: 100, flex: 1 },
    { field: 'remainingBalance', headerName: 'Remaining balance', sortable: false, minWidth: 150, flex: 1 }
];

const AmortizationTable = (): JSX.Element => {
    const amortizationSchedule = useAppSelector(selectAmortizationSchedule);

    const rows = amortizationSchedule.map((row: AmortizationDetail, idx: number) => (
        {
            id: idx,
            date: row.date,
            principal: '$' + row.principal,
            interest: '$' + row.interest,
            remainingBalance: '$' + row.remainingBalance
        }
    ));

    return (
        <section id='AmortizationTable' className='AmortizationTable'>
            <h2 className='AmortizationTable__title'>Amortization schedule breakdown</h2>
            <p className='AmortizationTable__content'>This table lists how much principal and interest are scheduled to be paid each year.</p>
            <DataTable rows={rows} columns={columns}/>
        </section>
    );
};

export default AmortizationTable;