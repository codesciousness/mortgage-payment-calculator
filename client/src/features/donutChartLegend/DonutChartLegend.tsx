import React from 'react';
import Box from '@mui/material/Box';
import './DonutChartLegend.css';
import { selectPropertyTax, selectHomeInsurance, selectPMI, selectHOAFees, 
    selectMortgagePayment, selectMonthlyPayment } from '../loansSlice';
import { useAppSelector } from '../../app/hooks';
import { formatAmount } from '../../util/calculations';

const styles = {
    borderBottom: 1, 
    borderColor: 'divider'
};

const DonutChartLegend = (): JSX.Element => {
    const propertyTax = useAppSelector(selectPropertyTax);
    const homeInsurance = useAppSelector(selectHomeInsurance);
    const privateMortgageInsurance = useAppSelector(selectPMI);
    const hoaFees = useAppSelector(selectHOAFees);
    const mortgagePayment = useAppSelector(selectMortgagePayment);
    const monthlyPayment = useAppSelector(selectMonthlyPayment);

    return (
        <section id='DonutChartLegend' className='DonutChartLegend'>
            <Box className='DonutChartLegend__container' sx={styles}>
                <p className='DonutChartLegend__label color__codes principal'>Principal &amp; interest</p>
                <p className='DonutChartLegend__amount'>${formatAmount(mortgagePayment)}</p>
            </Box>
            <Box className='DonutChartLegend__container' sx={styles}>
                <p className='DonutChartLegend__label color__codes propertyTax'>Property tax</p>
                <p className='DonutChartLegend__amount'>${propertyTax.dollar}</p>
            </Box>
            <Box className='DonutChartLegend__container' sx={styles}>
                <p className='DonutChartLegend__label color__codes homeownersInsurance'>Homeowner's insurance</p>
                <p className='DonutChartLegend__amount'>${homeInsurance.dollar}</p>
            </Box>
            <Box className='DonutChartLegend__container' sx={styles}>
                <p className='DonutChartLegend__label color__codes PMI'>Private mortgage insurance</p>
                <p className='DonutChartLegend__amount'>${privateMortgageInsurance.dollar}</p>
            </Box>
            <Box className='DonutChartLegend__container' sx={styles}>
                <p className='DonutChartLegend__label color__codes HOAFees'>HOA fees</p>
                <p className='DonutChartLegend__amount'>${hoaFees.dollar}</p>
            </Box>
            <Box className='DonutChartLegend__container'>
                <p className='DonutChartLegend__label totalMonthlyPayment'><b>Total monthly payment</b></p>
                <p className='DonutChartLegend__amount'><b>${monthlyPayment}</b></p>
            </Box>
        </section>
    );
};

export default DonutChartLegend;