import React from 'react';
import AndroidSwitch from './AndroidSwitch';

type SwitchProps = {
    name: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StyledSwitch = ({ name, checked, onChange }:  SwitchProps): JSX.Element => {
    const id = name.replaceAll(' ', '');

    return (
        <AndroidSwitch
            id={id}
            checked={checked}
            onChange={onChange}
            sx={{
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    background: 'linear-gradient(to left, SkyBlue, DeepSkyBlue)',
                },
                '& .MuiSwitch-thumb': {
                    backgroundColor: 'DeepSkyBlue',
                },
                '& .MuiSwitch-track': {
                    backgroundColor: 'LightSkyBlue',
                },
            }}
        />
    );
};

export default StyledSwitch;