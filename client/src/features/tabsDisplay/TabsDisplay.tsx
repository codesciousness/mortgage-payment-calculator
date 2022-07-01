import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '../../components/tabPanel/TabPanel';
import MonthlyPayment from '../monthlyPayment/MonthlyPayment';
import AmortizationSchedule from '../amortizationSchedule/AmortizationSchedule';
import './TabsDisplay.css';

const TabsDisplay = (): JSX.Element => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    aria-label='tabs-display'
                    sx={{
                        '& .MuiButtonBase-root.MuiTab-root': {
                            fontWeight: 'bold',
                            textTransform: 'none'
                        },
                        '& .Mui-selected': {
                            color: 'DeepSkyBlue'
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'DeepSkyBlue',
                            height: 3
                        }
                    }}
                >
                    <Tab label='Monthly payment'/>
                    <Tab label='Amortization'/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <MonthlyPayment/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AmortizationSchedule/>
            </TabPanel>
        </Box>
    );
};

export default TabsDisplay;