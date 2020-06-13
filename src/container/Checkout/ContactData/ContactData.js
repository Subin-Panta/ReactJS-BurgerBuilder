import React, { Component } from 'react'
import { Button } from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import { Spiner } from '../../../components/UI/Spiner/Spiner'
import { withRouter } from 'react-router-dom'
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }
  orderHandler = async event => {
    event.preventDefault()
    console.log(this.props.ingredients)
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
      this.setState({ loading: false })
      this.props.history.push('/')
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
    }
  }
  render() {
    let form = (
      <form>
        <input type='text' name='name' placeholder='Your Name' />
        <input type='email' name='email' placeholder='Your email' />
        <input type='text' name='street' placeholder='Street' />
        <input type='text' name='postal' placeholder=' Postal' />
        <Button btnType='Success' clicked={this.orderHandler}>
          order
        </Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spiner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    )
  }
}
export default withRouter(ContactData)
