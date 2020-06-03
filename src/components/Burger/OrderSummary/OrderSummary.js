import React, { Fragment } from 'react'

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
      <p>Continue to Checkout?</p>
    </Fragment>
  )
}
