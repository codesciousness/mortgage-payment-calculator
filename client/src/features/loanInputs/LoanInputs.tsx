import React, { useState, /*useEffect*/ } from 'react';
import NumberInput from '../../components/numberInput/NumberInput';
import DualInput from '../../components/dualInput/DualInput';
import SquareSlider from '../../components/squareSlider/SquareSlider';
import StyledSwitch from '../../components/switches/StyledSwitch';
import './LoanInputs.css';

type handleChangeProps = {
    target: HTMLInputElement;
}

const LoanInputs = (): JSX.Element => {
    const [ homePrice, setHomePrice ] = useState('');
    const [ downPaymentDollar, setDownPaymentDollar ] = useState('');
    const [ downPaymentPercent, setDownPaymentPercent ] = useState('');
    const [ loanTerm, setLoanTerm ] = useState<number | number[]>(30);
    const [ interestRate, setInterestRate ] = useState<number | number[]>(4.75);
    const [ propertyTaxesDollar, setPropertyTaxesDollar ] = useState('');
    const [ propertyTaxesPercent, setPropertyTaxesPercent] = useState('');
    const [ homeInsuranceDollar, setHomeInsuranceDollar ] = useState('');
    const [ homeInsurancePercent, setHomeInsurancePercent ] = useState('');
    const [ HOAFeesDollar, setHOAFeesDollar ] = useState('');
    const [ HOAFeesPercent, setHOAFeesPercent ] = useState('');
    const [ otherCostsDollar, setOtherCostsDollar ] = useState('');
    const [ otherCostsPercent, setOtherCostsPercent ] = useState('');
    const [ includeMore, setIncludeMore ] = useState(false);
    const width = 300;

    const handleChange = ({ target }: handleChangeProps) => {
        const { id, value } = target;

        if (id === 'Homeprice') setHomePrice(value);
        else if (id === 'DownpaymentDollar') setDownPaymentDollar(value);
        else if (id === 'DownpaymentPercent') setDownPaymentPercent(value);
        else if (id === 'PropertytaxesDollar') setPropertyTaxesDollar(value);
        else if (id === 'PropertytaxesPercent') setPropertyTaxesPercent(value);
        else if (id === 'HomeinsuranceDollar') setHomeInsuranceDollar(value);
        else if (id === 'HomeinsurancePercent') setHomeInsurancePercent(value);
        else if (id === 'HOAfeesDollar') setHOAFeesDollar(value);
        else if (id === 'HOAfeesPercent') setHOAFeesPercent(value);
        else if (id === 'OthercostsDollar') setOtherCostsDollar(value);
        else if (id === 'OthercostsPercent') setOtherCostsPercent(value);
        else if (id === 'Includemore') {
            if (includeMore) setIncludeMore(false);
            else setIncludeMore(true);
        }
    };

    const handleLoanTermChange = (event: Event, value: number | number[]) => {
        setLoanTerm(value);
    };

    const handleInterestRateChange = (event: Event, value: number | number[]) => {
        setInterestRate(value);
    };

    /*
    useEffect(() => {
        
    }, [homePrice, downPaymentDollar, downPaymentPercent, loanTerm, interestRate, propertyTaxesDollar, propertyTaxesPercent, homeInsuranceDollar, 
        homeInsurancePercent, HOAFeesDollar, HOAFeesPercent, otherCostsDollar, otherCostsPercent, includeMore]);
    */

    return (
        <section id='LoanInputs' className='LoanInputs'>
            <NumberInput name='Home price' value={homePrice} sign='dollar' width={width} onChange={handleChange}/>
            <DualInput name='Down payment' dollar={downPaymentDollar} percent={downPaymentPercent} width={width} onChange={handleChange}/>
            <SquareSlider name='Interest rate' value={interestRate} min={0} max={25} steps={0.25} width={width} onChange={handleInterestRateChange}/>
            <SquareSlider name='Loan term' value={loanTerm} min={1} max={50} steps={1} width={width} onChange={handleLoanTermChange}/>
            <StyledSwitch name='Include more' checked={includeMore} onChange={handleChange}/><span>Include: Taxes, insurance &amp; fees</span>
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