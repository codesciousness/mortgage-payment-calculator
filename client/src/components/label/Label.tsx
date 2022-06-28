import React from 'react';
import InputLabel from '@mui/material/InputLabel';

type LabelProps = {
    name: string;
    focused?: boolean;
};

const Label = ({ name, focused }: LabelProps): JSX.Element => {
    const id = name.replaceAll(' ', '');

    return (
        <InputLabel
            id={id}
            focused={focused}
            sx={{
                textAlign: 'left',
                margin: '0.25rem 0'
            }}
        >
            {name}
        </InputLabel>
    );
};

export default Label;