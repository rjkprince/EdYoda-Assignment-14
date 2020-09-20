import React from 'react';
import classes from './Orders.module.css';
export default function Orders({
  orderNo,
  status,
  operators,
  location,
  distance,
  startDate,
  deliveryDate,
}) {
  return (
    <div className={classes.Orders}>
      <p className={classes.BoldPara}>#{orderNo}</p>
      <p className={`${classes.Para} ${classes.Status}`}>
        <div className={classes[status]}></div> {status}
      </p>
      <p className={classes.BoldPara}>{operators}</p>
      <p className={classes.BoldPara}>{location}</p>
      <p className={classes.BoldPara}>{distance} km</p>
      <p className={`${classes.Para} ${classes.Date}`}>{startDate}</p>
      <p className={`${classes.Para} ${classes.Date}`}>{deliveryDate}</p>
    </div>
  );
}
