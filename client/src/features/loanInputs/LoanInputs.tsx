import React, { useState, /*useEffect*/ } from 'react';
import NumberInput from '../../components/numberInput/NumberInput';
import DualInput from '../../components/dualInput/DualInput';
import DateInput from '../../components/dateInput/DateInput';
import SquareSlider from '../../components/squareSlider/SquareSlider';
import StyledSwitch from '../../components/switches/StyledSwitch';
import InfoTooltip from '../../components/infoTooltip/InfoTooltip';
import './LoanInputs.css';
import { formatNum } from '../../util/calculations';

type handleChangeProps = {
    target: HTMLInputElement;
}

const LoanInputs = (): JSX.Element => {
    const [ homePrice, setHomePrice ] = useState('');
    const [ downPaymentDollar, setDownPaymentDollar ] = useState('');
    const [ downPaymentPercent, setDownPaymentPercent ] = useState('');
    const [ loanTerm, setLoanTerm ] = useState<number | number[]>(30);
    const [ interestRate, setInterestRate ] = useState<number | number[]>(4.75);
    const [ startDate, setStartDate ] = useState<Date | null>(new Date());
    const [ propertyTaxesDollar, setPropertyTaxesDollar ] = useState('');
    const [ propertyTaxesPercent, setPropertyTaxesPercent] = useState('');
    const [ homeInsuranceDollar, setHomeInsuranceDollar ] = useState('');
    const [ homeInsurancePercent, setHomeInsurancePercent ] = useState('');
    const [ hoaFeesDollar, setHOAFeesDollar ] = useState('');
    const [ hoaFeesPercent, setHOAFeesPercent ] = useState('');
    const [ otherCostsDollar, setOtherCostsDollar ] = useState('');
    const [ otherCostsPercent, setOtherCostsPercent ] = useState('');
    const [ includeMore, setIncludeMore ] = useState(false);
    const width = 300;

    const handleChange = ({ target }: handleChangeProps) => {
        const { id, value } = target;

        if (id === 'Homeprice') setHomePrice(formatNum(value));
        else if (id === 'DownpaymentDollar') setDownPaymentDollar(formatNum(value));
        else if (id === 'DownpaymentPercent') setDownPaymentPercent(value);
        else if (id === 'PropertytaxesDollar') setPropertyTaxesDollar(formatNum(value));
        else if (id === 'PropertytaxesPercent') setPropertyTaxesPercent(value);
        else if (id === 'HomeinsuranceDollar') setHomeInsuranceDollar(formatNum(value));
        else if (id === 'HomeinsurancePercent') setHomeInsurancePercent(value);
        else if (id === 'HOAfeesDollar') setHOAFeesDollar(formatNum(value));
        else if (id === 'HOAfeesPercent') setHOAFeesPercent(value);
        else if (id === 'OthercostsDollar') setOtherCostsDollar(formatNum(value));
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

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            setStartDate(new Date(date.getFullYear(), date.getMonth()));
        }
    };

    /*
    useEffect(() => {
        
    }, [homePrice, downPaymentDollar, downPaymentPercent, loanTerm, interestRate, propertyTaxesDollar, propertyTaxesPercent, homeInsuranceDollar, 
        homeInsurancePercent, HOAFeesDollar, HOAFeesPercent, otherCostsDollar, otherCostsPercent, includeMore]);
    */

    return (
        <section id='LoanInputs' className='LoanInputs'>
            <NumberInput name='Home price' value={homePrice} sign='dollar' width={width} onChange={handleChange}/>
            <InfoTooltip title='Down payment: Portion of the sale price of a home that is not financed. 
            Your down payment amount can affect the interest rate you get, as lenders typically offer lower rates for borrowers who make larger payments.'/>
            <DualInput name='Down payment' dollar={downPaymentDollar} percent={downPaymentPercent} width={width} onChange={handleChange}/>
            <InfoTooltip title='Loan term: The amount of time or number of years that you will have to repay a loan. 
            Longer term mortgages can make your monthly payment amount smaller than shorter term loans by stretching out your payments over more years.'/>
            <SquareSlider name='Interest rate' value={interestRate} min={0} max={25} steps={0.25} width={width} onChange={handleInterestRateChange}/>
            <InfoTooltip title="Interest rate: Amount you'll pay each year to borrow the money for your loan, expressed as a percentage."/>
            <SquareSlider name='Loan term' value={loanTerm} min={1} max={50} steps={1} width={width} onChange={handleLoanTermChange}/>
            <DateInput name='Start date' value={startDate} width={width} onChange={handleStartDateChange}/>
            <StyledSwitch name='Include more' checked={includeMore} onChange={handleChange}/><span>Include: Taxes, insurance &amp; fees</span>
            {includeMore &&
                <>
                    <InfoTooltip title='Property tax: Any tax on real estate or certain other forms of property.'/>
                    <DualInput name='Property taxes' dollar={propertyTaxesDollar} percent={propertyTaxesPercent} width={width} onChange={handleChange}/>
                    <InfoTooltip title='Homeowners insurance: Financial protection that you purchase from an insurance provider. 
                    It helps pay for losses if a covered disaster or other damaging event affects your home.'/>
                    <DualInput name='Home insurance' dollar={homeInsuranceDollar} percent={homeInsurancePercent} width={width} onChange={handleChange}/>
                    <InfoTooltip title="Homeowner's association (HOA) fee: Monthly or quarterly fees assessed by the HOA to pay for the services that it provides."/>
                    <DualInput name='HOA fees' dollar={hoaFeesDollar} percent={hoaFeesPercent} width={width} onChange={handleChange}/>
                    <DualInput name='Other costs' dollar={otherCostsDollar} percent={otherCostsPercent} width={width} onChange={handleChange}/>
                </>
            }
        </section>
    );
};

export default LoanInputs;