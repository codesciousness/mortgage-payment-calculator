import React from 'react';
import TextField from '@mui/material/TextField';

type TextInputProps = {
    name: string;
    value: string;
    width?: number | string;
    placeholder?: string;
    error?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({ name, value, placeholder, width, error, onChange }: TextInputProps): JSX.Element => {
    const id = name.replaceAll(' ', '');

    return (
        <TextField
            id={id}
            name={name}
            value={value}
            label={name}
            placeholder={placeholder ? placeholder : `Enter your ${name.toLowerCase()}`}
            onChange={onChange}
            helperText={error}
            size='small'
            sx={{
                width,
                margin: '0.25rem 0',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        border: '1px solid Black',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'DeepSkyBlue',
                    }
                }
            }}
        >
            {value}
        </TextField>
    );
};

export default TextInput;