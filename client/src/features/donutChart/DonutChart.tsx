import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import './DonutChart.css';
import { selectPropertyTax, selectHomeInsurance, selectPMI, selectHOAFees, 
    selectMortgagePayment, selectMonthlyPayment } from '../loansSlice';
import { useAppSelector } from '../../app/hooks';
import { useWindowSize } from '../../hooks/use-window-size';
import { stringToNum, formatAmount } from '../../util/calculations';

type Expenses = 'Principal & interest' | 'Property tax' | 'Homeowner\'s insurance' | 'PMI' | 'HOA fees';

type ColumnHeaders = [string, string];

type RowData = [Expenses, number];

const DonutChart = (): JSX.Element => {
    const propertyTax = useAppSelector(selectPropertyTax);
    const homeInsurance = useAppSelector(selectHomeInsurance);
    const privateMortgageInsurance = useAppSelector(selectPMI);
    const hoaFees = useAppSelector(selectHOAFees);
    const mortgagePayment = useAppSelector(selectMortgagePayment);
    const monthlyPayment = useAppSelector(selectMonthlyPayment);
    const PT = stringToNum(propertyTax.dollar);
    const HI = stringToNum(homeInsurance.dollar);
    const PMI = stringToNum(privateMortgageInsurance.dollar);
    const HF = stringToNum(hoaFees.dollar);
    const PI = stringToNum(formatAmount(mortgagePayment));
    const [key, setkey] = useState(0)
    const size = useWindowSize();
    const height = size.width && size.width > 500 ? '400px' : '300px';

    const columnHeaders: ColumnHeaders = ['Mortgage Related Expenses', 'Payment Amount'];
    const rowData: RowData[] = [
        ['Principal & interest', PI],
        ['Property tax',  PT],
        ['Homeowner\'s insurance', HI],
        ['PMI', PMI],
        ['HOA fees', HF]
    ];
    const data = [columnHeaders, ...rowData];

    const total = `$${monthlyPayment}`;

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

    useEffect(() => {
        setkey(prev => prev + 1);
    }, [size.width]);

    return (
        <table id='DonutChart' className='DonutChart'>
            <tbody className='DonutChart__tableBody'>
                <tr className='DonutChart__tableRow'>
                    <td className='DonutChart__tableData'>
                        <Chart
                            key={size.width && size.width > 500 ? null : key}
                            chartType='PieChart'
                            width='100%'
                            height={height}
                            data={data}
                            options={options}
                        />
                        <div className='DonutChart__overlay'>
                            <p className='DonutChart__overlay__title'>Monthly Payment</p>
                            <p className='DonutChart__overlay__payment'>{total}</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default DonutChart;