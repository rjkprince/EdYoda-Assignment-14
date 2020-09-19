import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import LoginPage from './Login/Login';
import { connect } from 'react-redux';
class Dashboard extends Component {
  state = {
    localData: {},
  };
  componentDidMount = () => {
    let loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
    if (loginStatus) {
      if (loginStatus.status) {
        this.props.logInHandler(loginStatus.member);
      }
    }
    let DashboardData = JSON.parse(localStorage.getItem('dashboardPage'));
    this.setState({
      localData: DashboardData,
    });
  };
  loginStatusHandler = (person) => {
    this.props.logInHandler(person);
  };
  render() {
    if (this.props.loginStatus.status) {
      return <div>dashboardPage</div>;
    } else {
      return (
        <div className={classes.LoginPage}>
          <LoginPage loginStatusHandler={this.loginStatusHandler} />
        </div>
      );
    }
  }
}

const mapStateToProps = (globalState) => {
  return {
    loginStatus: globalState.loginStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logInHandler: (person) => dispatch({ type: 'LOG_IN', member: person }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
