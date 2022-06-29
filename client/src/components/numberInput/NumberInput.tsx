import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Label from '../label/Label';
import { styles } from '../../styles';

type NumberInputProps = {
    name: string;
    value: number;
    sign: 'dollar' | 'percent';
    width?: number | string;
    dual?: boolean;
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const NumberInput = ({ name, value, sign, width, dual, error, onChange }: NumberInputProps): JSX.Element => {
    const id = name.replaceAll(' ', '');

    const dollarSign = {
        startAdornment: <InputAdornment position="start"><b>$</b></InputAdornment>
    };

    const percentSign = {
        endAdornment: <InputAdornment position="end"><b>%</b></InputAdornment>
    };

    const dollarBorders = {
        borderRadius: '4px 0 0 4px',
        borderRightWidth: 'thin'
    };

    const percentBorders = {
        borderRadius: '0 4px 4px 0',
        borderLeftWidth: 'thin'
    };

    const changeBorders = () => {
        if (dual) {
            if (sign === 'dollar') {
                return dollarBorders;
            }
            else {
                return percentBorders;
            }
        }
        return;
    };

    return (
        <div style={!dual ? styles.input : undefined}>
            {!dual && <Label name={name}/>}
            <TextField
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                helperText={error}
                size='small'
                InputProps={sign === 'dollar' ? dollarSign : percentSign}
                sx={{
                    width,
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'DeepSkyBlue',
                        }
                    },
                    '& fieldset': changeBorders()
                }}
            >
                {value}
            </TextField>
        </div>
    );
};

export default NumberInput;