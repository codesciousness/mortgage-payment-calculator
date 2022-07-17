import React, { useState } from 'react';
import NumberInput from '../../components/numberInput/NumberInput';
import DualInput from '../../components/dualInput/DualInput';
import DateInput from '../../components/dateInput/DateInput';
import SquareSlider from '../../components/squareSlider/SquareSlider';
import StyledSwitch from '../../components/switches/StyledSwitch';
import InfoTooltip from '../../components/infoTooltip/InfoTooltip';
import './LoanInputs.css';
import { selectHomePrice, selectDownPayment, selectLoanTerm, selectInterestRate, selectPropertyTaxes, 
    selectHomeInsurance, selectHOAFees, selectOtherCosts, selectStartDate, setHomePrice, setDownPayment, 
    setLoanTerm, setInterestRate, setPropertyTaxes, setHomeInsurance, setHOAFees, setOtherCosts, 
    setStartDate } from '../loansSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

type handleChangeProps = {
    target: HTMLInputElement;
}

const LoanInputs = (): JSX.Element => {
    const homePrice = useAppSelector(selectHomePrice);
    const downPayment = useAppSelector(selectDownPayment);
    const loanTerm = useAppSelector(selectLoanTerm);
    const interestRate = useAppSelector(selectInterestRate);
    const startDate = useAppSelector(selectStartDate);
    const propertyTaxes = useAppSelector(selectPropertyTaxes);
    const homeInsurance = useAppSelector(selectHomeInsurance);
    const hoaFees = useAppSelector(selectHOAFees);
    const otherCosts = useAppSelector(selectOtherCosts);
    const [ includeMore, setIncludeMore ] = useState(false);
    const dispatch = useAppDispatch();
    const width = 300;

    const handleChange = ({ target }: handleChangeProps) => {
        const { id, value } = target;

        if (id === 'Homeprice') {
            dispatch(setHomePrice(value));
        }
        else if (id === 'DownpaymentDollar') {
            dispatch(setDownPayment({ dollar: value, percent: '' }));
        }
        else if (id === 'DownpaymentPercent') {
            dispatch(setDownPayment({ dollar: '', percent: value }));
        }
        else if (id === 'PropertytaxesDollar') {
            dispatch(setPropertyTaxes({ dollar: value, percent: '' }));
        }
        else if (id === 'PropertytaxesPercent') {
            dispatch(setPropertyTaxes({ dollar: '', percent: value }));
        }
        else if (id === 'HomeinsuranceDollar') {
            dispatch(setHomeInsurance({ dollar: value, percent: '' }));
        }
        else if (id === 'HomeinsurancePercent') {
            dispatch(setHomeInsurance({ dollar: '', percent: value }));
        }
        else if (id === 'HOAfeesDollar') {
            dispatch(setHOAFees({ dollar: value, percent: '' }));
        }
        else if (id === 'HOAfeesPercent') {
            dispatch(setHOAFees({ dollar: '', percent: value }));
        }
        else if (id === 'OthercostsDollar') {
            dispatch(setOtherCosts({ dollar: value, percent: '' }));
        }
        else if (id === 'OthercostsPercent') {
            dispatch(setOtherCosts({ dollar: '', percent: value }));
        }
        else if (id === 'Includemore') {
            if (includeMore) setIncludeMore(false);
            else setIncludeMore(true);
        }
    };

    const handleLoanTermChange = (event: Event, value: number | number[]) => {
        dispatch(setLoanTerm(value));
    };

    const handleInterestRateChange = (event: Event, value: number | number[]) => {
        dispatch(setInterestRate(value));
    };

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            dispatch(setStartDate(new Date(date.getFullYear(), date.getMonth())));
        }
    };

    return (
        <section id='LoanInputs' className='LoanInputs'>
            <NumberInput name='Home price' value={homePrice} sign='dollar' width={width} onChange={handleChange}/>
            <InfoTooltip title='Down payment: Portion of the sale price of a home that is not financed. 
            Your down payment amount can affect the interest rate you get, as lenders typically offer lower rates for borrowers who make larger payments.'/>
            <DualInput name='Down payment' dollar={downPayment.dollar} percent={downPayment.percent} width={width} onChange={handleChange}/>
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
                    <DualInput name='Property taxes' dollar={propertyTaxes.dollar} percent={propertyTaxes.percent} width={width} onChange={handleChange}/>
                    <InfoTooltip title='Homeowners insurance: Financial protection that you purchase from an insurance provider. 
                    It helps pay for losses if a covered disaster or other damaging event affects your home.'/>
                    <DualInput name='Home insurance' dollar={homeInsurance.dollar} percent={homeInsurance.percent} width={width} onChange={handleChange}/>
                    <InfoTooltip title="Homeowner's association (HOA) fee: Monthly or quarterly fees assessed by the HOA to pay for the services that it provides."/>
                    <DualInput name='HOA fees' dollar={hoaFees.dollar} percent={hoaFees.percent} width={width} onChange={handleChange}/>
                    <DualInput name='Other costs' dollar={otherCosts.dollar} percent={otherCosts.percent} width={width} onChange={handleChange}/>
                </>
            }
        </section>
    );
};

export default LoanInputs;