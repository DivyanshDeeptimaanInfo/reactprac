import React, { Component } from "react";

class SuccessComponent extends Component {
  componentDidMount() {
    alert("Success Component will render")
  }
  componentWillUnmount() {
    alert("Success Component will unmount")
  }
  render() {
    return (
      <div>
        <h2>Login Success</h2>
      </div>
    );
  }
}
class ErrorComponent extends Component {
  componentDidMount() {
    alert("Error Component will render");
  }
  componentWillUnmount() {
    alert("Error Component will unmount");
  }
  render() {
    return (
      <div>
        <h2>Invalid Login</h2>
      </div>
    );
  }
}

export default class LifeCycleComponentDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {
        UserName: "john_nit",
        Password: "john@11",
      },
      formDetails: {
        UserName: "",
        Password: "",
      },
      result: "",
    };
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }
  handleUserName(event) {
    this.setState({
      formDetails: {
        UserName: event.target.value,
        Password: this.state.formDetails.Password,
      },
    });
  }
  handlePassword(event) {
    this.setState({
      formDetails: {
        UserName: this.state.formDetails.UserName,
        Password: event.target.value,
      },
    });
  }
  handleLoginClick() {
    if (
      this.state.formDetails.UserName === this.state.userDetails.UserName &&
      this.state.formDetails.Password === this.state.userDetails.Password
    ) {
      // this.state.result = <SuccessComponent />;
      this.setState({ result: <SuccessComponent /> });
    } else {
      // this.state.result = <ErrorComponent />;
      this.setState({ result: <ErrorComponent /> });
    }
  }
  render() {
    return (
      <div>
        <dl>
          <dt>User Name</dt>
          <dd>
            <input type="text" onChange={this.handleUserName} />
          </dd>
          <dt>Password</dt>
          <dd>
            <input type="password" onChange={this.handlePassword} />
          </dd>
        </dl>
        <button onClick={this.handleLoginClick}>Register</button>
        <div>{this.state.result || null}</div>
      </div>
    );
  }
}
