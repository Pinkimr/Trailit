import * as React from 'react'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, Route} from 'react-router-dom'
import {GlobalContext} from '../context/globalContext'
import {LOG_IN, SIGN_UP} from '../action/reducer.types'
import {get, getQueryStringObj} from '../Utils/AppUtill'

export default function ProtectedRoute(rest) {
  const dispatch = useDispatch()
  const {isLoggedIn} = React.useContext(GlobalContext)
  const queryObj = getQueryStringObj()

  const isLoggedOut = useSelector(state => {
    return get(['authReducer', 'isLoggedOut'], state)
  })
  const {successLabels = []} = useSelector(state => state.apiReducer)

  const {setSignInModal, setIsLoggedIn} = React.useContext(GlobalContext)

  useEffect(() => {
    if (isLoggedOut) {
      window.localStorage.clear()
      setIsLoggedIn(false)
      dispatch({type: 'CLEAR_LOGOUT'})
    }
  }, [dispatch, isLoggedOut, setIsLoggedIn, setSignInModal, isLoggedIn])

  useEffect(() => {
    if (successLabels.includes(LOG_IN) || successLabels.includes(SIGN_UP)) {
      setSignInModal(false)
      setIsLoggedIn(true)
    }
  }, [setIsLoggedIn, setSignInModal, successLabels])

  const renderAppropriateRoute = props => {
    if (
      window.location.pathname !== '/' &&
      !window.location.pathname.includes('/profile/') &&
      !window.location.pathname.includes('/trail/') &&
      !queryObj.resetPwd &&
      !isLoggedIn
    ) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: {from: props.location},
          }}
        />
      )
    }
    return <Route {...rest} />
  }

  return <Route {...rest} render={props => renderAppropriateRoute(props)} />
}
