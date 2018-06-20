import './helpers'
import React, { Component } from 'react';
import './App.css';
import Valid from "./components/Validator";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Valid/>
      </div>
    );
  }
}

export default App;
