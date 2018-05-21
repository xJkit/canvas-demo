import React, { Component } from 'react';
import logo from './logo.svg';
import { NavLink, Route } from 'react-router-dom';

import './App.css';

/** Containers */
import Home from './containers/Home';
import BasicExample from './containers/BasicExample';
import Ch7Ex3 from './containers/Ch7Ex3';
import Ch7Ex5 from './containers/Ch7Ex5';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Canvas Demo</h1>
        </header>
        <div className="main">
          <ul className="sider">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/basic-example">
                Basic Example
              </NavLink>
            </li>
            <li>
              <NavLink to="/ch7-ex3">
                Ch7-Ex3
              </NavLink>
            </li>
            <li>
              <NavLink to="/ch7-ex5">
                Ch7-Ex5
              </NavLink>
            </li>
          </ul>
          <div className="content">
            <Route
              exact
              path="/"
              component={Home}
            />
            <Route
              path="/basic-example"
              component={BasicExample}
            />
            <Route
              path="/ch7-ex3"
              component={Ch7Ex3}
            />
            <Route
              path="/ch7-ex5"
              component={Ch7Ex5}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
