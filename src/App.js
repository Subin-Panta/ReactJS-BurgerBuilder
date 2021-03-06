import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Layout from './components/hoc/Layout/Layout'
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Logout from './container/Auth/Logout/Logout'
import { connect } from 'react-redux'
import { authCheckState } from './store/actions/index'
import asyncComponent from './components/hoc/asyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(() => {
  return import('./container/Checkout/Checkout')
})
const asyncOrders = asyncComponent(() => {
  return import('./container/Orders/Orders')
})
const asyncAuth = asyncComponent(() => {
  return import('./container/Auth/Auth')
})
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn()
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
