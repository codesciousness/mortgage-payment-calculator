import React, { useEffect } from 'react';
import Button from '../../components/button/Button';
import TextInput from '../../components/textInput/TextInput';
import Alert from '../../components/alert/Alert';
import './EmailForm.css';
import { selectName, selectEmail, setName, setEmail, selectHomePrice, selectDownPayment,
    selectLoanTerm, selectInterestRate, selectPropertyTax, selectHomeInsurance, selectPMI,
    selectHOAFees, selectStartDate, selectMortgagePayment, selectMonthlyPayment, selectLoanAmount, 
    selectTotalInterest, selectLoanCost, selectPayoffDate, selectAmortizationSchedule, saveLoan,
    selectSavingLoan, selectSaveLoanSuccess, selectSaveLoanError, clearStatusUpdates } from '../loansSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useWindowSize } from '../../hooks/use-window-size';

type handleChangeProps = {
    target: HTMLInputElement;
}

const EmailForm = (): JSX.Element => {
    const name = useAppSelector(selectName);
    const email = useAppSelector(selectEmail);
    const homePrice = useAppSelector(selectHomePrice);
    const downPayment = useAppSelector(selectDownPayment);
    const loanTerm = useAppSelector(selectLoanTerm);
    const interestRate = useAppSelector(selectInterestRate);
    const startDate = useAppSelector(selectStartDate);
    const propertyTax = useAppSelector(selectPropertyTax);
    const homeInsurance = useAppSelector(selectHomeInsurance);
    const privateMortgageInsurance = useAppSelector(selectPMI);
    const hoaFees = useAppSelector(selectHOAFees);
    const mortgagePayment = useAppSelector(selectMortgagePayment);
    const monthlyPayment = useAppSelector(selectMonthlyPayment);
    const loanAmount = useAppSelector(selectLoanAmount);
    const loanCost = useAppSelector(selectLoanCost);
    const totalInterest = useAppSelector(selectTotalInterest);
    const payoffDate = useAppSelector(selectPayoffDate);
    const amortizationSchedule = useAppSelector(selectAmortizationSchedule);
    const savingLoan = useAppSelector(selectSavingLoan);
    const saveLoanSuccess = useAppSelector(selectSaveLoanSuccess);
    const saveLoanError = useAppSelector(selectSaveLoanError);
    const dispatch = useAppDispatch();
    const size = useWindowSize();
    const width = size.width && size.width > 350 ? 300 : '90%';

    const loan = {
        name,
        email,
        homePrice,
        downPayment,
        loanTerm,
        interestRate,
        startDate,
        propertyTax,
        homeInsurance,
        privateMortgageInsurance,
        hoaFees,
        mortgagePayment,
        monthlyPayment,
        loanAmount,
        loanCost,
        totalInterest,
        payoffDate,
        amortizationSchedule
    };

    const handleChange = ({ target }: handleChangeProps) => {
        const { id, value } = target;

        if (id === 'Name') dispatch(setName(value));
        else if (id === 'Email') dispatch(setEmail(value));
    };

    const handleClick = () => dispatch(saveLoan(loan));

    useEffect(() => {
        if (saveLoanSuccess) {
            dispatch(setName(''));
            dispatch(setEmail(''));
        }
    }, [saveLoanSuccess, dispatch]);

    return (
        <section id='EmailForm' className='EmailForm'>
            <h3 className='EmailForm__header'>Email your mortgage payment summary!</h3>
            <div className='EmailForm__container'>
                <TextInput name='Name' value={name} width={width} onChange={handleChange}/>
                <TextInput name='Email' value={email} width={width} onChange={handleChange}/>
                <Button name='Send' loading={savingLoan} onClick={handleClick}/>
            </div>
            {saveLoanError && <Alert severity='error' msg={saveLoanError} onClose={() => dispatch(clearStatusUpdates())}/>}
            {saveLoanSuccess && <Alert severity='success' msg='Loan data submitted successfully!' onClose={() => dispatch(clearStatusUpdates())}/>}
        </section>
    );
};

export default EmailForm;