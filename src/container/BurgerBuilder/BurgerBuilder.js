import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls'
import { Modal } from '../../components/UI/Modal/Modal'
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import { Spiner } from '../../components/UI/Spiner/Spiner'
import { withErrorHandler } from '../../components/hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onInit()
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true })
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
    this.props.onInitPurchase()
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spiner />
    )
    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            isAuth={this.props.isAuthenticated}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.totalPrice}
            ordered={this.purchaseHandler}
            clear={this.props.onCLearAll}
          />
        </Fragment>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      )
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: ingredientName =>
      dispatch(actions.removeIngredient(ingredientName)),
    onCLearAll: () => dispatch(actions.clearAll()),
    onInit: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirect(path))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
