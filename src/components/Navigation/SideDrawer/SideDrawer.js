import React, { Fragment } from 'react'
import { Logo } from '../../Logo/Logo'
import { NavigationItems } from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import { Backdrop } from '../../UI/Backdrop/Backdrop'
import { Link } from 'react-router-dom'
export const SideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Fragment>
  )
}
