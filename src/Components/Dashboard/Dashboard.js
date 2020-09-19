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
        this.props.logInHandler(loginStatus.member, loginStatus.status);
      }
    }
    let DashboardData = JSON.parse(localStorage.getItem('dashboardPage'));
    this.setState({
      localData: DashboardData,
    });
  };
  loginStatusHandler = (person, status) => {
    this.props.logInHandler(person, status);
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
    logInHandler: (person, status) =>
      dispatch({ type: 'LOG_IN', member: person, status: status }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
