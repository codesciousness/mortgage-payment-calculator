import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

type NumberInputProps = {
    name: string;
    value: number;
    sign: 'dollar' | 'percent'
    error?: string;
    onChange: () => void;
}

const NumberInput = ({ name, value, sign, error, onChange }: NumberInputProps): JSX.Element => {

    const dollarSign = {
        startAdornment: <InputAdornment position="start"><b>$</b></InputAdornment>
    }

    const percentSign = {
        endAdornment: <InputAdornment position="end"><b>%</b></InputAdornment>
    }

    return (
        <TextField
            id={name}
            name={name}
            label={name}
            onChange={onChange}
            helperText={error}
            InputProps={sign === 'dollar' ? dollarSign : percentSign}
            sx={{
                margin: '2rem 0',
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: 'DeepSkyBlue',
                    }
                }
            }}
        >
            {value}
        </TextField>
    );
}

export default NumberInput;