import React from 'react'

import classes from './DrawerToggle.module.css'

export const DrawerToggle = props => {
  return (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
