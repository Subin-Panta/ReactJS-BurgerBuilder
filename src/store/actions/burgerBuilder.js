import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const addIngredient = ingredientName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
  }
}
export const removeIngredient = ingredientName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
  }
}
export const clearAll = () => {
  return {
    type: actionTypes.CLEAR_ALL
  }
} 
export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}
export const fetchFail = () => {
  return {
    type: actionTypes.FETCH_FAILED
  }
}
export const initIngredients = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/ingredients.json')
      dispatch(setIngredients(response.data))
    } catch (error) {
      dispatch(fetchFail())
    }
  }
}
