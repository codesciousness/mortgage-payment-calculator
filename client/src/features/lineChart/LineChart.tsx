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
    [row.date, stringToNum(row.totalPrincipal), stringToNum(row.totalInterest), stringToNum(row.remainingBalance)]);
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
            showTextEvery: 120,
            gridlines: {
                color: 'LightGray'
            }
        },
        vAxis: {
            format: 'short',
            gridlines: {
                multiple: 50000
            },
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