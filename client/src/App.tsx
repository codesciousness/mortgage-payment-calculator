import React from 'react';
import LoanInputs from './features/loanInputs/LoanInputs';
import TabsDisplay from './features/tabsDisplay/TabsDisplay';
import Button from './components/button/Button';
import TextInput from './components/textInput/TextInput';
import './App.css';

function App() {
  return (
    <section className='App'>
      <h1 className='App__title'>Mortgage Payment Calculator</h1>
      <div className='App__mainContainer'>
        <LoanInputs/>
        <div className='App__container'>
        <TabsDisplay/>
        <div className='App__emailData'>
          <TextInput name='Name' value='Bob' width={300} onChange={()=>console.log('Changed')}/>
          <Button name='Calculate' onClick={()=>console.log('Clicked')}/>
        </div>
        </div>
      </div>
    </section>
  );
}

export default App;
