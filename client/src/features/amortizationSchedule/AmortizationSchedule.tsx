import React from 'react';
import AmortizationTable from '../amortizationTable/AmortizationTable';
import LineChart from '../lineChart/LineChart';
import LineChartLegend from '../lineChartLegend/LineChartLegend';
import './AmortizationSchedule.css';

const AmortizationSchedule = (): JSX.Element => {

    return (
        <section id='AmortizationSchedule' className='AmortizationSchedule'>
            <h2>Amortization for mortgage loan</h2>
            <p>Amortization is paying off debt over time in equal installments. As the term of your mortgage loan progresses,
                a larger share of your payment goes toward paying down the principal until the loan is paid in full at the end of your term.</p>
            <div className='AmortizationSchedule__LineChart__container'>
                <div className='AmortizationSchedule__LineChart'>
                    <LineChart/>
                </div>
                <LineChartLegend/>
            </div>
            <AmortizationTable />
        </section>
    );
};

export default AmortizationSchedule;