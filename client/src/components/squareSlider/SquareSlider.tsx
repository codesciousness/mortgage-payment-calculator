import React from 'react';
import Slider from '@mui/material/Slider';
import Label from '../label/Label';
import { styles } from '../../styles';

type SliderProps = {
    name: string;
    value: number | number[];
    min: number;
    max: number;
    steps: number;
    width: number | string;
    onChange: (event: Event, value: number | number[]) => void;
};

const SquareSlider = ({ name, value, min, max, steps, width, onChange }: SliderProps): JSX.Element => {
    const id = name.replaceAll(' ', '');

    return (
        <div style={styles.input}>
            <Label name={name}/>
            <Slider
                id={id}
                name={name}
                aria-label={name}
                value={value}
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
                        border: 'none',
                        height: 8
                    },
                    '& .MuiSlider-rail': {
                        color: 'LightBlue',
                        height: 6
                    }
                }}
            />
        </div>
    );
};

export default SquareSlider;