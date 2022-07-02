import React, { useState } from 'react';
import { DataGrid, GridToolbarExport, GridColDef, GridRowsProp } from '@mui/x-data-grid';

type DataTableProps = {
    rows: GridRowsProp;
    columns: GridColDef[];
    loading?: boolean;
};

const ExportButton = () => <GridToolbarExport sx={{ color: 'DeepSkyBlue', float: 'right', margin: '0.5rem 0.5rem 0 0.5rem' }}/>;

const DataTable = ({ rows, columns, loading }: DataTableProps): JSX.Element => {
    const [ pageSize, setPageSize ] = useState(5);

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            autoHeight
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={rows.length < 100 ? [5, 10, 25] : [25, 50, 100]}
            pagination
            components={{ Toolbar: ExportButton }}
            sx={{
                '& .MuiDataGrid-columnSeparator': {
                    display: 'none'
                },
                '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'rgba(135, 206, 235, 0.15)'
                }
            }}
        />
    );
};

export default DataTable;