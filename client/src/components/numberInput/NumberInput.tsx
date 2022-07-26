import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Label from '../label/Label';

type NumberInputProps = {
    name: string;
    value: string | number;
    sign: 'dollar' | 'percent';
    width?: number | string;
    label?: boolean;
    dual?: boolean;
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const NumberInput = ({ name, value, sign, width, label, dual, error, onChange }: NumberInputProps): JSX.Element => {
    const id = name.replaceAll(' ', '');

    const dollarSign = {
        startAdornment: <InputAdornment position="start"><b>$</b></InputAdornment>
    };

    const percentSign = {
        endAdornment: <InputAdornment position="end"><b>%</b></InputAdornment>
    };

    const changeBorders = () => {
        if (dual) {
            if (sign === 'dollar') {
                return {
                    borderRadius: '4px 0 0 4px'
                };
            }
            else {
                return {
                    borderRadius: '0 4px 4px 0'
                };
            }
        }
        return;
    };

    const darkenBorders = () => {
        const border = '1px solid Black';
        if (name.includes('Dollar')) {
            return {
                borderLeft: border,
                borderTop: border,
                borderBottom: border
            }
        }
        else {
            return {
                border
            };
        }
    }

    return (
        <div className='NumberInput' style={!dual ? { marginBottom: '0.75rem' } : undefined}>
            {label && <Label name={name}/>}
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
                        backgroundColor: 'White',
                        '& fieldset': darkenBorders(),
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