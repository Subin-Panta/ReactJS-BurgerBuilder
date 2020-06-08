import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls'
import { Modal } from '../../components/UI/Modal/Modal'
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import { Spiner } from '../../components/UI/Spiner/Spiner'
import { withErrorHandler } from '../../components/hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/ingredients.json')
      console.log(response)
      this.setState({ ingredients: response.data })
    } catch (error) {
      console.log(error)
    }
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    this.setState({ purchasable: sum > 0 })
  }
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
  }
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) {
      return
    }
    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }
  purchaseContinueHandler = async () => {
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Subin Panta',
        address: {
          street: 'test',
          zipcode: '123123',
          country: 'Nepal'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'Lightning'
    }
    try {
      await axios.post('/orders.json', order)
      this.setState({ loading: false, purchasing: false })
    } catch (error) {
      console.log(error)
      this.setState({ loading: false, purchasing: false })
    }
  }
  clearAllHandler = () => {
    this.setState({
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false
    })
    this.componentDidMount()
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null

    let burger = <Spiner />
    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
            clear={this.clearAllHandler}
          />
        </Fragment>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      )
    }
    if (this.state.loading) {
      orderSummary = <Spiner />
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
export default withErrorHandler(BurgerBuilder, axios)
