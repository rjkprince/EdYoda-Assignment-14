import React, { Component } from 'react';
import classes from './Login.module.css';

export default class Login extends Component {
  state = {
    name: '',
    password: '',
    localData: '',
  };
  inputHandler = (e, type) => {
    switch (type) {
      case 'name':
        this.setState({
          name: e.target.value,
        });
        break;

      case 'password':
        this.setState({
          password: e.target.value,
        });
        break;

      default:
        console.log('type not matched for input');
    }
  };
  loginHandler = (e) => {
    e.preventDefault();
    let name = this.state.name;
    let password = this.state.password;
    let data = this.state.localData;
    let login = false;
    for (let keys in data) {
      if (data[keys]['email'] === name && data[keys]['password'] === password) {
        this.props.loginStatusHandler(keys);
        login = true;
        let loginStatus = {
          status: true,
          member: keys,
        };
        localStorage.setItem('loginStatus', JSON.stringify(loginStatus));
      }
    }
    if (!login) {
      alert(
        'wrong email or password' +
          '\n' +
          'make sure you are using email as your username'
      );
    }
  };
  componentDidMount = () => {
    let Data = localStorage.getItem('accountsPage');
    Data = JSON.parse(Data);

    this.setState({
      localData: Data,
    });
  };
  render() {
    return (
      <div className={classes.Login}>
        <div className={classes.ListAcc}>
          <h1 className={classes.Title}>Welcome to Dashboard, Login</h1>

          <div className={classes.InputDiv}>
            <div>
              <p className={classes.Label}>Username</p>
              <input
                type='text'
                value={this.state.name}
                onChange={(e) => this.inputHandler(e, 'name')}
              />
            </div>
          </div>
          <div className={classes.InputDiv}>
            <div>
              <p className={classes.Label}>Password</p>
              <input
                type='password'
                value={this.state.password}
                onChange={(e) => this.inputHandler(e, 'password')}
              />
            </div>
          </div>

          <button className={classes.Btn} onClick={(e) => this.loginHandler(e)}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
