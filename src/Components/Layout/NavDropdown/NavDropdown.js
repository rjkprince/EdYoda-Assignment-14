import React from 'react';
import classes from './NavDropdown.module.css';
export default function NavDropdown({ drp_links, showDrp }) {
  return (
    <div
      className={`${classes.NavDropdown} ${showDrp ? classes.showDrp : null}`}
    >
      {drp_links.map((item, pos) => (
        <p key={pos}>{item}</p>
      ))}
    </div>
  );
}
