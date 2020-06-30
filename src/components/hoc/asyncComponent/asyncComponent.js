import React, { Component } from 'react'
const asyncComponent = importComponent => {
  return class extends Component {
    state = {
      component: null
    }
    async componentDidMount() {
      const response = await importComponent()
      this.setState({ component: response.default })
    }
    render() {
      const C = this.state.component
      return C ? <C {...this.props} /> : null
    }
  }
}
export default asyncComponent
