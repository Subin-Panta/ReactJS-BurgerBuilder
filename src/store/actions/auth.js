import * as actionTypes from './actionTypes'

import axios from 'axios'
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (idToken, refreshToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    refreshToken,
    userId
  }
}
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('expirationDate')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}
export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}
export const auth = (email, password, isSignUp) => {
  return async dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    const key = 'AIzaSyDemcQo6qDeX0g5qmmGq1EvGIc6Hx0gurQ'
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + key
    if (!isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        key
    }
    try {
      const response = await axios.post(url, authData)
      console.log(response)
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      )
      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      localStorage.setItem('expirationDate', expirationDate)
      dispatch(
        authSuccess(
          response.data.idToken,
          response.data.refreshToken,
          response.data.localId
        )
      )
      dispatch(checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
      dispatch(authFail(error.response.data.error))
    }
  }
}

export const setAuthRedirect = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}
