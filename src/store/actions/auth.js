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
  localStorage.removeItem('userId')
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
    const key = process.env.FIREBASE_KEY
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + key
    if (!isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        key
    }
    try {
      const response = await axios.post(url, authData)
     
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      )
      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('refreshToken', null)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('userId', response.data.localId)
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
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate > new Date()) {
        const refreshToken = localStorage.getItem('refreshToken')
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, refreshToken, userId))

        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        )
      } else {
        dispatch(logout())
      }
    }
  }
}
