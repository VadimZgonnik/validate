import React, { Component } from 'react';
import './App.css';
import Captcha from "./components/captcha";

class App extends Component {

  handleValidate(message) {
    alert(message)
  }

  render() {
    return (
      <div className="App">
        <Captcha onValidate={this.handleValidate}/>
      </div>
    );
  }
}

export default App;
