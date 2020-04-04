/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import logo from './logo.svg';
import './App.css';

import CircularDial from './components/widgets/circular-dial';
import DemoDial from './components/widgets/circular-dial/examples/DemoDial';
import StatusDial from './components/widgets/circular-dial/examples/StatusDial';

// Main App
function App() {
  // Compose <App />
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CircularDial value={33} color="hotpink" />
        <DemoDial step={1} />
        <DemoDial step={2} />
        <DemoDial step={3} />
        <DemoDial step={4} />
        <StatusDial />
      </header>
    </div>
  );
}

export default App;
