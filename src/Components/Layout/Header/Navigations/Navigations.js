import React, { Component } from 'react';
import classes from './Navigations.module.css';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavDropdown from '../../NavDropdown/NavDropdown';
export default class Navigations extends Component {
  state = {
    showDrp: false,
  };
  showDrpHandler = () => {
    this.setState({
      showDrp: !this.state.showDrp,
    });
  };
  render() {
    return (
      <>
        <div
          className={`${classes.Nav} ${
            this.props.activeNav === this.props.id ? classes.ActiveNav : null
          }`}
          onClick={() => {
            this.props.changeNavHandler(this.props.id);
            this.showDrpHandler();
          }}
        >
          <FontAwesomeIcon className={classes.Icons} icon={this.props.icon} />
          <p className={classes.NavTag}>
            {this.props.name}{' '}
            {this.props.id === 2 || this.props.id === 5 ? (
              <FontAwesomeIcon icon={faAngleDown} />
            ) : null}
          </p>
          <div className={classes.NavDropdown}>
            <NavDropdown
              drp_links={this.props.drp_links}
              showDrp={this.state.showDrp}
            />
          </div>
        </div>
        <div className={classes.NavDropdownMob}>
          <NavDropdown
            drp_links={this.props.drp_links}
            showDrp={this.state.showDrp}
          />
        </div>
      </>
    );
  }
}
