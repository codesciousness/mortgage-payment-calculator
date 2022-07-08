import React from 'react';
import AmortizationTable from '../amortizationTable/AmortizationTable';
import LineChart from '../lineChart/LineChart';
import LineChartLegend from '../lineChartLegend/LineChartLegend';
import Box from '@mui/material/Box';
import './AmortizationSchedule.css';

const styles = {
    borderTop: 1, 
    borderBottom: 1, 
    borderColor: 'divider', 
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: '0.5rem',
};

const AmortizationSchedule = (): JSX.Element => {

    return (
        <section id='AmortizationSchedule' className='AmortizationSchedule'>
            <h2>Amortization for mortgage loan</h2>
            <p>Amortization is paying off debt over time in equal installments. As the term of your mortgage loan progresses,
                a larger share of your payment goes toward paying down the principal until the loan is paid in full at the end of your term.</p>
            <Box sx={styles}>
                <div className='AmortizationSchedule__container'>
                    <p className='AmortizationSchedule__label'>Loan amount</p>
                    <p className='AmortizationSchedule__amount loan'>264,000</p>
                </div>
                <div className='AmortizationSchedule__container'>
                    <p className='AmortizationSchedule__label'>Total interest paid</p>
                    <p className='AmortizationSchedule__amount interest'>289,587</p>
                </div>
                <div className='AmortizationSchedule__container'>
                    <p className='AmortizationSchedule__label'>Total cost of loan</p>
                    <p className='AmortizationSchedule__amount cost'>553,587</p>
                </div>
                <div className='AmortizationSchedule__container'>
                    <p className='AmortizationSchedule__label'>Payoff Date</p>
                    <p className='AmortizationSchedule__date'>Jul 2052</p>
                </div>
            </Box>
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