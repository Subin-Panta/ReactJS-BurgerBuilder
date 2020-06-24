import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'
const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: false
}
const purchaseStart = state => {
  return updateObject(state, {
    loading: true
  })
}
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  }
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  })
}
const purchaseBurgerFail = state => {
  return updateObject(state, {
    loading: false
  })
}
const purchaseInit = state => {
  return updateObject(state, {
    purchased: false
  })
}
const fetchOrdersStart = state => {
  return updateObject(state, {
    loading: true
  })
}
const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  })
}
const fetchOrderFail = state => {
  return updateObject(state, {
    loading: false
  })
}
const deleteOrder = (state, action) => {
  return updateObject(state, {
    orders: state.orders.filter(item => item.id !== action.id)
  })
}
const deleteFail = state => {
  return updateObject(state, {
    error: true
  })
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseStart(state)
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action)
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state)
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state)
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state)
    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, action)
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrderFail(state)
    case actionTypes.DELETE_ORDER:
      return deleteOrder(state, action)
    case actionTypes.DELETE_FAIL:
      return deleteFail(state)
    default:
      return state
  }
}
export default reducer
