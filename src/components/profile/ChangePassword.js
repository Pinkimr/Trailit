import React, {useContext, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import {joiResolver} from '@hookform/resolvers/joi'
import {useForm, Controller} from 'react-hook-form'
import Joi from 'joi'
import _ from 'lodash'
import {useDispatch, useSelector} from 'react-redux'

import {changePassword} from '../../action/auth.action'
import {CHANGE_PASSWORD} from '../../action/reducer.types'
import {GlobalContext} from '../../context/globalContext'
import {joiUpdatedMessage} from '../../Utils/AppUtill'
import ErrorLabel from '../Widgets/ErrorLabel'

const schema = Joi.object({
  oldPassword: Joi.string().required().label('old password').messages(joiUpdatedMessage),
  newPassword: Joi.string().min(8).max(20).required().label('new password').messages(joiUpdatedMessage),
  confirmNewPassword: Joi.string()
    .equal(Joi.ref('newPassword'))
    .required()
    .label('Confirm password')
    .messages({
      'any.only': '{#label} does not match',
      ...joiUpdatedMessage,
    }),
})

const ChangePassword = props => {
  const {open, setOpen} = props
  const dispatch = useDispatch()
  const {handleSubmit, errors, control, watch} = useForm({
    mode: 'onTouched',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    submitFocusError: true,
    shouldUnregister: false,
    resolver: joiResolver(schema),
  })
  const {userData = {}} = useContext(GlobalContext)

  const {successLabels = []} = useSelector(state => state.apiReducer)

  const handleChangePwd = data => {
    const payload = _.omit(data, ['confirmNewPassword'])
    payload.email = userData.email
    dispatch(changePassword(payload))
  }

  useEffect(() => {
    if (successLabels.includes(CHANGE_PASSWORD)) {
      setOpen(false)
    }
  }, [setOpen, successLabels])

  return (
    <Modal
      show={open}
      onHide={() => {
        setOpen(false)
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="frbgclor"
    >
      <Modal.Header>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="def_form def_form_full_wdth">
          <div className="form-group">
            <label className="control-label">Old Password</label>
            <Controller
              name="oldPassword"
              control={control}
              render={({value, onChange, onBlur}) => (
                <>
                  <input type="password" className="form-control" onChange={onChange} value={value} onBlur={onBlur} />
                  <ErrorLabel msg={errors.oldPassword && errors.oldPassword.message} />
                </>
              )}
            />
          </div>
          <div className="form-group">
            <label className="control-label">New Password</label>
            <Controller
              name="newPassword"
              control={control}
              render={({value, onChange, onBlur}) => (
                <>
                  <input type="password" className="form-control" onChange={onChange} value={value} onBlur={onBlur} />
                  <ErrorLabel msg={errors.newPassword && errors.newPassword.message} />
                </>
              )}
            />
          </div>
          <div className="form-group">
            <label className="control-label">Confirm New Password</label>
            <Controller
              name="confirmNewPassword"
              control={control}
              render={({value, onChange, onBlur}) => (
                <>
                  <input type="password" className="form-control" onChange={onChange} value={value} onBlur={onBlur} />
                  <ErrorLabel msg={errors.confirmNewPassword && errors.confirmNewPassword.message} />
                </>
              )}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="cncl_btn mr-2"
          onClick={() => {
            setOpen(false)
          }}
        >
          Cancel
        </button>
        <button type="submit" className="sbmt_btn mx-75" onClick={handleSubmit(data => handleChangePwd(data))}>
          SAVE
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ChangePassword
