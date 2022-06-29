import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type DataTableProps = {
    rows: any[];
    columns: GridColDef[];
    loading?: boolean;
};

const DataTable = ({ rows, columns, loading }: DataTableProps): JSX.Element => {

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            autoPageSize
            rowsPerPageOptions={rows.length < 100 ? [5, 10, 25] : [25, 50, 100]}
            loading={loading}
            sx={{
                '& .MuiDataGrid-columnSeparator': {
                    display: 'none'
                }
            }}
        />
    );
};

export default DataTable;