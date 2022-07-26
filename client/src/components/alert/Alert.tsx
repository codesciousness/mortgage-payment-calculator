import React from 'react';
import Alert from '@mui/material/Alert';

type AlertMsgProps = {
    msg: string | boolean;
    severity: 'error' | 'warning' | 'info' | 'success';
    color?: 'error' | 'warning' | 'info' | 'success';
    onClose: () => void;
};

const AlertMsg = ({ msg, severity, color, onClose }: AlertMsgProps): JSX.Element => {

    return (
        <Alert
            severity={severity}
            color={color}
            onClose={onClose}
            sx={{
                margin: '0.5rem 1rem'
            }}
        >
            {msg}
        </Alert>
    );
};

export default AlertMsg;