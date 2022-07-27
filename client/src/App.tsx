import React from 'react';
import LoanInputs from './features/loanInputs/LoanInputs';
import TabsDisplay from './features/tabsDisplay/TabsDisplay';
import EmailForm from './features/emailForm/EmailForm';
import './App.css';

function App() {
  return (
    <section className='App'>
      <h1 className='App__title'>Mortgage Payment Calculator</h1>
      <div className='App__mainContainer'>
        <LoanInputs/>
        <div className='App__container'>
          <TabsDisplay/>
          <EmailForm/>
        </div>
      </div>
    </section>
  );
}

export default App;