import React from 'react';
import Box from '@mui/material/Box';
import './DonutChartLegend.css';

const styles = {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderBottom: 1, 
    borderColor: 'divider'
}

const DonutChartLegend = (): JSX.Element => {
    const principalAndInterest = 1500;
    const propertyTax = 45;
    const homeownersInsurance = 60;
    const HOAFees = 25;
    const otherCosts = 50;
    const totalMonthlyPayment = principalAndInterest + propertyTax + homeownersInsurance + HOAFees + otherCosts;

    return (
        <section id='DonutChartLegend' className='DonutChartLegend'>
            <Box sx={styles}>
                <p className='DonutChartLegend__label color__codes principal'>Principal &amp; interest</p>
                <p className='DonutChartLegend__amount'>${principalAndInterest}</p>
            </Box>
            <Box sx={styles}>
                <p className='DonutChartLegend__label color__codes propertyTax'>Property tax</p>
                <p className='DonutChartLegend__amount'>${propertyTax}</p>
            </Box>
            <Box sx={styles}>
                <p className='DonutChartLegend__label color__codes homeownersInsurance'>Homeowner's insurance</p>
                <p className='DonutChartLegend__amount'>${homeownersInsurance}</p>
            </Box>
            <Box sx={styles}>
                <p className='DonutChartLegend__label color__codes HOAFees'>HOA fees</p>
                <p className='DonutChartLegend__amount'>${HOAFees}</p>
            </Box>
            <Box sx={styles}>
                <p className='DonutChartLegend__label color__codes otherCosts'>Other costs</p>
                <p className='DonutChartLegend__amount'>${otherCosts}</p>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className='DonutChartLegend__label totalMonthlyPayment'><b>Total monthly payment</b></p>
                <p className='DonutChartLegend__amount'><b>${totalMonthlyPayment}</b></p>
            </Box>
        </section>
    );
};

export default DonutChartLegend;