import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type DataTableProps = {
    name: string;
    rows: any[];
    columns: GridColDef[];
    width: number | string;
    height: number | string;
    loading?: boolean;
};

const DataTable = ({ name, rows, columns, width, height, loading }: DataTableProps): JSX.Element => {
    const id = name.replaceAll(' ', '');

    return (
        <section id={id} style={{ width, height }}>
            <h2>Amortization schedule breakdown</h2>
            <p>This table lists how much principal and interest are scheduled to be paid each year.</p>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                autoPageSize
                rowsPerPageOptions={rows.length < 100 ? [5, 10, 25] : [25, 50, 100]}
                loading={loading}
            />
        </section>
    );
};

export default DataTable;