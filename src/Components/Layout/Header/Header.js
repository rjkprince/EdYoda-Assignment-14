import React, { Component } from 'react';
import classes from './Header.module.css';
import {
  faTachometerAlt,
  faShoppingCart,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { faFileAlt, faUser } from '@fortawesome/free-regular-svg-icons';
import Navigations from './Navigations/Navigations';
export default class Header extends Component {
  Navigation = [
    {
      name: 'Dashboard',
      icon: faTachometerAlt,
    },
    {
      name: 'Reports',
      icon: faFileAlt,
    },
    {
      name: 'Products',
      icon: faShoppingCart,
    },
    {
      name: 'Accounts',
      icon: faUser,
    },
    {
      name: 'Settings',
      icon: faCog,
    },
  ];
  render() {
    const Nav = this.Navigation.map((item) => {
      return <Navigations name={item.name} icon={item.icon} />;
    });
    return (
      <div className={classes.Header}>
        <h1 className={classes.Logo}>PRODUCT ADMIN</h1>
        <div className={classes.Navigations}>{Nav}</div>
        <p className={classes.Login}>
          Admin,<span>Logout</span>
        </p>
      </div>
    );
  }
}
