import React from 'react';
import Box from '@mui/material/Box';
import './LineChartLegend.css';

const styles = {
    borderBottom: 1, 
    borderColor: 'divider'
}

const LineChartLegend = (): JSX.Element => {

    return (
        <section id='LineChartLegend' className='LineChartLegend'>
            <Box sx={styles}>
                <p className='LineChartLegend__label principal'>Principal</p>
            </Box>
            <Box sx={styles}>
                <p className='LineChartLegend__label interest'>Interest</p>
            </Box>
            <Box sx={styles}>
                <p className='LineChartLegend__label balance'>Balance</p>
            </Box>
        </section>
    );
};

export default LineChartLegend;