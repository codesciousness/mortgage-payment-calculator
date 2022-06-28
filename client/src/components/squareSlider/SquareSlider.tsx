import React from 'react';
import Slider from '@mui/material/Slider';
import Label from '../label/Label';
import { styles } from '../../styles';

type SquareSliderProps = {
    name: string;
    value: number;
    defaultValue: number;
    min: number;
    max: number;
    steps: number;
    width: number | string;
    onChange: () => void;
};

const SquareSlider = ({ name, value, defaultValue, min, max, steps, width, onChange }: SquareSliderProps): JSX.Element => {
    const id = name.replaceAll(' ', '');

    return (
        <div style={styles.input}>
            <Label name={name}/>
            <Slider
                id={id}
                name={name}
                aria-label={name}
                value={value}
                defaultValue={defaultValue}
                valueLabelDisplay="on"
                min={min}
                max={max}
                step={steps}
                onChange={onChange}
                sx={{
                    width,
                    marginTop: '2rem',
                    '& .MuiSlider-thumb': {
                        borderRadius: '1px',
                        color: 'DeepSkyBlue'
                    },
                    '& .MuiSlider-track': {
                        background: 'linear-gradient(to right, PaleTurquoise, PowderBlue, SkyBlue, DeepSkyBlue)',
                        border: 'none'
                    },
                    '& .MuiSlider-rail': {
                        color: 'LightBlue'
                    }
                }}
            />
        </div>
    );
};

export default SquareSlider;