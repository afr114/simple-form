import React, { Component } from "react";
import "./App.css";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      amount: null
    };
  }

  handleChange(event) {
    if (event.target.name === "username") {
      this.setState({ userName: event.target.value });
    } else {
      this.setState({ amount: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var responseText = xhr.responseText;
      if (xhr.status === 200) {
        alert(responseText);
      } else {
        console.log(
          "** An error occurred during the transaction" + ` ${xhr.status}`
        );
      }
    };
    xhr.onerror = function() {
      console.log("** An error occurred during the transaction");
    };
    xhr.open("POST", "http://localhost:8080/form-app-api");
    xhr.setRequestHeader("Content-Type", "application/json");

    for (let prop in this.state) {
      if (!this.state[prop]) {
        return;
      }
    }

    xhr.send(JSON.stringify(this.state));
  }

  validateName(event) {
    //first character cannot be a digit or capitalized
    if (event.target.value && !event.target.value[0].match(/\d/)) {
      if (!event.target.value[0].match(/[A-Z]/)) {
        return true;
      } else {
        alert("Cannot begin with a digit or capitalized word");
      }
    } else if (event.target.value) {
      alert("Cannot begin with a digit or capitalized word");
    }
  }

  validateAmount(event) {
    if (
      event.target.value &&
      event.target.value.match(/\d/) &&
      !event.target.value.match(/[a-z]+/i)
    ) {
      return true;
    } else {
      alert("Please type in a valid number");
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            onBlur={this.validateName.bind(this)}
          />
          <span>Username</span>
        </label>
        <label>
          <input
            placeholder="$0.00"
            type="text"
            name="amount"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            onBlur={this.validateAmount.bind(this)}
          />
          <span>Amount</span>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <NameForm />
      </div>
    );
  }
}

export default App;
