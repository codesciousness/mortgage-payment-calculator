import React from 'react';
import LoanInputs from './features/loanInputs/LoanInputs';
import Button from './components/button/Button';
import TextInput from './components/textInput/TextInput';

import './App.css';

function App() {
  return (
    <div className="App">
      <LoanInputs/>
      <TextInput name='Name' value='Bob' width={300} onChange={()=>console.log('Changed')}/>
      <Button name='Calculate' onClick={()=>console.log('Clicked')}/>
    </div>
  );
}

export default App;
