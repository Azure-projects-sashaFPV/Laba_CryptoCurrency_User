import React, { useState } from 'react'

import BarChart from './components/BarChart'
import './App.css'
class Currency {
  date;
  price;
  constructor(date, price) {
    this.date = date;
    this.price = price;
  }
}
const App = () => {
  let mass = [];
  const [currencyMass, setCurrencyMass] = useState([]);
  const [currencyName, setCurrencyName] = useState('');

  const getChart = (symbol, name) => {
    var burl = `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1w&limit=60`;

    var url = burl;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET',url,true);
    let response = '';
    let count = 0;
    ourRequest.onload = function(){
        response = JSON.parse(ourRequest.responseText);
        // 11111111111111111111111
        for(let item of response) {
          let date = new Date(item[0]);
          let resultDate = formatDate(date);
          mass[count++] = new Currency(resultDate, item[4]);
        }
        setCurrencyMass(mass);
        setCurrencyName(name);
        console.log(response);
    }
    ourRequest.send();
  }

  const formatDate = (date) => {
    let dateOfyear = date.getFullYear() + ""; // год;
    let newDateOfyear = dateOfyear.slice(2); // год последние две цифры;
    
    let day = date.getDate(); // текущий день
    day = day < 10 ? "0" + day : day;
    let month = date.getMonth() + 1; //текущий месяцж
    month = month < 10 ? "0" + month : month;
    
    return +day + "." + month + "." + newDateOfyear;
    }
  const btcSymbol = () =>{
    getChart('BTC', 'Bitcoin');
  }
  const ltcSymbol = () =>{
    getChart('LTC', 'LiteCoin');
  }
  const xrpSymbol = () =>{
    getChart('XRP', 'XRP');
  }
  const solSymbol = () =>{
    getChart('SOL', 'Solana');
  }
  const oneinchSymbol = () =>{
    getChart('1INCH', '1INCH');
  }
  const dogeSymbol = () =>{
    getChart('DOGE', 'Dogecoin');
  }
  const ethSymbol = () =>{
    getChart('ETH', 'Ethereum');
  }
  const sandSymbol = () =>{
    getChart('SAND', 'Sandbox');
  }
  const vetSymbol = () =>{
    getChart('VET', 'VeChain');
  }

  return (
    <div>
      <div className='buttons'>
        <div>
          <button onClick={oneinchSymbol} className='buttonsCurrency' id='ONE_INCH'></button>
          <h4>1INCH</h4>
        </div>
        <div>
          <button onClick={btcSymbol} className='buttonsCurrency' id='BTC'></button>
          <h4>BTC</h4>
        </div>
        <div>
          <button onClick={dogeSymbol} className='buttonsCurrency' id='DOGE'></button>
          <h4>DOGE</h4>
        </div>
        <div>
          <button onClick={ethSymbol} className='buttonsCurrency' id='ETH'></button>
          <h4>ETH</h4>
        </div>
        <div>
          <button onClick={ltcSymbol} className='buttonsCurrency' id='LTC'></button>
          <h4>LTC</h4>
        </div>
        <div>
          <button onClick={sandSymbol} className='buttonsCurrency' id='SAND'></button>
          <h4>SAND</h4>
        </div>
        <div>
          <button onClick={vetSymbol} className='buttonsCurrency' id='VET'></button>
          <h4>VET</h4>
        </div>
        <div>
          <button onClick={xrpSymbol} className='buttonsCurrency' id='XRP'></button>
          <h4>XRP</h4>
        </div>
        <div>
          <button onClick={solSymbol} className='buttonsCurrency' id='SOL'></button>
          <h4>SOL</h4>
        </div>
      </div>
      <BarChart data={currencyMass} currencyName={currencyName} id="chart"/>
    </div>
  )
}

export default App
