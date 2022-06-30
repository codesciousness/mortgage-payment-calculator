import { relative } from 'path';
import React from 'react';
import { Chart } from "react-google-charts";
import { styles } from '../../styles';

enum Expenses {
    PI = 'Principal & interest',
    PT = 'Property tax',
    HI = 'Homeowner\'s insurance',
    HOA = 'HOA fees',
    OTH = 'Other costs'
};

type ColumnHeaders = [string, string];

type RowData = [Expenses, number];

const DonutChart = (): JSX.Element => {
    const columnHeaders: ColumnHeaders = ['Mortgage Related Expenses', 'Payment Amount'];
    const rowData: RowData = [
        [Expenses.PI, 11],
        [Expenses.PT, 2],
        [Expenses.HI, 2],
        [Expenses.HOA, 2],
        [Expenses.OTH, 7]
    ];
    const data = [columnHeaders, ...rowData];

    const total = '$2,500';

    const options = {
        pieHole: 0.6,
        is3D: false,
        pieSliceText: 'none',
        legend: 'none',
        backgroundColor: 'whitesmoke',
        slices: {
            0: { color: 'DeepSkyBlue' },
            1: { color: 'LightSkyBlue' },
            2: { color: 'SkyBlue' },
            3: { color: 'PowderBlue' },
            4: { color: 'PaleTurquoise' }
        }
    };

    return (
        <table id='DonutChart'>
            <tr>
                <td style={styles.chartTableData}>
                    <Chart
                        chartType='PieChart'
                        width='500px'
                        height='500px'
                        data={data}
                        options={options}
                    />
                    <div id='Overlay' style={styles.chartOverlay}>
                        <p style={styles.chartOverlayOtherText}>Monthly Payment</p>
                        <p style={styles.chartOverlayMainText}>{total}</p>
                    </div>
                </td>
            </tr>
        </table>
    );
};

export default DonutChart;