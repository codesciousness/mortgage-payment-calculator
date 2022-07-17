import React from 'react';
import Box from '@mui/material/Box';
import './DonutChartLegend.css';
import { selectPropertyTaxes, selectHomeInsurance, selectHOAFees, selectOtherCosts, 
    selectMortgagePayment, selectMonthlyPayment } from '../loansSlice';
import { useAppSelector } from '../../app/hooks';

const styles = {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderBottom: 1, 
    borderColor: 'divider'
}

const DonutChartLegend = (): JSX.Element => {
    const propertyTaxes = useAppSelector(selectPropertyTaxes);
    const homeInsurance = useAppSelector(selectHomeInsurance);
    const hoaFees = useAppSelector(selectHOAFees);
    const otherCosts = useAppSelector(selectOtherCosts);
    const mortgagePayment = useAppSelector(selectMortgagePayment);
    const monthlyPayment = useAppSelector(selectMonthlyPayment);

    return (
        <section id='DonutChartLegend' className='DonutChartLegend'>
            <Box sx={styles}>
                <p className='DonutChartLegend__label color__codes principal'>Principal &amp; interest</p>
                <p className='DonutChartLegend__amount'>${mortgagePayment}</p>
            </Box>
            <Box sx={styles}>
                <p className='DonutChartLegend__label color__codes propertyTax'>Property tax</p>
                <p className='DonutChartLegend__amount'>${propertyTaxes.dollar}</p>
            </Box>
            <Box sx={styles}>
                <p className='DonutChartLegend__label color__codes homeownersInsurance'>Homeowner's insurance</p>
                <p className='DonutChartLegend__amount'>${homeInsurance.dollar}</p>
            </Box>
            <Box sx={styles}>
                <p className='DonutChartLegend__label color__codes HOAFees'>HOA fees</p>
                <p className='DonutChartLegend__amount'>${hoaFees.dollar}</p>
            </Box>
            <Box sx={styles}>
                <p className='DonutChartLegend__label color__codes otherCosts'>Other costs</p>
                <p className='DonutChartLegend__amount'>${otherCosts.dollar}</p>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className='DonutChartLegend__label totalMonthlyPayment'><b>Total monthly payment</b></p>
                <p className='DonutChartLegend__amount'><b>${monthlyPayment}</b></p>
            </Box>
        </section>
    );
};

export default DonutChartLegend;