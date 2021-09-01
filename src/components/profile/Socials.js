import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {joiResolver} from '@hookform/resolvers/joi'
import {useForm, Controller} from 'react-hook-form'
import Joi from 'joi'
import _ from 'lodash'
import {useDispatch, useSelector} from 'react-redux'
import {MY_PROFILE_DATA} from '../../action/reducer.types'
import {get} from '../../Utils/AppUtill'
import {addUpdateProfile} from '../../action/user.action'
import ErrorLabel from '../Widgets/ErrorLabel'

const schema = Joi.object({
  facebook: Joi.string()
    .pattern(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    )
    .allow('')
    .allow(null)
    .message('should have valid url'),
  instagram: Joi.string()
    .pattern(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    )
    .allow('')
    .allow(null)
    .message('should have valid url'),
  linkedin: Joi.string()
    .pattern(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    )
    .allow('')
    .allow(null)
    .message('should have valid url'),
  skillshare: Joi.string()
    .pattern(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    )
    .allow('')
    .allow(null)
    .message('should have valid url'),
  tiktok: Joi.string()
    .pattern(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    )
    .allow('')
    .allow(null)
    .message('should have valid url'),
  twitter: Joi.string()
    .pattern(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    )
    .allow('')
    .allow(null)
    .message('should have valid url'),
  udemy: Joi.string()
    .pattern(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    )
    .allow('')
    .allow(null)
    .message('should have valid url'),
  websites: Joi.string()
    .pattern(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    )
    .allow('')
    .allow(null)
    .message('should have valid url'),
})

const Socials = props => {
  const {myProfile} = useSelector(state => state.userReducer)
  const {successLabels = []} = useSelector(state => state.apiReducer)
  const [isInputChange, setisInputChange] = useState(false)

  const {handleSubmit, errors, control, reset} = useForm({
    mode: 'onTouched',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    submitFocusError: true,
    shouldUnregister: false,
    resolver: joiResolver(schema),
  })

  const dispatch = useDispatch()

  const handleUpdateProfile = data => {
    const payload = {...data}
    setisInputChange(false)
    dispatch(addUpdateProfile(payload))
  }

  useEffect(() => {
    if (successLabels.includes(MY_PROFILE_DATA)) {
      reset(
        _.pick(get(['profileData'], myProfile, {}), [
          'facebook',
          'instagram',
          'linkedin',
          'skillshare',
          'tiktok',
          'twitter',
          'udemy',
          'websites',
        ])
      )
    }
  }, [myProfile, reset, successLabels])

  return (
    <form className="def_form">
      <Row>
        <Col md={12} className="mb-3">
          <Row>
            <Col md={6}>
              <div className="form-group">
                <label className="control-label">Websites</label>
                <Controller
                  name="websites"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={e =>{ 
                        setisInputChange(true) 
                        onChange(e)}} />
                      <ErrorLabel msg={errors.websites && errors.websites.message} />
                    </>
                  )}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Facebook</label>
                <Controller
                  name="facebook"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={e => {
                        setisInputChange(true) 
                        onChange(e)}} />{' '}
                      <ErrorLabel msg={errors.facebook && errors.facebook.message} />
                    </>
                  )}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Twitter</label>
                <Controller
                  name="twitter"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={e => {
                        setisInputChange(true) 
                        onChange(e)}} />
                      <ErrorLabel msg={errors.twitter && errors.twitter.message} />
                    </>
                  )}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Instagram</label>
                <Controller
                  name="instagram"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={e => {
                        setisInputChange(true) 
                        onChange(e)}} />
                      <ErrorLabel msg={errors.instagram && errors.instagram.message} />
                    </>
                  )}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="control-label">Linkedin</label>
                <Controller
                  name="linkedin"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={e => {
                        setisInputChange(true) 
                        onChange(e)}} />
                      <ErrorLabel msg={errors.linkedin && errors.linkedin.message} />
                    </>
                  )}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Tiktok</label>
                <Controller
                  name="tiktok"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={e => {
                        setisInputChange(true) 
                        onChange(e)}} />
                      <ErrorLabel msg={errors.tiktok && errors.tiktok.message} />
                    </>
                  )}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Udemy</label>
                <Controller
                  name="udemy"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={e => {
                        setisInputChange(true) 
                        onChange(e)}} />
                      <ErrorLabel msg={errors.udemy && errors.udemy.message} />
                    </>
                  )}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Skillshare</label>
                <Controller
                  name="skillshare"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input type="text" className="form-control" value={value} onChange={e => {
                        setisInputChange(true) 
                        onChange(e)}} />
                      <ErrorLabel msg={errors.skillshare && errors.skillshare.message} />
                    </>
                  )}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={12} className="text-right mb-2 mt-1">
          <button
            type="button"
            className="cncl_btn mr-2"
            onClick={e => {
              e.preventDefault()
              reset(
                _.pick(get(['profileData'], myProfile, {}), [
                  'facebook',
                  'instagram',
                  'linkedin',
                  'skillshare',
                  'tiktok',
                  'twitter',
                  'udemy',
                  'websites',
                ])
              )
            }}
          >
            Cancel
          </button>
          <button type="button" className="sbmt_btn mx-75" onClick={handleSubmit(handleUpdateProfile)}  disabled={!isInputChange}>
            SAVE
          </button>
        </Col>
      </Row>
    </form>
  )
}

export default Socials
