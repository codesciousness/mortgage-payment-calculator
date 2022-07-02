import React, { useState } from 'react';
import Button from '../../components/button/Button';
import TextInput from '../../components/textInput/TextInput';
import './EmailForm.css';

type handleChangeProps = {
    target: HTMLInputElement;
}

const EmailForm = (): JSX.Element => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleChange = ({ target }: handleChangeProps) => {
        const { id, value } = target;

        if (id === 'Name') setName(value);
        else if (id === 'Email') setEmail(value);
    };

    const handleClick = () => {
        console.log('Clicked');
    };

    return (
        <section id='EmailForm' className='EmailForm'>
            <h3 className='EmailForm__header'>Email your mortgage payment summary!</h3>
            <div className='EmailForm__container'>
                <TextInput name='Name' value={name} width={300} onChange={handleChange}/>
                <TextInput name='Email' value={email} width={300} onChange={handleChange}/>
                <Button name='Send' onClick={handleClick}/>
            </div>
        </section>
    );
};

export default EmailForm;