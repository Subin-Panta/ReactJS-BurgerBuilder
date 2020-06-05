import React, { Fragment, Component } from 'react'
import classes from './Layout.module.css'
import { Toolbar } from '../../../components/Navigation/Toolbar/Toolbar'
import { SideDrawer } from '../../Navigation/SideDrawer/SideDrawer'
class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  SideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }
  sideDrawerToggleHandler = () => [
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  ]
  render() {
    return (
      <Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          closed={this.SideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    )
  }
}

export default Layout
