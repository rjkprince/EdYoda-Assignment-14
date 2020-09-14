import React, { Component } from 'react';
import classes from './Navigations.module.css';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Navigations extends Component {
  render() {
    return (
      <div className={classes.Nav}>
        <FontAwesomeIcon className={classes.Icons} icon={this.props.icon} />
        <p className={classes.NavTag}>
          {this.props.name}{' '}
          {this.props.id === 2 || this.props.id === 5 ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : null}
        </p>
      </div>
    );
  }
}
