import * as React from 'react';
import architecture from '../assets/architecture_diagram.png';

export const ArchitectureDiagram: React.FC = () => {

  return (
    <div style={{height: '100vh'}} id="architecture_diagram">
      <img style={{width: '100%'}} src={architecture} className="App-logo-2" alt="logooo" />
    </div>
  )
}