import React from 'react';
import DonutChart from '../donutChart/DonutChart';
import DonutChartLegend from '../donutChartLegend/DonutChartLegend';
import './MonthlyPayment.css';

const MonthlyPayment = (): JSX.Element => {

    return (
        <section id='MonthlyPayment' className='MonthlyPayment'>
            <div className='MonthlyPayment__donutChart'>
                <h2 className='MonthlyPayment__title'>Monthly payment breakdown</h2>
                <DonutChart/>
            </div>
            <DonutChartLegend/>
        </section>
    );
};

export default MonthlyPayment;