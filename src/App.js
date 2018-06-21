import React, { Component } from 'react';
import './App.css';
import Valid from "./components/Validator";

class App extends Component {

  handleValidate(message) {
    alert(message)
  }

  render() {
    return (
      <div className="App">
        <Valid onValidate={this.handleValidate}/>
      </div>
    );
  }
}

export default App;
