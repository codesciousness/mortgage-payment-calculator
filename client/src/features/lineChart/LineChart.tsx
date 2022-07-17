import React from 'react';
import { Chart } from 'react-google-charts';
import './LineChart.css';
import { selectAmortizationSchedule, AmortizationDetail } from '../loansSlice';
import { useAppSelector } from '../../app/hooks';
import { stringToNum } from '../../util/calculations';

type ColumnHeaders = [string, string, string, string];

type DataPoints = [string, number, number, number];

const LineChart = (): JSX.Element => {
    const amortizationSchedule = useAppSelector(selectAmortizationSchedule);

    const columnHeaders: ColumnHeaders = ['Date', 'Principal', 'Interest', 'Balance'];
    const dataPoints: DataPoints = amortizationSchedule.map((row: AmortizationDetail) => 
    [row.date, stringToNum(row.principal), stringToNum(row.interest), stringToNum(row.remainingBalance)]);
    /*const dataPoints: DataPoints = [
        ['07/2022', 1395.27, 6289.73, 262604.73],
        ['08/2022', 4882.66, 21246.34, 259117.34],
        ['09/2022', 8575.21, 35997.79, 255424.79],
        ['10/2022', 12484.99, 50532.01, 251515.01],
        ['11/2022', 16624.79, 64836.21, 247375.21],
        ['12/2022', 21008.11, 78896.89, 242991.89]
    ];*/
    const data = [columnHeaders, ...dataPoints];

    const options = {
        curveType: 'function',
        legend: 'none',
        colors: [
            'PaleTurquoise',
            'DeepSkyBlue',
            'SteelBlue'
        ],
        chartArea: {
            width: '80%',
            height: '90%'
        },
        hAxis: {
            showTextEvery: 5,
            gridlines: {
                color: 'LightGray',
                minSpacing: 5
            }
        },
        vAxis: {
            format: 'short',
            minorGridlines: {
                count: 0
            }
        }
    };

    return (
        <Chart
            chartType='LineChart'
            width='100%'
            height='400px'
            data={data}
            options={options}
        />
    );
};

export default LineChart;