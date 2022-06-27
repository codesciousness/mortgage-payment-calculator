import React from 'react';
import TextField from '@mui/material/TextField';

type TextInputProps = {
    name: string;
    value: string;
    placeholder: string;
    error?: string;
    onChange: () => void;
}

const TextInput = ({ name, value, placeholder, error, onChange }: TextInputProps): JSX.Element => {

    return (
        <TextField
            id={name}
            name={name}
            label={name}
            placeholder={`Enter your ${placeholder}`}
            onChange={onChange}
            helperText={error}
            required
            sx={{
                margin: '2rem 1rem',
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

export default TextInput;