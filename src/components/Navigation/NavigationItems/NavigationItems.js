import React from 'react'
import classes from './NavigationItems.module.css'
import { NavigationItem } from './NavigationItem/NavigationItem'
export const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link='/orders'>My Orders</NavigationItem>
  </ul>
)
