import React, { useState } from 'react';
import NumberInput from '../../components/numberInput/NumberInput';
import DualInput from '../../components/dualInput/DualInput';
import DateInput from '../../components/dateInput/DateInput';
import SquareSlider from '../../components/squareSlider/SquareSlider';
import StyledSwitch from '../../components/switches/StyledSwitch';
import InfoTooltip from '../../components/infoTooltip/InfoTooltip';
import './LoanInputs.css';
import { selectHomePrice, selectDownPayment, selectLoanTerm, selectInterestRate, selectPropertyTax, 
    selectHomeInsurance, selectPMI, selectHOAFees, selectStartDate, setHomePrice, setDownPayment, 
    setLoanTerm, setInterestRate, setPropertyTax, setHomeInsurance, setPMI, setHOAFees, 
    setStartDate } from '../loansSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useWindowSize } from '../../hooks/use-window-size';
import { fixDecimalInput } from '../../util/calculations';

type handleChangeProps = {
    target: HTMLInputElement;
}

const LoanInputs = (): JSX.Element => {
    const homePrice = useAppSelector(selectHomePrice);
    const downPayment = useAppSelector(selectDownPayment);
    const loanTerm = useAppSelector(selectLoanTerm);
    const interestRate = useAppSelector(selectInterestRate);
    const startDate = useAppSelector(selectStartDate);
    const propertyTax = useAppSelector(selectPropertyTax);
    const homeInsurance = useAppSelector(selectHomeInsurance);
    const privateMortgageInsurance = useAppSelector(selectPMI);
    const hoaFees = useAppSelector(selectHOAFees);
    const [ includeMore, setIncludeMore ] = useState(false);
    const dispatch = useAppDispatch();
    const size = useWindowSize();
    const width = size.width && size.width > 1000 ? 300 : '100%';

    const handleChange = ({ target }: handleChangeProps) => {
        const { id, value } = target;

        if (id === 'Homeprice') {
            dispatch(setHomePrice(value));
            if (downPayment.dollar) dispatch(setDownPayment({ dollar: downPayment.dollar, percent: '' }));
            if (downPayment.percent) dispatch(setDownPayment({ dollar: '', percent: downPayment.percent }));
            if (propertyTax.dollar) dispatch(setPropertyTax({ dollar: propertyTax.dollar, percent: '' }));
            if (propertyTax.percent) dispatch(setPropertyTax({ dollar: '', percent: propertyTax.percent }));
            if (homeInsurance.dollar) dispatch(setHomeInsurance({ dollar: homeInsurance.dollar, percent: '' }));
            if (homeInsurance.percent) dispatch(setHomeInsurance({ dollar: '', percent: homeInsurance.percent }));
            if (privateMortgageInsurance.dollar) dispatch(setPMI({ dollar: privateMortgageInsurance.dollar, percent: '' }));
            if (privateMortgageInsurance.percent) dispatch(setPMI({ dollar: '', percent: privateMortgageInsurance.percent }));
            if (hoaFees.dollar) dispatch(setHOAFees({ dollar: hoaFees.dollar, percent: '' }));
            if (hoaFees.percent) dispatch(setHOAFees({ dollar: '', percent: hoaFees.percent }));
        }
        else if (id === 'InterestratePercent') {
            if (parseFloat(value) < 0 || parseFloat(value) > 25) return;
            dispatch(setInterestRate(fixDecimalInput(value)));
        }
        else if (id === 'DownpaymentDollar') dispatch(setDownPayment({ dollar: value, percent: '' }))
        else if (id === 'DownpaymentPercent') dispatch(setDownPayment({ dollar: '', percent: value }))
        else if (id === 'MonthlypropertytaxDollar') dispatch(setPropertyTax({ dollar: value, percent: '' }))
        else if (id === 'MonthlypropertytaxPercent') dispatch(setPropertyTax({ dollar: '', percent: value }))
        else if (id === 'MonthlyhomeinsuranceDollar') dispatch(setHomeInsurance({ dollar: value, percent: '' }))
        else if (id === 'MonthlyhomeinsurancePercent') dispatch(setHomeInsurance({ dollar: '', percent: value }))
        else if (id === 'MonthlyPMIDollar') dispatch(setPMI({ dollar: value, percent: '' }))
        else if (id === 'MonthlyPMIPercent') dispatch(setPMI({ dollar: '', percent: value }))
        else if (id === 'MonthlyHOAfeesDollar') dispatch(setHOAFees({ dollar: value, percent: '' }))
        else if (id === 'MonthlyHOAfeesPercent') dispatch(setHOAFees({ dollar: '', percent: value }))
        else if (id === 'Includemore') {
            if (includeMore) setIncludeMore(false);
            else setIncludeMore(true);
        }
    };

    const handleLoanTermChange = (event: Event, value: number | number[]) => dispatch(setLoanTerm(value));

    const handleInterestRateChange = (event: Event, value: number | number[]) => dispatch(setInterestRate(value));

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            dispatch(setStartDate(new Date(date.getFullYear(), date.getMonth())));
        }
    };

    return (
        <section id='LoanInputs' className='LoanInputs'>
            <NumberInput name='Home price' value={homePrice} sign='dollar' width={width} label onChange={handleChange}/>
            <InfoTooltip title='Down payment: Portion of the sale price of a home that is not financed. 
            Your down payment amount can affect the interest rate you get, as lenders typically offer lower rates for borrowers who make larger payments.'/>
            <DualInput name='Down payment' dollar={downPayment.dollar} percent={downPayment.percent} width={width} onChange={handleChange}/>
            <InfoTooltip title="Interest rate: Amount you'll pay each year to borrow the money for your loan, expressed as a percentage."/>
            <SquareSlider name='Interest rate' value={interestRate} min={0} max={25} steps={0.25} width={width} onChange={handleInterestRateChange}/>
            <NumberInput name='Interest rate Percent' value={interestRate} sign='percent' width={width} onChange={handleChange}/>
            <InfoTooltip title='Loan term: The amount of time or number of years that you will have to repay a loan. 
            Longer term mortgages can make your monthly payment amount smaller than shorter term loans by stretching out your payments over more years.'/>
            <SquareSlider name='Loan term' value={loanTerm} min={1} max={50} steps={1} width={width} onChange={handleLoanTermChange}/>
            <DateInput name='Start date' value={startDate} width={width} onChange={handleStartDateChange}/>
            <StyledSwitch name='Include more' checked={includeMore} onChange={handleChange}/><span>Include: Taxes, insurance &amp; fees</span>
            {includeMore &&
                <>
                    <InfoTooltip title='Property tax: Any tax on real estate or certain other forms of property.'/>
                    <DualInput name='Monthly property tax' dollar={propertyTax.dollar} percent={propertyTax.percent} width={width} onChange={handleChange}/>
                    <InfoTooltip title="Homeowner's insurance: Financial protection that you purchase from an insurance provider. 
                    It helps pay for losses if a covered disaster or other damaging event affects your home."/>
                    <DualInput name='Monthly home insurance' dollar={homeInsurance.dollar} percent={homeInsurance.percent} width={width} onChange={handleChange}/>
                    <InfoTooltip title='Private mortgage insurance (PMI): Insurance policy that compensates lenders for losses from a mortgage loan default.'/>
                    <DualInput name='Monthly PMI' dollar={privateMortgageInsurance.dollar} percent={privateMortgageInsurance.percent} width={width} onChange={handleChange}/>
                    <InfoTooltip title="Homeowner's association (HOA) fee: Monthly or quarterly fees assessed by the HOA to pay for the services that it provides."/>
                    <DualInput name='Monthly HOA fees' dollar={hoaFees.dollar} percent={hoaFees.percent} width={width} onChange={handleChange}/>
                </>
            }
        </section>
    );
};

export default LoanInputs;