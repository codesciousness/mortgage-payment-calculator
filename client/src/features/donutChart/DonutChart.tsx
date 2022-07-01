import React from 'react';
import { Chart } from "react-google-charts";
import './DonutChart.css';

type Expenses = 'Principal & interest' | 'Property tax' | 'Homeowner\'s insurance' | 'HOA fees' | 'Other costs';

type ColumnHeaders = [string, string];

type RowData = [Expenses, number];

const DonutChart = (): JSX.Element => {
    const columnHeaders: ColumnHeaders = ['Mortgage Related Expenses', 'Payment Amount'];
    const rowData: RowData = [
        ['Principal & interest', 11],
        ['Property tax', 2],
        ['Homeowner\'s insurance', 2],
        ['HOA fees', 2],
        ['Other costs', 7]
    ];
    const data = [columnHeaders, ...rowData];

    const total = '$2,500';

    const options = {
        pieHole: 0.65,
        is3D: false,
        pieSliceText: 'none',
        legend: 'none',
        slices: {
            0: { color: 'DeepSkyBlue' },
            1: { color: 'LightSkyBlue' },
            2: { color: 'SkyBlue' },
            3: { color: 'PowderBlue' },
            4: { color: 'PaleTurquoise' }
        },
        chartArea: {
            left: 10,
            top: 0,
            width: '95%',
            height: '100%'
        }
    };

    return (
        <table id='DonutChart' className='DonutChart'>
            <tr className='DonutChart__tableRow'>
                <td className='DonutChart__tableData'>
                    <Chart
                        chartType='PieChart'
                        width='100%'
                        height='400px'
                        data={data}
                        options={options}
                    />
                    <div className='DonutChart__overlay'>
                        <p className='DonutChart__overlay__title'>Monthly Payment</p>
                        <p className='DonutChart__overlay__payment'>{total}</p>
                    </div>
                </td>
            </tr>
        </table>
    );
};

export default DonutChart;