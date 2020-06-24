import React, { Component, Fragment } from 'react'
import { Order } from '../../components/Order/Order'
import axios from '../../axios-orders'
import { withErrorHandler } from '../../components/hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import { Spiner } from '../../components/UI/Spiner/Spiner'
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders()
  }
  render() {
    let errMSg = <p>Order Cannot be deleted</p>
    let orders = <Spiner />
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(order => (
            <div
              key={order.id}
              onClick={() => this.props.onClickDelete(order.id)}
            >
              <Order ingredients={order.ingredients} price={order.price} />
            </div>
          ))}
        </div>
      )
    }
    return (
      <Fragment>
        {orders}
        {this.props.error ? errMSg : null}
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
    onClickDelete: id => dispatch(actions.Startdelete(id))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios))
