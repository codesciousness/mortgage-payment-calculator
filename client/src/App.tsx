import React from 'react';
import Button from './components/button/Button';
import SquareSlider from './components/squareSlider/SquareSlider';
import TextInput from './components/textInput/TextInput';
import NumberInput from './components/numberInput/NumberInput';
import './App.css';

function App() {
  return (
    <div className="App">
      <Button name='Calculate' onClick={()=>console.log('Clicked')}/>
      <SquareSlider name='Interest Rate' defaultValue={3.75} min={0} max={25} steps={0.25} />
      <TextInput name='name' value='Bob' placeholder='name' onChange={()=>console.log('Changed')}/>
      <NumberInput name='name' value={100000} sign='dollar' onChange={()=>console.log('Changed')}/>
    </div>
  );
}

export default App;
