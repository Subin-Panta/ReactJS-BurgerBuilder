import React from 'react'
import Burger from '../../Burger/Burger'
import { Button } from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'
export const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Enjoy Your Burger!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType='Danger' clicked={props.checkoutCancelled}>
        Cancel
      </Button>
      <Button btnType='Success' clicked={props.checkoutContinued}>
        Continue
      </Button>
    </div>
  )
}
