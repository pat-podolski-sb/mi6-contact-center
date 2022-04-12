import React from 'react';
import './App.css';
import { ArchitectureDiagram } from './views/ArchitectureDiagram';
import { RecentUsers } from './views/RecentUsers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to MI6 Headquarters!
        </p>
        <RecentUsers />
        <br/>
        <ArchitectureDiagram />
      </header>
    </div>
  );
}

export default App;
