import React from 'react';
import NumberInput from '../numberInput/NumberInput';
import Label from '../label/Label';
import { styles } from '../../styles';

type DualInputProps = {
    name: string;
    dollar: number;
    percent: number;
    width: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DualInput = ({ name, dollar, percent, width, onChange }: DualInputProps): JSX.Element => {

    return (
        <div style={styles.input}>
            <Label name={name}/>
            <div style={{display: 'flex'}}>
                <NumberInput name={`${name} Dollar`} value={dollar} sign='dollar' width={width*(2/3)} dual onChange={onChange}/>
                <NumberInput name={`${name} Percent`} value={percent} sign='percent' width={width*(1/3)} dual onChange={onChange}/>
            </div>
        </div>
    );
};

export default DualInput;