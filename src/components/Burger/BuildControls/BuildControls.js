import React, { Fragment } from 'react'
import classes from './buildControls.module.css'
import { BuildControl } from './BuildControl/BuildControl'
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

export const BuildControls = props => {
  let buttons = (
    <div className={classes.ButtonSection}>
      <button
        className={classes.ClearButton }
        onClick={props.ordered}
        disabled={!props.purchasable}
      >
        Sign Up/In to Order
      </button>
    </div>
  )
  if (props.isAuth) {
    buttons = (
      <div className={classes.ButtonSection}>
        <button
          className={classes.OrderButton}
          onClick={props.ordered}
          disabled={!props.purchasable}
        >
          Order Now
        </button>
        <button
          className={classes.ClearButton}
          onClick={props.clear}
          disabled={!props.purchasable}
        >
          Clear All
        </button>
      </div>
    )
  }
  return (
    <Fragment>
      <div className={classes.BuildControls}>
        <p>
          Current Price:<strong>$ {props.price.toFixed(2)}</strong>
        </p>
        {controls.map(ctrl => (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          />
        ))}
      </div>

      {buttons}
    </Fragment>
  )
}
