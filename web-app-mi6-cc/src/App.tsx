import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to MI6 Headquarters!
        </p>
        <button
          style={{width: 100 }}
          onClick={ (event) => {
            fetch('')
            const dataFromAWS = fetch('https://is3olr5b82.execute-api.us-east-1.amazonaws.com/Prod/vanity-numbers')
              .then((res) => { return res.json()})
              .then((data)=> {
                window.alert(data.vanityPhoneNumbers);
                console.log(data);
              });
              console.log(dataFromAWS);
          }}
        >
          Get Vanity Numbers
        </button>
      </header>
    </div>
  );
}

export default App;
