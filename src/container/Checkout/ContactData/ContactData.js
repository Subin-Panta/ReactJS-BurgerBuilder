import React, { Component } from 'react'
import { Button } from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import { Spiner } from '../../../components/UI/Spiner/Spiner'
import { withRouter } from 'react-router-dom'
import { Input } from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP code'
        },
        value: '',
        validation: {
          required: true,
          length: 5
        },
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: '', displayValue: '--Select a Delivery Method--' },
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      }
    },
    formIsValid: false,
    loading: false
  }
  orderHandler = async event => {
    event.preventDefault()
    this.setState({ loading: true })
    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value
    }
    console.log(formData)
    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData
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

  checkValidity(value, rules) {
    let isValid = true
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (rules.length) {
      isValid = value.length === rules.length && isValid
    }
    return isValid
  }
  inputChangedHandler = (e, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm }
    const updateFormElement = { ...updatedOrderForm[inputIdentifier] }
    updateFormElement.value = e.target.value
    updateFormElement.valid = this.checkValidity(
      updateFormElement.value,
      updateFormElement.validation
    )
    updatedOrderForm[inputIdentifier] = updateFormElement
    let formIsValid = true

    for (let inputIdentifiers in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid })
  }
  render() {
    const formElementsArray = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={e => this.inputChangedHandler(e, formElement.id)}
            invalid={!formElement.config.valid}
          />
        ))}
        <Button btnType='Success' disabled={!this.state.formIsValid}>
          Order
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
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  }
}
export default connect(mapStateToProps)(withRouter(ContactData))
