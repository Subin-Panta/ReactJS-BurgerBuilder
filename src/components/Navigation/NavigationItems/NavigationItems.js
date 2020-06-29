import React from 'react'
import classes from './NavigationItems.module.css'
import { NavigationItem } from './NavigationItem/NavigationItem'
export const NavigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link='/orders'>My Orders</NavigationItem>
    ) : null}

    {props.isAuthenticated ? (
      <NavigationItem link='/logout'>Log Out</NavigationItem>
    ) : (
      <NavigationItem link='/auth'>Authenticate</NavigationItem>
    )}
  </ul>
)
