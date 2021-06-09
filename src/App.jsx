/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';

import CircularDial from './components/widgets/circular-dial';
import StatusDial from './components/widgets/circular-dial/StatusDial';
import ClockDial from './components/widgets/circular-dial/ClockDial';

// Main App
function App() {
  // Compose <App />
  return (
    <div className="App">
      <header className="App-header">
        <CircularDial value={33} color="hotpink" />
        <StatusDial />
        <ClockDial />
      </header>
    </div>
  );
}

export default App;
