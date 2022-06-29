import React from 'react';
import Switch from '@mui/material/Switch';

type OptionsSwitchProps = {
    name: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const  OptionsSwitch = ({ name, checked, onChange }:  OptionsSwitchProps): JSX.Element => {
    const id = name.replaceAll(' ', '');

    return (
        <Switch
            id={id}
            checked={checked}
            onChange={onChange}
            sx={{
                '& .MuiSwitch-thumb': {
                    backgroundColor: 'DeepSkyBlue'
                },
                '& .MuiSwitch-track': {
                    backgroundColor: 'SkyBlue',
                }
            }}
        />
    );
};

export default OptionsSwitch;