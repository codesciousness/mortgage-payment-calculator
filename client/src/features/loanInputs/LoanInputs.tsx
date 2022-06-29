import React, { useState, useEffect } from 'react';
import NumberInput from '../../components/numberInput/NumberInput';
import DualInput from '../../components/dualInput/DualInput';
import SquareSlider from '../../components/squareSlider/SquareSlider';
import OptionsSwitch from '../../components/optionsSwitch/OptionsSwitch';
import { styles } from '../../styles';

type LoanInputsProps = {

};

type handleChangeProps = {
    target: HTMLInputElement;
}

const LoanInputs = ({  }: LoanInputsProps): JSX.Element => {
    const [ homePrice, setHomePrice ] = useState(300000);
    const [ downPaymentDollar, setDownPaymentDollar ] = useState(50000);
    const [ downPaymentPercent, setDownPaymentPercent ] = useState(0);
    const [ loanTerm, setLoanTerm ] = useState(30);
    const [ interestRate, setInterestRate ] = useState(4.75);
    const [ propertyTaxesDollar, setPropertyTaxesDollar ] = useState(0);
    const [ propertyTaxesPercent, setPropertyTaxesPercent] = useState(0);
    const [ homeInsuranceDollar, setHomeInsuranceDollar ] = useState(0);
    const [ homeInsurancePercent, setHomeInsurancePercent ] = useState(0);
    const [ HOAFeesDollar, setHOAFeesDollar ] = useState(0);
    const [ HOAFeesPercent, setHOAFeesPercent ] = useState(0);
    const [ otherCostsDollar, setOtherCostsDollar ] = useState(0);
    const [ otherCostsPercent, setOtherCostsPercent ] = useState(0);
    const [ includeMore, setIncludeMore ] = useState(false);
    const width = styles.loanInputs.width;

    console.log(`
        ${homePrice}
        ${downPaymentDollar}
        ${downPaymentPercent}
        ${loanTerm}
        ${interestRate}
        ${propertyTaxesDollar}
        ${propertyTaxesPercent}
        ${homeInsuranceDollar}
        ${homeInsurancePercent}
        ${HOAFeesDollar}
        ${HOAFeesPercent}
        ${otherCostsDollar}
        ${otherCostsPercent}
        ${includeMore}
    `);

    const handleChange = ({ target }: handleChangeProps) => {
        const { id, value } = target;
        console.log(id, value);

        if (id === 'Homeprice') setHomePrice (Number(value));
        else if (id === 'DownpaymentDollar') setDownPaymentDollar(Number(value));
        else if (id === 'DownpaymentPercent') setDownPaymentPercent(Number(value));
        else if (id === 'Loanterm') setLoanTerm(Number(value));
        else if (id === 'Interestrate') setInterestRate(Number(value));
        else if (id === 'PropertytaxesDollar') setPropertyTaxesDollar(Number(value));
        else if (id === 'PropertytaxesPercent') setPropertyTaxesPercent(Number(value));
        else if (id === 'HomeinsuranceDollar') setHomeInsuranceDollar(Number(value));
        else if (id === 'HomeinsurancePercent') setHomeInsurancePercent(Number(value));
        else if (id === 'HOAfeesDollar') setHOAFeesDollar(Number(value));
        else if (id === 'HOAfeesPercent') setHOAFeesPercent(Number(value));
        else if (id === 'OthercostsDollar') setOtherCostsDollar(Number(value));
        else if (id === 'OthercostsPercent') setOtherCostsPercent(Number(value));
        else if (id === 'Includemore') {
            if (includeMore) setIncludeMore(false);
            else setIncludeMore(true);
        }
    };

    return (
        <section id='LoanInputs' style={styles.loanInputs}>
            <NumberInput name='Home price' value={homePrice} sign='dollar' width={width} onChange={handleChange}/>
            <DualInput name='Down Payment' dollar={downPaymentDollar} percent={downPaymentPercent} width={width} onChange={handleChange}/>
            <SquareSlider name='Loan term' value={loanTerm} min={1} max={50} steps={1} width={width} onChange={handleChange}/>
            <SquareSlider name='Interest rate' value={interestRate} min={0} max={25} steps={0.25} width={width} onChange={handleChange}/>
            <OptionsSwitch name='Include more' checked={includeMore} onChange={handleChange}/><span>Include: Taxes, insurance &amp; fees</span>
            {includeMore &&
                <>
                    <DualInput name='Property taxes' dollar={propertyTaxesDollar} percent={propertyTaxesPercent} width={width} onChange={handleChange}/>
                    <DualInput name='Home insurance' dollar={homeInsuranceDollar} percent={homeInsurancePercent} width={width} onChange={handleChange}/>
                    <DualInput name='HOA fees' dollar={HOAFeesDollar} percent={HOAFeesPercent} width={width} onChange={handleChange}/>
                    <DualInput name='Other costs' dollar={otherCostsDollar} percent={otherCostsPercent} width={width} onChange={handleChange}/>
                </>
            }
        </section>
    );
};

export default LoanInputs;