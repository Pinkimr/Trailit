import {joiResolver} from '@hookform/resolvers/joi'
import React, {useContext, useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import _ from 'lodash'
import Joi from 'joi'
import {addUpdatePaymentDetails, getPaymentDetails} from '../../action/user.action'
import {GET_PAYMENT_DETAILS} from '../../action/reducer.types'

import {GlobalContext} from '../../context/globalContext'
import {joiUpdatedMessage} from '../../Utils/AppUtill'
import ErrorLabel from '../Widgets/ErrorLabel'

const schema = Joi.object({
  firstName: Joi.string().required().label('first name').messages(joiUpdatedMessage),
  lastName: Joi.string().required().label('last name').messages(joiUpdatedMessage),
  apartment: Joi.string().required().label('apartment').messages(joiUpdatedMessage),
  city: Joi.string().required().label('city').messages(joiUpdatedMessage),
  country: Joi.string().required().label('country').messages(joiUpdatedMessage),
  phone: Joi.string().required().label('phone').messages(joiUpdatedMessage),
  state: Joi.string().required().label('state').messages(joiUpdatedMessage),
  street: Joi.string().required().label('street').messages(joiUpdatedMessage),
  zip_code: Joi.number().required().label('zip code').messages(joiUpdatedMessage),
})

const PaymentDetails = props => {
  const {getPaymentDetailsData} = useSelector(state => state.userReducer)
  const {successLabels = []} = useSelector(state => state.apiReducer)
  const dispatch = useDispatch()
  const {userData: {_id: user_id} = {}} = useContext(GlobalContext)

  const {handleSubmit, errors, control, reset, watch} = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    submitFocusError: true,
    shouldUnregister: false,
    resolver: joiResolver(schema),
  })

  const handleUpdateProfile = data => {
    dispatch(addUpdatePaymentDetails(data))
  }

  useEffect(() => {
    dispatch(getPaymentDetails(user_id))
  }, [dispatch])

  useEffect(() => {
    if (successLabels.includes(GET_PAYMENT_DETAILS)) {
      reset(_.omit(getPaymentDetailsData, ['user_id']))
    }
  }, [getPaymentDetailsData, reset, successLabels])

  return (
    <form className="def_form" onSubmit={handleSubmit(handleUpdateProfile)}>
      <Row>
        <Col md={12} className="mb-0">
          <Row>
            <Col md={6}>
              <div className="form-group">
                <label className="control-label">First Name</label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={onChange} />{' '}
                      <ErrorLabel msg={errors.firstName && errors.firstName.message} />
                    </>
                  )}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="control-label">Last Name</label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={onChange} />{' '}
                      <ErrorLabel msg={errors.lastName && errors.lastName.message} />
                    </>
                  )}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="control-label">Street Address</label>
                <Controller
                  name="street"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={onChange} />{' '}
                      <ErrorLabel msg={errors.street && errors.street.message} />
                    </>
                  )}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="control-label">Phone</label>
                <Controller
                  name="phone"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={onChange} />{' '}
                      <ErrorLabel msg={errors.phone && errors.phone.message} />
                    </>
                  )}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="control-label">Country</label>
                <Controller
                  name="country"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={onChange} />{' '}
                      <ErrorLabel msg={errors.country && errors.country.message} />
                    </>
                  )}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="control-label">Apartment, Suite, Unit Etc.</label>
                <Controller
                  name="apartment"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={onChange} />{' '}
                      <ErrorLabel msg={errors.apartment && errors.apartment.message} />
                    </>
                  )}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="control-label">Town / City</label>
                <Controller
                  name="city"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={onChange} />{' '}
                      <ErrorLabel msg={errors.city && errors.city.message} />
                    </>
                  )}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="control-label">State</label>
                <Controller
                  name="state"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={onChange} />{' '}
                      <ErrorLabel msg={errors.state && errors.state.message} />
                    </>
                  )}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="control-label">Zip Code</label>
                <Controller
                  name="zip_code"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={onChange} />{' '}
                      <ErrorLabel msg={errors.zip_code && errors.zip_code.message} />
                    </>
                  )}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={12} className="text-right mb-2">
          <button className="cncl_btn mr-2">Cancel</button>
          <button type="submit" className="sbmt_btn mx-75">
            SAVE
          </button>
        </Col>
      </Row>
    </form>
  )
}

export default PaymentDetails
