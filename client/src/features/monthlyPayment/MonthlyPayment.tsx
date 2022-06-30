import React from 'react';
import DonutChart from '../../components/donutChart/DonutChart';

type MonthlyPaymentProps = {
    
};

const MonthlyPayment = ({  }: MonthlyPaymentProps): JSX.Element => {

    return (
        <section id='MonthlyPayment'>
            <DonutChart/>
        </section>
    );
};

export default MonthlyPayment;