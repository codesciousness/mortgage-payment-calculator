import React from 'react';
import AmortizationTable from '../amortizationTable/AmortizationTable';
import LineChart from '../lineChart/LineChart';
import LineChartLegend from '../lineChartLegend/LineChartLegend';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import './AmortizationSchedule.css';
import { selectLoanAmount, selectTotalInterest, selectLoanCost, selectPayoffDate } from '../loansSlice';
import { useAppSelector } from '../../app/hooks';

const AmortizationSchedule = (): JSX.Element => {
    const loanAmount = useAppSelector(selectLoanAmount);
    const totalInterest = useAppSelector(selectTotalInterest);
    const loanCost = useAppSelector(selectLoanCost);
    const payoffDate = useAppSelector(selectPayoffDate);

    return (
        <section id='AmortizationSchedule' className='AmortizationSchedule'>
            <h2 className='AmortizationSchedule__title'>Amortization for mortgage loan</h2>
            <p className='AmortizationSchedule__content'>Amortization is paying off debt over time in equal installments. As the term of your mortgage loan progresses,
                a larger share of your payment goes toward paying down the principal until the loan is paid in full at the end of your term.</p>
            <Box className='AmortizationSchedule__loanTotals' sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider', }}>
                <div className='AmortizationSchedule__container'>
                    <p className='AmortizationSchedule__label'>Loan amount</p>
                    <p className='AmortizationSchedule__amount loan'>{loanAmount}</p>
                </div>
                <div className='AmortizationSchedule__container'>
                    <p className='AmortizationSchedule__label'>Total interest paid</p>
                    <p className='AmortizationSchedule__amount interest'>{totalInterest}</p>
                </div>
                <div className='AmortizationSchedule__container'>
                    <p className='AmortizationSchedule__label'>Total cost of loan</p>
                    <p className='AmortizationSchedule__amount cost'>{loanCost}</p>
                </div>
                <div className='AmortizationSchedule__container'>
                    <p className='AmortizationSchedule__label'>Payoff Date</p>
                    <p className='AmortizationSchedule__date'>{payoffDate}</p>
                </div>
            </Box>
            <div className='AmortizationSchedule__LineChart__container'>
                <div className='AmortizationSchedule__LineChart'>
                    <LineChart/>
                </div>
                <LineChartLegend/>
            </div>
            <Divider className='AmortizationSchedule__divider' sx={{ margin: '2rem' }}/>
            <AmortizationTable />
        </section>
    );
};

export default AmortizationSchedule;