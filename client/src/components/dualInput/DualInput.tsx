import React from 'react';
import NumberInput from '../numberInput/NumberInput';
import Label from '../label/Label';
import { styles } from '../../styles';

type DualInputProps = {
    name: string;
    width: number;
};

const DualInput = ({ name, width }: DualInputProps): JSX.Element => {

    return (
        <div style={styles.input}>
            <Label name={name}/>
            <div style={{display: 'flex'}}>
                <NumberInput name={`${name} Dollar Input`} value={100000} sign='dollar' width={width*(2/3)} dual onChange={()=>console.log('Changed')}/>
                <NumberInput name={`${name} Percent Input`} value={100000} sign='percent' width={width*(1/3)} dual onChange={()=>console.log('Changed')}/>
            </div>
        </div>
    );
};

export default DualInput;