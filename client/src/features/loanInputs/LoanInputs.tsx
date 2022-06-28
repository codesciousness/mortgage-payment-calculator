import React from 'react';
import NumberInput from '../../components/numberInput/NumberInput';
import DualInput from '../../components/dualInput/DualInput';
import SquareSlider from '../../components/squareSlider/SquareSlider';
import { styles } from '../../styles';

type LoanInputsProps = {

};

const LoanInputs = ({  }: LoanInputsProps): JSX.Element => {
    const width = styles.loanInputs.width;

    return (
        <section id='LoanInputs' style={styles.loanInputs}>
            <NumberInput name='Home price' value={100000} sign='dollar' width={width} onChange={()=>console.log('Changed')}/>
            <DualInput name='Down Payment' width={width}/>
            <SquareSlider name='Loan term' value={30} defaultValue={30} min={1} max={50} steps={1} width={width} onChange={()=>console.log('Changed')}/>
            <SquareSlider name='Interest rate' value={3.75} defaultValue={3.75} min={0} max={25} steps={0.25} width={width} onChange={()=>console.log('Changed')}/>
            <DualInput name='Property taxes' width={width}/>
            <DualInput name='Home insurance' width={width}/>
            <DualInput name='HOA fees' width={width}/>
            <DualInput name='Other costs' width={width}/>
        </section>
    );
};

export default LoanInputs;