import React, {useContext, useEffect, useState} from 'react'
import {Button, Form, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Joi from 'joi'
import {Controller, useForm} from 'react-hook-form'
import {joiResolver} from '@hookform/resolvers/joi'
import _ from 'lodash'
import {SIGN_UP} from '../../../action/reducer.types'
import {NearContext} from '../../../context/nearContext'
import {signup} from '../../../action/auth.action'
import {joiUpdatedMessage} from '../../../Utils/AppUtill'
import ErrorLabel from '../../Widgets/ErrorLabel'

const SignupForm = props => {
  const dispatch = useDispatch()
  const {accountId, wallet, NearConfig, publicKey} = useContext(NearContext)

  const {handleSubmit, errors, control} = useForm({
    resolver: joiResolver(
      Joi.object({
        firstName: Joi.string().required().label('First name').messages(joiUpdatedMessage),
        lastName: Joi.string().required().label('Last name').messages(joiUpdatedMessage),
        email: Joi.string()
          .email({tlds: {allow: false}})
          .required()
          .messages(joiUpdatedMessage),
        password: Joi.string().min(8).max(20).required().messages(joiUpdatedMessage),
        confirm_password: Joi.string()
          .equal(Joi.ref('password'))
          .required()
          .label('Confirm password')
          .messages({
            'any.only': '{#label} does not match',
            ...joiUpdatedMessage,
          }),
      })
    ),
  })

  const {successLabels = []} = useSelector(state => state.apiReducer)
  const {signupMessage} = useSelector(state => state.authReducer)

  const onClickToSubmit = data => {
    const payload = _.omit(data, ['confirm_password'])
    if (accountId) {
      payload.isSocialLogin = 'near'
      payload.socialId = accountId
      payload.publicKey = publicKey
    }
    dispatch(signup(payload))
  }

  const requestSignIn = async () => {
    const appTitle = 'Trail Web App'
    await wallet.requestSignIn(NearConfig.contractName, appTitle)
  }

  useEffect(() => {
    if (successLabels.includes(SIGN_UP)) {
      props.setCurrentStep(props.steps[0])
    }
  }, [successLabels, signupMessage, props])

  return (
    <div className="p-2 p-md-5">
      <Form className="row border_form" onSubmit={handleSubmit(onClickToSubmit)}>
        {!accountId && (
          <Col md={12}>
            {/* <button type="button" className="trailit_facebook">
              Sign In with Facebook
            </button>
            <button type="button" className="trailit_google">
              Sign In with Google
            </button> */}
            <button type="button" className="trailit_near" onClick={requestSignIn}>
              Sign Up with Near
            </button>
            <hr className="trailit_dark trail_or" />
          </Col>
        )}

        {accountId && (
          <Col md={12}>
            <label>Near Account Id</label>
            <Form.Group>
              <Form.Control required type="text" placeholder="Near Account" value={accountId} readOnly />
            </Form.Group>
          </Col>
        )}
        <Col md={6}>
          <Form.Group>
            <Controller
              name="firstName"
              control={control}
              render={({value, onChange}) => (
                <>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={value}
                    onChange={e => {
                      onChange(e)
                    }}
                  />
                  <ErrorLabel msg={errors.firstName && errors.firstName.message} />
                </>
              )}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Controller
              name="lastName"
              control={control}
              render={({value, onChange}) => (
                <>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={value}
                    onChange={e => {
                      onChange(e)
                    }}
                  />
                  <ErrorLabel msg={errors.lastName && errors.lastName.message} />
                </>
              )}
            />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group>
            <Controller
              name="email"
              control={control}
              render={({value, onChange}) => (
                <>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={value}
                    onChange={e => {
                      onChange(e)
                    }}
                  />
                  <ErrorLabel msg={errors.email && errors.email.message} />
                </>
              )}
            />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group>
            <Controller
              name="password"
              control={control}
              render={({value, onChange}) => (
                <>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={value}
                    onChange={e => {
                      onChange(e)
                    }}
                  />
                  <ErrorLabel msg={errors.password && errors.password.message} />
                </>
              )}
            />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group>
            <Controller
              name="confirm_password"
              control={control}
              render={({value, onChange}) => (
                <>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    value={value}
                    onChange={e => {
                      onChange(e)
                    }}
                  />
                  <ErrorLabel msg={errors.confirm_password && errors.confirm_password.message} />
                </>
              )}
            />
          </Form.Group>
        </Col>
        <Col md={12} className="text-center mb-3">
          <Button variant="pink" type="submit" className="py-2 px-3 btn-sm">
            Sign up
          </Button>
        </Col>
        <Col md={12} className="text-center">
          {!accountId && (
            <div className="text-center trailit_16_400 d-flex justify-content-center">
              Already a member?{' '}
              <Button
                variant="link"
                onClick={() => props.setCurrentStep(props.steps[0])}
                className="trailit_16_400 p-0 text-dark ml-1"
              >
                Sign in
              </Button>
            </div>
          )}
          <hr className="trailit_dark my-2" />
          <div className="text-center trailit_11_400 trailit_login_ftr">
            By signing up you agree to Trailit's Terms of Service and Privacy Policy.
          </div>
        </Col>
      </Form>
    </div>
  )
}
export default SignupForm
