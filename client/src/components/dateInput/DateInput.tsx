import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Label from '../label/Label';

type DateInputProps = {
    name: string;
    value: Date | null;
    width?: number | string;
    onChange: (date: Date | null, keyboardInputValue?: string | undefined) => void;
};

const DateInput = ({ name, value, width, onChange }: DateInputProps): JSX.Element => {
    const today = new Date();
    const minDate = new Date(`${today.getMonth()}/31/${today.getFullYear()}`);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Label name={name}/>
                <DatePicker
                    value={value}
                    minDate={minDate}
                    onChange={onChange}
                    inputFormat='MM/yyyy'
                    openTo='month'
                    views={['year', 'month']}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            size='small'
                            sx={{
                                width,
                                marginBottom: '0.75rem',
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'White',
                                    '& fieldset': {
                                        border: '1px solid Black',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'DeepSkyBlue',
                                    }
                                }
                            }}
                        />
                    }
                />
            </LocalizationProvider>
        </div>
    );
};

export default DateInput;