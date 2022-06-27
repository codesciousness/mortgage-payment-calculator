import React from 'react';
import Slider from '@mui/material/Slider';

type SquareSliderProps = {
    name: string;
    defaultValue: number;
    min: number;
    max: number;
    steps: number;
}

const SquareSlider = ({ name, defaultValue, min, max, steps }: SquareSliderProps): JSX.Element => {

    return (
        <div>
            <label htmlFor={name} style={{ display: 'block' }}>{name}</label>
            <Slider
                id={name}
                name={name}
                aria-label={name}
                defaultValue={defaultValue}
                valueLabelDisplay="on"
                min={min}
                max={max}
                step={steps}
                sx={{
                    width: 300,
                    margin: '2rem 1rem',
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
}

export default SquareSlider;