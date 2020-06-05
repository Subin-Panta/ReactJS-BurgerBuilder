import React from 'react'
import classes from './Logo.module.css'
import burgerLogo from '../../assets/images/burger-logo.png'
export const Logo = props => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt='Myburger' />
  </div>
)
