import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import LoginPage from './Login/Login';
import { connect } from 'react-redux';
import Chart from '../Charts/Charts';
import Notification from './Notification/Notification';
import Orders from './Orders/Orders';
class Dashboard extends Component {
  state = {
    localData: null,
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
  getDatas = (obj) => {
    let result = [];
    for (let keys in obj) {
      result.push(obj[keys]);
    }
    return result;
  };
  getLabels = (obj) => {
    let result = [];
    for (let keys in obj) {
      result.push(keys);
    }

    return result;
  };
  renderDashboard = () => {
    if (this.state.localData === null) {
      return <div>Loading</div>;
    }
    return (
      <div className={classes.Dashboard}>
        <p className={classes.Title}>
          Welcome back,<span> {this.props.loginStatus.member}</span>
        </p>

        <div className={classes.Wrapper}>
          <div className={classes.Container}>
            <p className={classes.ContainerTitle}>Latest Hits</p>
            <Chart
              type='Line'
              data={[
                this.state.localData.latestHits.latest,
                this.state.localData.latestHits.popular,
                this.state.localData.latestHits.featured,
              ]}
              label={['Latest Hits', 'Popular Hits', 'Featured']}
              colors={['#2be5d6', '#fc447b', '#ce29c6']}
              labels={this.state.localData.latestHits.months}
            />
          </div>
          <div className={classes.Container}>
            <p className={classes.ContainerTitle}>Performance</p>
            <Chart
              type='HBar'
              data={[this.getDatas(this.state.localData.performance)]}
              label={['# of Hits']}
              colors={[
                'rgb(0, 255, 255)',
                'rgb(4, 4, 253)',
                ' rgb(123, 255, 0)',
                ' rgb(251, 168, 14)',
                ' rgb(162, 4, 253)',
                'rgb(255, 51, 0)',
                ' rgb(217, 255, 0)',
              ]}
              labels={this.getLabels(this.state.localData.performance)}
            />
          </div>
        </div>
        <div className={classes.Wrapper}>
          <div className={classes.Container}>
            <p className={classes.ContainerTitle}>
              Storage Information (In GB)
            </p>
            <Chart
              type='Pie'
              data={[this.getDatas(this.state.localData.storage)]}
              label={['# of Hits']}
              colors={[
                'rgb(255, 51, 0)',
                'rgb(0, 255, 255)',
                ' rgb(142, 247, 142)',
              ]}
              labels={this.getLabels(this.state.localData.storage)}
            />
          </div>
          <div className={classes.Container}>
            <p className={classes.ContainerTitle}>Notification List</p>
            <div className={classes.Notification}>
              {this.state.localData.notifications.map((item) => {
                return (
                  <div className={classes.NotificationCard}>
                    <Notification
                      details={item.message}
                      time={item.time}
                      pic={item.pic}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={`${classes.Container} ${classes.DataCont}`}>
          <p className={classes.ContainerTitle}>Orders List</p>
          <div className={classes.Order}>
            <p className={classes.BoldPara}>Order No</p>
            <p className={`${classes.Para}`}>Status</p>
            <p className={classes.BoldPara}>Operators</p>
            <p className={classes.BoldPara}>Location</p>
            <p className={classes.BoldPara}>Distance</p>
            <p className={`${classes.Para} ${classes.Date}`}>Start Date</p>
            <p className={`${classes.Para} ${classes.Date}`}>Delivery Date</p>
          </div>
          {this.state.localData.orders.map((item) => {
            return (
              <div className={classes.Orders}>
                <Orders {...item} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  render() {
    if (this.props.loginStatus.status) {
      return this.renderDashboard();
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
