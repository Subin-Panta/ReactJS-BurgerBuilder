import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      refreshToken: null,
      loading: false,
      authRedirectPath: '/'
    })
  })
  it('should store token when login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          refreshToken: null,
          loading: false,
          authRedirectPath: '/'
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: 'asdasdasd',
          userId: 'asdasas',
          refreshToken: 'asdasd'
        }
      )
    ).toEqual({
      token: 'asdasdasd',
      userId: 'asdasas',
      error: null,
      refreshToken: 'asdasd',
      loading: false,
      authRedirectPath: '/'
    })
  })
})
