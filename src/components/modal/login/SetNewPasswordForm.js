import {joiResolver} from '@hookform/resolvers/joi'
import Joi from 'joi'
import React, {useContext, useEffect, useState} from 'react'
import {Button, Form, Col} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {resetPassword, verifyForgotPassword} from '../../../action/auth.action'
import {GlobalContext} from '../../../context/globalContext'
import {RESET_PASSWORD, VERIFY_FORGOT_PASSWORD} from '../../../action/reducer.types'
import {getQueryStringObj, joiUpdatedMessage} from '../../../Utils/AppUtill'
import ErrorLabel from '../../Widgets/ErrorLabel'

const SetNewPasswordForm = props => {
  const history = useHistory()
  const queryObj = getQueryStringObj()
  const {setSignInModal} = useContext(GlobalContext)
  const [isVerified, setIsVerified] = useState(false)
  const {successLabels = [], errorLabels = []} = useSelector(state => state.apiReducer)
  const {handleSubmit, errors, control} = useForm({
    resolver: joiResolver(
      Joi.object({
        password: Joi.string().min(8).max(20).required().label('new password').messages(joiUpdatedMessage),
        confirm_password: Joi.string()
          .min(8)
          .max(20)
          .equal(Joi.ref('password'))
          .required()
          .label('Confirm password')
          .messages({
            'any.only': `{#label} does not match`,
            ...joiUpdatedMessage,
          }),
      })
    ),
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (queryObj.resetPwd) {
      dispatch(verifyForgotPassword(queryObj.token))
    }
  }, [])

  useEffect(() => {
    if (successLabels.includes(VERIFY_FORGOT_PASSWORD)) {
      setIsVerified(true)
    }
    if (errorLabels.includes(VERIFY_FORGOT_PASSWORD)) {
      setSignInModal(false)
      history.push(`/`)
    }
    if (successLabels.includes(RESET_PASSWORD)) {
      setSignInModal(false)
      history.push(`/`)
    }
  }, [successLabels])

  return (
    <>
      <div className="p-2 p-md-5">
        <Form className="row border_form">
          <Col md={12} className="text-center pb-4">
            <div className="trailit_18_500 ">Set New Password</div>
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
                      className="form-control trailit_12_400"
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
                      className="form-control trailit_12_400"
                      placeholder="Confirm new password"
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
            <Button
              variant="pink"
              onClick={handleSubmit(data =>
                dispatch(
                  resetPassword({
                    password: data.password,
                    token: queryObj.token,
                  })
                )
              )}
              disabled={!isVerified}
              type="submit"
              className="py-2 px-3 btn-sm"
            >
              Continue
            </Button>
          </Col>
        </Form>
      </div>
    </>
  )
}
export default SetNewPasswordForm
