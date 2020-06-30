import React, { Fragment, Component } from 'react'
import { Button } from '../../UI/Button/Button'

export class OrderSummary extends Component {
  render() {
    const ingredientSummray = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
          {this.props.ingredients[igKey]}
        </li>
      )
    })
    return (
      <Fragment>
        <h3> Your Order</h3>
        <p>A Burger with the following ingredients:</p>
        <ul>{ingredientSummray}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)} </strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCancelled}>
          Cancel
        </Button>

        <Button btnType='Success' clicked={this.props.purchaseContinued}>
          Continue
        </Button>
      </Fragment>
    )
  }
}
