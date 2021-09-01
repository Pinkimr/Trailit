import React, {useContext, useEffect} from 'react'
import {Button, Form, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useForm, Controller} from 'react-hook-form'
import {joiResolver} from '@hookform/resolvers/joi'
import Joi from 'joi'
import {sendForgotPasswordEmail} from '../../../action/auth.action'
import {SEND_FORGOT_PASSWORD} from '../../../action/reducer.types'
import {GlobalContext} from '../../../context/globalContext'
import {joiUpdatedMessage} from '../../../Utils/AppUtill'
import ErrorLabel from '../../Widgets/ErrorLabel'

const ForgotPasswordForm = props => {
  const {setSignInModal} = useContext(GlobalContext)
  const {successLabels = []} = useSelector(state => state.apiReducer)
  const {handleSubmit, errors, control} = useForm({
    resolver: joiResolver(
      Joi.object({
        email: Joi.string().email({tlds: {allow: false}}),
      })
        .required()
        .messages(joiUpdatedMessage)
    ),
    defaultValues: {email: ''},
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (successLabels.includes(SEND_FORGOT_PASSWORD)) {
      setSignInModal(false)
    }
  }, [successLabels])

  return (
    <>
      <div className="p-2 p-md-5">
        <Form className="row">
          <Col md={12} className="text-center pb-4">
            <div className="trailit_18_500 ">Forgot Password</div>
          </Col>
          <Col md={12}>
            <Form.Group>
              <Controller
                name="email"
                control={control}
                render={({value, onChange}) => (
                  <>
                    <input
                      placeholder="Enter the email address"
                      type="text"
                      className="form-control trailit_12_400"
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
          <Col md={12} className="text-center mb-3">
            <div className="d-flex flex-wrap justify-content-between">
              <Button
                variant="link"
                onClick={() => props.setCurrentStep(props.steps[0])}
                className="trailit_12_500 p-0 text-dark"
              >
                Back
              </Button>
              <Button
                variant="pink"
                onClick={handleSubmit(data => dispatch(sendForgotPasswordEmail(data)))}
                type="submit"
                className="py-2 px-3 btn-sm"
              >
                Continue
              </Button>
            </div>
          </Col>
        </Form>
      </div>
    </>
  )
}
export default ForgotPasswordForm
