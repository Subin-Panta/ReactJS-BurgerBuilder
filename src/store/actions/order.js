import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData
  }
}

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
}
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}
export const purchaseBurger = orderData => {
  return async dispatch => {
    dispatch(purchaseBurgerStart())
    try {
      const response = await axios.post('/orders.json', orderData)
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    } catch (error) {
      dispatch(purchaseBurgerFail(error))
    }
  }
}
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders
  }
}
export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  }
}
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}
export const fetchOrders = () => {
  return async dispatch => {
    dispatch(fetchOrdersStart())
    try {
      const response = await axios.get('/orders.json')
      const fetchedOrders = []
      for (let key in response.data) {
        fetchedOrders.push({ ...response.data[key], id: key })
      }
      dispatch(fetchOrdersSuccess(fetchedOrders))
    } catch (error) {
      dispatch(fetchOrdersFail(error))
    }
  }
}
export const deleteOrder = id => {
  return {
    type: actionTypes.DELETE_ORDER,
    id
  }
}
export const deleteFail = () => {
  return {
    type: actionTypes.DELETE_FAIL
  }
}
export const Startdelete = id => {
  return async dispatch => {
    dispatch(deleteOrder(id))
    try {
      await axios.delete('./orders/' + id + '.json')
    } catch (error) {
      dispatch(deleteFail(error))
    }
  }
}
