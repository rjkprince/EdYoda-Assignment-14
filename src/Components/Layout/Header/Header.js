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
      id: 1,
      name: 'Dashboard',
      icon: faTachometerAlt,
    },
    {
      id: 2,
      name: 'Reports',
      icon: faFileAlt,
    },
    {
      id: 3,
      name: 'Products',
      icon: faShoppingCart,
    },
    {
      id: 4,
      name: 'Accounts',
      icon: faUser,
    },
    {
      id: 5,
      name: 'Settings',
      icon: faCog,
    },
  ];
  render() {
    const Nav = this.Navigation.map((item) => {
      return <Navigations key={item.id} name={item.name} icon={item.icon} />;
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
