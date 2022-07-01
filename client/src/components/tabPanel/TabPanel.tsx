import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

type TabPanelProps = {
    children: React.ReactNode,
    value: number,
    index: number
};

const TabPanel = ({ children, value, index }: TabPanelProps): JSX.Element => {

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <Box component={Paper} elevation={4} sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

export default TabPanel;