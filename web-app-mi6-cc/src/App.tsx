import React from 'react';
import logo from './logo.svg';
import architecture from './assets/architecture_diagram.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        <br/>
        <img src={architecture} className="App-logo-2" alt="logooo" />
      </header>
    </div>
  );
}

export default App;
