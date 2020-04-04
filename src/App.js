/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';

import CircularDial from './components/widgets/circular-dial';
import DemoDial from './components/widgets/circular-dial/examples/DemoDial';
import StatusDial from './components/widgets/circular-dial/examples/StatusDial';
import ClockDial from './components/widgets/circular-dial/examples/ClockDial';

// Main App
function App() {
  // Compose <App />
  return (
    <div className="App">
      <header className="App-header">
        <CircularDial value={33} color="hotpink" />
        <DemoDial step={2} />
        <StatusDial />
        <ClockDial />
      </header>
    </div>
  );
}

export default App;
