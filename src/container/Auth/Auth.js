import React, { Component } from 'react'
import { Input } from '../../components/UI/Input/Input'
import { Button } from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import { Spiner } from '../../components/UI/Spiner/Spiner'
import { Redirect } from 'react-router-dom'
import { updateObject } from '../../shared/utility'
import { checkValidity } from '../../shared/utility'
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false
      }
    },
    isSignup: true
  }
  componentDidMount() {
    console.log(this.props.buildingBurger + 'treo bau')
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      console.log(this.props.buildingBurger + 'treo bau')
      this.props.onSetAuthRedirectPath()
    }
  }

  inputChangedHandler = (e, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.controls[controlName].validation
        )
      })
    })
    this.setState({ controls: updatedControls })
  }
  submitHandler = event => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    )
  }

  switchAuthHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup }
    })
  }
  render() {
    const formElementsArray = []
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={e => this.inputChangedHandler(e, formElement.id)}
        invalid={!formElement.config.valid}
      />
    ))
    if (this.props.loading) {
      form = <Spiner />
    }
    const errorDisplay = error => {
      switch (error) {
        case 'INVALID_EMAIL':
          return <p>Your Credentials are Wrong</p>
        case 'MISSING_PASSWORD':
          return <p>Please Enter a Valid Pasword</p>
        case 'WEAK_PASSWORD : Password should be at least 6 characters':
          return <p>Your Password Must be Atleast 6 Characters Long</p>
        case 'INVALID_PASSWORD':
          return <p>Your Credentials are Wrong</p>
        case 'EMAIL_EXISTS':
          return <p>User Already Exists</p>
        case 'EMAIL_NOT_FOUND':
          return <p>Your Credentials are Wrong</p>
        case 'TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts. Please try again later.':
          return <p> Too Many Attempts Try Again Later</p>
        default:
          return error
      }
    }
    let errorMessage = null
    if (this.props.error) {
      errorMessage = (
        <div style={{ font: 'inherit', color: 'red' }}>
          {errorDisplay(this.props.error.message)}
        </div>
      )
    }
    let authRedirect = null
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>Submit</Button>
        </form>
        <Button btnType='Danger' clicked={this.switchAuthHandler}>
          Switch to {this.state.isSignup ? 'SignIn' : 'SignUp'}
        </Button>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect('/'))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)
