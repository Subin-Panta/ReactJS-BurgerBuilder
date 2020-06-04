import React, { Fragment } from 'react'
import { Button } from '../../UI/Button/Button'

export const OrderSummary = props => {
  const ingredientSummray = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    )
  })
  return (
    <Fragment>
      <h3> Your Order</h3>
      <p>A Burger with the following ingredients:</p>
      <ul>{ingredientSummray}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)} </strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>
        Cancel
      </Button>

      <Button btnType='Success' clicked={props.purchaseContinued}>
        Continue
      </Button>
    </Fragment>
  )
}
