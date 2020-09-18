import React, { Component } from 'react';
import classes from './Header.module.css';
import {
  faTachometerAlt,
  faShoppingCart,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { faFileAlt, faUser } from '@fortawesome/free-regular-svg-icons';
import Navigations from './Navigations/Navigations';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  state = {
    activeNav: 4,
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
        <p className={classes.Login}>
          Admin,<span>Logout</span>
        </p>
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
