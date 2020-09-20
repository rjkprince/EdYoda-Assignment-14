import React, { Component } from 'react';
import classes from './Header.module.css';
import {
  faTachometerAlt,
  faShoppingCart,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { faFileAlt, faUser } from '@fortawesome/free-regular-svg-icons';
import Navigations from './Navigations/Navigations';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  state = {
    activeNav: -1,
    show_drp: false,
  };
  Navigation = [
    {
      id: 1,
      name: 'Dashboard',
      icon: faTachometerAlt,
      drp_links: [],
    },
    {
      id: 2,
      name: 'Reports',
      icon: faFileAlt,
      drp_links: ['Daily Report', 'Weekly Report', 'Yearly Report'],
    },
    {
      id: 3,
      name: 'Products',
      icon: faShoppingCart,
      drp_links: [],
    },
    {
      id: 4,
      name: 'Accounts',
      icon: faUser,
      drp_links: [],
    },
    {
      id: 5,
      name: 'Settings',
      icon: faCog,
      drp_links: ['Profile', 'Billing', 'Customize'],
    },
  ];
  changeNavHandler = (id) => {
    if (id === 2 || id === 5);
    else {
      this.setState({
        activeNav: id,
      });
    }
  };

  componentDidMount = () => {
    let pathname = window.location.pathname.split('/')[1];

    let activeNavId = -1;
    if (pathname == '') {
      activeNavId = 1;
    }
    this.Navigation.map((item) => {
      if (item.id !== 2 && item.id !== 5) {
        if (item.name === pathname) {
          activeNavId = item.id;
        }
      }
    });
    this.setState({
      activeNav: activeNavId,
    });

    if (JSON.parse(localStorage.getItem('loginStatus')) != null) {
      let loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
      this.props.logInHandler(loginStatus.member, loginStatus.status);
    }
  };
  render() {
    const Nav = this.Navigation.map((item) => {
      if (item.id === 2 || item.id === 5) {
        return (
          <Navigations
            key={item.id}
            activeNav={this.state.activeNav}
            id={item.id}
            name={item.name}
            icon={item.icon}
            changeNavHandler={this.changeNavHandler}
            drp_links={item.drp_links}
          />
        );
      } else {
        return (
          <Link className={classes.Link} to={`/${item.name}`}>
            <Navigations
              key={item.id}
              activeNav={this.state.activeNav}
              id={item.id}
              name={item.name}
              icon={item.icon}
              changeNavHandler={this.changeNavHandler}
              drp_links={item.drp_links}
            />
          </Link>
        );
      }
    });
    return (
      <div className={classes.Header}>
        <h1 className={classes.Logo}>PRODUCT ADMIN</h1>
        <div className={classes.Navigations}>{Nav}</div>
        {this.props.loginStatus.status ? (
          <p
            className={classes.Login}
            onClick={() => {
              this.props.logInHandler(null, false);
              localStorage.setItem('loginStatus', null);
            }}
          >
            {' '}
            {this.props.loginStatus.member},<span>Logout</span>{' '}
          </p>
        ) : (
          <p className={classes.Login}>
            <Link
              to='/Dashboard'
              onClick={() => {
                this.setState({
                  activeNav: 1,
                });
              }}
            >
              <span>Login</span>
            </Link>
          </p>
        )}

        <div className={classes.HbIcon}>
          <div
            onClick={() => {
              this.setState({
                show_drp: !this.state.show_drp,
              });
            }}
          >
            <div className={classes.Bar}></div>
            <div className={classes.Bar}></div>
            <div className={classes.Bar}></div>
          </div>
          <section
            className={`${classes.Dropdown} ${
              this.state.show_drp ? classes.ShowDrp : null
            }`}
          >
            {Nav}
            <p className={`${classes.Login} ${classes.DrpLogin}`}>
              Admin,<span>Logout</span>
            </p>
          </section>
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
