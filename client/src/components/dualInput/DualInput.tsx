import React from 'react';
import NumberInput from '../numberInput/NumberInput';
import Label from '../label/Label';

type DualInputProps = {
    name: string;
    dollar: string;
    percent: string;
    width: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DualInput = ({ name, dollar, percent, width, onChange }: DualInputProps): JSX.Element => {

    return (
        <div className='DualInput' style={{ marginBottom: '0.75rem' }}>
            <Label name={name}/>
            <div className='DualInput__container' style={{display: 'flex'}}>
                <NumberInput name={`${name} Dollar`} value={dollar} sign='dollar' width={width*(2/3)} dual onChange={onChange}/>
                <NumberInput name={`${name} Percent`} value={percent} sign='percent' width={width*(1/3)} dual onChange={onChange}/>
            </div>
        </div>
    );
};

export default DualInput;