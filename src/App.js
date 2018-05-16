import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Canvas from './Canvas';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Canvas Demo</h1>
        </header>
        <Canvas />
      </div>
    );
  }
}

export default App;
