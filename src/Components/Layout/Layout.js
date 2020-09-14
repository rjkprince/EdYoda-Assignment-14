import React, { Component } from 'react';
import classes from './Layout.module.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
export default class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <Header />
        <div className={classes.Child}>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}
