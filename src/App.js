/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import logo from './logo.svg';
import './App.css';

import CircularDial from './components/widgets/circular-dial';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CircularDial />
      </header>
    </div>
  );
}

export default App;
