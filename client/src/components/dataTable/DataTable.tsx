import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridToolbarExport } from '@mui/x-data-grid';

/**
 * Commented out pageSize prop on DataGrid because of open issue #3154
 * Print Export of DataGrid asks for Pro License when useState is passed as pageSize
 * Current behavior: When a state from a React useState is passed as "pageSize" parameter for DataGrid, 
 * the Application will crash and ask the user to buy a pro license, if more than 100 Entries are in 
 * the table and Export -> Print is attempted. This does not happen if nothing is passed for pageSize
 * The solution that I implemented to get around this issue is to set initial pageSize using 
 * the initialState prop instead.
 */

type DataTableProps = {
    rows: GridRowsProp;
    columns: GridColDef[];
    loading?: boolean;
};

const ExportButton = () => <GridToolbarExport sx={{ color: 'DeepSkyBlue', float: 'right', margin: '0.5rem 0.5rem 0 0.5rem' }}/>;

const DataTable = ({ rows, columns, loading }: DataTableProps): JSX.Element => {
    const [ pageSize, setPageSize ] = useState<number>(10);

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            autoHeight
            //pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            pagination
            initialState={{
                pagination: {
                  pageSize: 10,
                }
            }}
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