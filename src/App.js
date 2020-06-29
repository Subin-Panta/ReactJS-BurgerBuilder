import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Layout from './components/hoc/Layout/Layout'
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Checkout from './container/Checkout/Checkout'
import Orders from './container/Orders/Orders'
import Auth from './container/Auth/Auth'
import Logout from './container/Auth/Logout/Logout'
import { connect } from 'react-redux'
import { authCheckState } from './store/actions/index'
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn()
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={BurgerBuilder} />
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
