import React from 'react';
import classes from './Notification.module.css';
import { Link } from 'react-router-dom';
export default function Notification({ details, time, pic }) {
  details = details.split('.');
  return (
    <div className={classes.Notification}>
      <img src={pic} alt='avatar' className={classes.Avatar} />
      <div className={classes.Details}>
        <p>
          {details[0]}.{' '}
          <Link
            to='/Dashboard'
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            {details[1]}
          </Link>
        </p>
        <p className={classes.Time}>{time} ago</p>
      </div>
    </div>
  );
}
