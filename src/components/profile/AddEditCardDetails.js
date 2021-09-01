import React, {useContext, useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {ReactCountryDropdown} from 'react-country-dropdown'
import Joi from 'joi'
import {joiResolver} from '@hookform/resolvers/joi'
import {useForm, Controller} from 'react-hook-form'
import _ from 'lodash'
import {addEditCardDetails, getCardDetails} from '../../action/user.action'
import {ADD_EDIT_CARD_DETAILS} from '../../action/reducer.types'
import {GlobalContext} from '../../context/globalContext'
import {joiUpdatedMessage} from '../../Utils/AppUtill'
import ErrorLabel from '../Widgets/ErrorLabel'

const schema = Joi.object({
  card_number: Joi.string().required().label('card number').min(16).max(16).messages(joiUpdatedMessage),
  month: Joi.string().label('month').min(2).max(2).messages(joiUpdatedMessage),
  year: Joi.string().required().label('year').min(2).max(2).messages(joiUpdatedMessage),
  cvv: Joi.string().required().label('cvv').min(3).max(3).messages(joiUpdatedMessage),
  card_holder_name: Joi.string().required().label('card_holder_name').messages(joiUpdatedMessage),
  country: Joi.string().required().label('country').messages(joiUpdatedMessage),
  zip_code: Joi.number().required().label('zip code').messages(joiUpdatedMessage),
})

const AddEditCardDetails = props => {
  const {setIsAddEditCardActive, editID, setEditID} = props
  const dispatch = useDispatch()

  const [card_id, setCardID] = useState()
  const {userData: {_id: user_id} = {}} = useContext(GlobalContext)

  const {successLabels = []} = useSelector(state => state.apiReducer)

  const {handleSubmit, errors, control, reset} = useForm({
    mode: 'onTouched',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    submitFocusError: true,
    shouldUnregister: false,
    resolver: joiResolver(schema),
  })

  const handleUpdateCard = data => {
    const payload = {...data}
    payload.user_id = user_id

    if (card_id) {
      payload.card_id = card_id
    }
    dispatch(addEditCardDetails(payload))
  }
  useEffect(() => {
    if (successLabels.includes(ADD_EDIT_CARD_DETAILS)) {
      setIsAddEditCardActive(false)
      setEditID(false)
      setCardID(false)
      dispatch(getCardDetails(user_id))
    }
  }, [successLabels])

  useEffect(() => {
    if (editID) {
      setCardID(editID.card_id)
      reset(_.omit(editID, ['user_id', 'card_id']))
    }
  }, [reset])

  return (
    <form className="def_form def_form_full_wdth" onSubmit={handleSubmit(handleUpdateCard)}>
      <Row>
        <Col md={12} className="mb-0">
          <Row>
            <Col md={4} className="text-right order-md-2">
              <a
                className="crd_bck_btn"
                onClick={() => {
                  setIsAddEditCardActive(false)
                  setEditID(false)
                }}
              >
                Back
              </a>
            </Col>
            <Col md={8}>
              <div className="form-group">
                <label className="control-label">Card Number</label>
                <Controller
                  name="card_number"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      <input type="text" className="form-control" onChange={onChange} value={value} onBlur={onBlur} />
                      <ErrorLabel msg={errors.card_number && errors.card_number.message} />
                    </>
                  )}
                />
              </div>
              <div className="d-flex tlncrdtfrm">
                <div className="form-group mr-4 text-center">
                  <label className="control-label">MM</label>
                  <Controller
                    name="month"
                    control={control}
                    render={({value, onChange, onBlur}) => (
                      <>
                        <input type="text" className="form-control" onChange={onChange} value={value} onBlur={onBlur} />
                        <ErrorLabel msg={errors.month && errors.month.message} />
                      </>
                    )}
                  />
                </div>
                <div className="form-group mr-5 text-center">
                  <label className="control-label">YY</label>
                  <Controller
                    name="year"
                    control={control}
                    render={({value, onChange, onBlur}) => (
                      <>
                        <input type="text" className="form-control" onChange={onChange} value={value} onBlur={onBlur} />
                        <ErrorLabel msg={errors.year && errors.year.message} />
                      </>
                    )}
                  />
                </div>
                <div className="form-group mr-4 text-center">
                  <label className="control-label">CVV</label>
                  <Controller
                    name="cvv"
                    control={control}
                    render={({value, onChange, onBlur}) => (
                      <>
                        <input type="text" className="form-control" onChange={onChange} value={value} onBlur={onBlur} />
                        <ErrorLabel msg={errors.cvv && errors.cvv.message} />
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label">Cardholder Name</label>
                <Controller
                  name="card_holder_name"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      <input type="text" className="form-control" onChange={onChange} value={value} onBlur={onBlur} />
                      <ErrorLabel msg={errors.card_holder_name && errors.card_holder_name.message} />
                    </>
                  )}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Country</label>
                <Controller
                  name="country"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      <ReactCountryDropdown onSelect={country => onChange(country.code)} countryCode={value} />
                      <ErrorLabel msg={errors.country && errors.country.message} />
                    </>
                  )}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Zip Code</label>
                <Controller
                  name="zip_code"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      <input type="text" className="form-control" onChange={onChange} value={value} onBlur={onBlur} />
                      <ErrorLabel msg={errors.zip_code && errors.zip_code.message} />
                    </>
                  )}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={12} className="text-right mb-2 mt-0">
          <button
            className="cncl_btn mr-2"
            onClick={() => {
              setIsAddEditCardActive(false)
              setEditID(false)
            }}
          >
            Cancel
          </button>
          <button type="submit" className="sbmt_btn mx-75">
            SAVE
          </button>
        </Col>
      </Row>
    </form>
  )
}

export default AddEditCardDetails
