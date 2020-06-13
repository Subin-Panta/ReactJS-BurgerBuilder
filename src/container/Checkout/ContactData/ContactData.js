import React, { Component } from 'react'
import { Button } from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }
  orderHandler = () => {
    
  }
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        <form>
          <input type='text' name='name' placeholder='Your Name' />
          <input type='email' name='email' placeholder='Your email' />
          <input type='text' name='street' placeholder='Street' />
          <input type='text' name='postal' placeholder=' Postal' />
          <Button btnType='Success' clicked={this.orderHandler}>
            order
          </Button>
        </form>
      </div>
    )
  }
}
