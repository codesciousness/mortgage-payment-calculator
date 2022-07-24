import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import './LineChart.css';
import { selectAmortizationSchedule, AmortizationDetail } from '../loansSlice';
import { useAppSelector } from '../../app/hooks';
import { useWindowSize } from '../../hooks/use-window-size';
import { stringToNum } from '../../util/calculations';

type ColumnHeaders = [string, string, string, string];

type DataPoints = [string, number, number, number];

const LineChart = (): JSX.Element => {
    const amortizationSchedule = useAppSelector(selectAmortizationSchedule);
    const [key, setkey] = useState(false)
    const size = useWindowSize();
    const height = size.width && size.width > 400 ? '400px' : '300px';

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
            width: '90%',
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

    useEffect(() => {
        setkey(!key)
    }, [key, size.width]);

    return (
        <Chart
            chartType='LineChart'
            width='100%'
            height={height}
            data={data}
            options={options}
        />
    );
};

export default LineChart;