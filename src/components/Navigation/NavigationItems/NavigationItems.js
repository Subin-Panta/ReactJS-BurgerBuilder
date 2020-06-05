import React from 'react'
import classes from './NavigationItems.module.css'
import { NavigationItem } from './NavigationItem/NavigationItem'
export const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link='/'>CheckOut</NavigationItem>
  </ul>
)
