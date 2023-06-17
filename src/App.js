import React, { Component } from "react";
import ResumeBuilder from "./components/ResumeBuilder";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="col-lg-8 mx-auto text-center mt-5">
          <h1>
            <b>Let's generate your Resume!</b>
          </h1>
          <p className="lead">Please provide details wherever necessary</p>
          <hr />
        </div>
        <ResumeBuilder />
      </div>
    );
  }
}

export default App;
