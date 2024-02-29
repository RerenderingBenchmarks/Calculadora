import './App.css';
import logo from './image/airflow.svg';
import Button from './components/Button';
import Screen from './components/Screen';
import ButtonClear from './components/ButtonClear';
import { useState, useCallback, memo } from 'react';
import { evaluate } from 'mathjs';

const MemoButton = memo(Button);

function App() {

  const [input, setInput] = useState([]);
  const [reset, setReset] = useState(false);

  const addInput = val => {
    input.push(val)
    setInput([...input]);
  };

  const addInputCached = useCallback(addInput, [reset]);

  const calculateResult = () => {
    if (input) {
      setInput([evaluate(input.reduce((acc, x) => { acc += x; return acc; }, ''))]);
    } else {
      alert('Por favor ingrese valores para realizar los cálculos.');
    }
    
  };

  return (
    <div className="App">
      <div className='logo-container'>
        <div><strong>Calculator</strong></div>
        <img
        src={ logo }
        className='logo'
        alt='logo' />
      </div> 
      
      <div className='container-calculator'>
        <Screen input={input.reduce((acc, x) => { acc += x; return acc; }, '')}/>
        <div className='row'>
          <MemoButton handleClick={addInputCached}>1</MemoButton>
          <MemoButton handleClick={addInputCached}>2</MemoButton>
          <MemoButton handleClick={addInputCached}>3</MemoButton>
          <MemoButton handleClick={addInputCached}>+</MemoButton>
        </div>
        <div className='row'>
          <MemoButton handleClick={addInputCached}>4</MemoButton>
          <MemoButton handleClick={addInputCached}>5</MemoButton>
          <MemoButton handleClick={addInputCached}>6</MemoButton>
          <MemoButton handleClick={addInputCached}>-</MemoButton>
        </div>           
        <div className='row'>
          <MemoButton handleClick={addInputCached}>7</MemoButton>
          <MemoButton handleClick={addInputCached}>8</MemoButton>
          <MemoButton handleClick={addInputCached}>9</MemoButton>
          <MemoButton handleClick={addInputCached}>*</MemoButton>
        </div>
        <div className='row'>
          <Button handleClick={calculateResult}>=</Button>
          <MemoButton handleClick={addInputCached}>0</MemoButton>
          <MemoButton handleClick={addInputCached}>.</MemoButton>
          <MemoButton handleClick={addInputCached}>/</MemoButton>
        </div>
        <div className='row'>
          <ButtonClear handleClear={() => { setInput([]); setReset(!reset); }}>
            Clear
          </ButtonClear>
        </div>
      </div>
    </div>
  );
}

export default App;
