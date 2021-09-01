import React, {useContext, useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {GlobalContext} from '../../../context/globalContext'
import {NearContext} from '../../../context/nearContext'
import {LOG_IN, SIGN_UP} from '../../../action/reducer.types'
import {get, getQueryStringObj} from '../../../Utils/AppUtill'
import {chromeSendMessage} from '../../../Utils/extension-connection'
import ForgotPasswordForm from './ForgotPasswordForm'
import LoginForm from './LoginForm'
import SetNewPasswordForm from './SetNewPasswordForm'
import SignupForm from './SignupForm'

const Login = props => {
  const {signInModal, setUserInfo, setUserToken, setSignInModal, setIsLoggedIn} = useContext(GlobalContext)

  const {accountId, wallet} = useContext(NearContext)
  const dispatch = useDispatch()
  const history = useHistory()

  const steps = ['login', 'signup', 'forgotpwd', 'setnewpwd']
  const [currentStep, setCurrentStep] = useState(steps[0])

  const queryObj = getQueryStringObj()

  const {successLabels = []} = useSelector(state => state.apiReducer)
  const {loginData, signupData} = useSelector(state => state.authReducer)

  useEffect(() => {
    if (successLabels.includes(LOG_IN)) {
      dispatch({type: 'CLEAR_TRAIL_LIST'})

      chromeSendMessage(
        {
          loggedInData: get(['user'], loginData),
          authToken: get(['jwt'], loginData),
          type: 'WEB_LOGIN',
          action: 'LOGIN_FROM_WEB',
        },
        response => {}
      )

      setUserInfo(get(['user'], loginData))
      setUserToken(get(['jwt'], loginData))
      setIsLoggedIn(true)
    }
    if (successLabels.includes(SIGN_UP)) {
      chromeSendMessage(
        {
          loggedInData: get(['userData', 'user'], signupData),
          authToken: get(['userData', 'jwt'], signupData),
          type: 'WEB_LOGIN',
          action: 'LOGIN_FROM_WEB',
        },
        response => {}
      )

      setUserInfo(get(['userData', 'user'], signupData))
      setUserToken(get(['userData', 'jwt'], signupData))
      setIsLoggedIn(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successLabels, props])

  useEffect(() => {
    if (history.location.hash === '#signup') {
      // if (wallet) {
      //   wallet.signOut();
      // }
      setCurrentStep(steps[1])
    }
    if (history.location.hash === '#signin') {
      // if (wallet) {
      //   wallet.signOut();
      // }

      setCurrentStep(steps[0])
    }
    if (queryObj.resetPwd && queryObj.token) {
      setCurrentStep(steps[3])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryObj.resetPwd, queryObj.token, history.location.hash])

  useEffect(() => {
    if (accountId) {
      setCurrentStep(steps[1])
    }
  }, [accountId, steps])

  return (
    <Modal show={signInModal} centered className="trailit_login_main" onHide={() => setSignInModal(false)}>
      <Modal.Body className="p-0 d-flex">
        <div className="trailit_left">
          <div>
            <div className="trailit_18_600 text-white mb-3">Join Trailit for Free</div>
            <div className="trailit_14_500 text-white">
              Fillup your daily life
              <br />
              with inspiring Stories.
            </div>
          </div>
        </div>
        <div className="trailit_right d-flex align-items-center">
          {currentStep === steps[0] && <LoginForm steps={steps} setCurrentStep={setCurrentStep} />}
          {currentStep === steps[1] && <SignupForm steps={steps} setCurrentStep={setCurrentStep} />}
          {currentStep === steps[2] && <ForgotPasswordForm steps={steps} setCurrentStep={setCurrentStep} />}
          {currentStep === steps[3] && <SetNewPasswordForm steps={steps} setCurrentStep={setCurrentStep} />}
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default Login
