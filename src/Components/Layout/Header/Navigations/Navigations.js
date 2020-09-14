import React, { Component } from 'react';
import classes from './Navigations.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Navigations extends Component {
  render() {
    return (
      <div className={classes.Nav}>
        <FontAwesomeIcon className={classes.Icons} icon={this.props.icon} />
        <p className={classes.NavTag}>{this.props.name}</p>
      </div>
    );
  }
}
