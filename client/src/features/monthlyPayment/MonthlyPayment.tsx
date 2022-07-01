import React from 'react';
import DonutChart from '../donutChart/DonutChart';
import './MonthlyPayment.css';

const MonthlyPayment = (): JSX.Element => {

    return (
        <section id='MonthlyPayment' className='MonthlyPayment'>
            <div className='MonthlyPayment__donutChart'>
                <h2>Monthly payment breakdown</h2>
                <DonutChart/>
            </div>
        </section>
    );
};

export default MonthlyPayment;