/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable global-require */
import React, {useContext, useState, useEffect} from 'react'
import {Button, Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'

import {useDispatch, useSelector} from 'react-redux'
import {joiResolver} from '@hookform/resolvers/joi'
import {useForm, Controller} from 'react-hook-form'
import Joi from 'joi'
import _ from 'lodash'
import Axios from 'axios'
import {MY_PROFILE_DATA, UPDATE_PROFILE_DATA} from '../../action/reducer.types'
import {get} from '../../Utils/AppUtill'
import {addUpdateProfile} from '../../action/user.action'
import ChangePassword from './ChangePassword'
import {platformUrl, url} from '../../action/endpoint'
import {resendVerification} from '../../action/auth.action'
import {GlobalContext} from '../../context/globalContext'
import ErrorLabel from '../Widgets/ErrorLabel'
import trailItReload from '../../images/reload.svg'

const Account = props => {
  const [show, setShow] = useState(false)
  const [isInputChange, setisInputChange] = useState(false)
  const [userNameError, setUserNameError] = useState(false)
  const [initialUserName, setInitialUsername] = useState('')
  const {setUserInfo, userData, appToken} = useContext(GlobalContext)

  const handleShow = () => setShow(true)
  const schema = Joi.object({
    userName: Joi.string()
      .external(async (value, helpers) => {
        try {
          const emailExist = await Axios.request({
            url: `${platformUrl}/user/getUserFromUsername/${value}`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${appToken}`,
              'Content-Type': 'application/json',
            },
          })

          if (get(['data', 'data', 'response', 'responseCode'], emailExist) === 208) {
            return value
          }
          if (initialUserName !== value) {
            setUserNameError('User Exist')
          }
          throw new Error('any.invalid')
        } catch (err) {
          return Error(err)
        }
      }, 'external')
      .required(),
  })

  const {myProfile} = useSelector(state => state.userReducer)
  const {successLabels = []} = useSelector(state => state.apiReducer)

  const {handleSubmit, errors, control, reset, watch} = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    submitFocusError: true,
    shouldUnregister: false,
    resolver: joiResolver(schema),
  })

  const dispatch = useDispatch()
  const userName = watch('userName')

  const handleUpdateProfile = data => {
    const payload = {...data}

    if (!userNameError) {
      setisInputChange(false)
      dispatch(addUpdateProfile(payload))
    }
  }

  useEffect(() => {
    if (successLabels.includes(MY_PROFILE_DATA)) {
      reset({
        userName: get(['userData', 'userName'], myProfile, ''),
      })
      setInitialUsername(get(['userData', 'userName'], myProfile, ''))
    }

    if (successLabels.includes(UPDATE_PROFILE_DATA)) {
      setUserInfo({...userData, userName})
    }
  }, [myProfile, reset, successLabels, userName])

  return (
    <form className="def_form">
      <Row>
        <Col md={12} className="mb-3">
          <Row>
            <Col md={6}>
              <div className="form-group">
                <label className="control-label">Username</label>
                <Controller
                  name="userName"
                  control={control}
                  render={({value, onChange, onBlur}) => (
                    <>
                      {' '}
                      <input
                        type="text"
                        className="form-control"
                        value={value}
                        onChange={e => {
                          setisInputChange(true)
                          onChange(e)
                          setUserNameError('')
                        }}
                      />
                      <ErrorLabel msg={(errors.userName && errors.userName.message) || userNameError || ''} />
                    </>
                  )}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Email</label>
                <div style={{display: 'inline-flex', width: '100%'}}>
                  <input type="text" className="form-control" readOnly value={userData.email} />
                  {!get(['userData', 'isVerified'], myProfile) && (
                    <span
                      style={{margin: 'auto'}}
                      className="ml-2"
                      onClick={() =>
                        dispatch(
                          resendVerification({
                            email: userData.email,
                          })
                        )
                      }
                    >
                      <OverlayTrigger
                        key="resend"
                        overlay={<Tooltip id="tooltip-resend">Resend Email Verification</Tooltip>}
                      >
                        <img src={trailItReload} alt="resend" height={18} width={18} />
                      </OverlayTrigger>
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="control-label">Password</label>
                <input type="password" className="form-control" value={123456789} disabled />
              </div>

              <Button className="rst_psswrd_btn" onClick={handleShow}>
                Change Password
              </Button>
            </Col>
            {/* <Col md={6}>
              <div className="form-group">
                <label className="control-label">Upgrade Subscription</label>
                <select className="form-control">
                  <option>Freemium, Premium, Enterprise</option>
                  <option>Freemium, Premium, Enterprise</option>
                </select>
              </div>
              <div className="form-group">
                <label className="control-label">&nbsp;</label>
                <select className="form-control">
                  <option>Month, Year</option>
                  <option>Month, Year</option>
                </select>
              </div>
              <h5 className="frm_ttl mt-5">Select Token or Credit Card</h5>
              <div className="d-flex tlncrdtfrm">
                <div className="form-group mr-4 text-center">
                  <label className="control-label">Tokens</label>
                  <input type="text" className="form-control" value="500" />
                </div>
                <div className="form-group mr-4 text-center">
                  <label className="control-label">Card</label>
                  <input type="text" className="form-control" value="$50" />
                </div>
                <div className="form-group">
                  <label className="control-label">&nbsp;</label>
                  <input type="submit" className="sbmt_btn mx-75" />
                </div>
              </div>
            </Col> */}
          </Row>
        </Col>
        <Col md={12} className="text-right mb-2 mt-1">
          <button
            type="button"
            className="cncl_btn mr-2"
            onClick={e => {
              e.preventDefault()
              reset({
                userName: get(['userData', 'userName'], myProfile, ''),
              })
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="sbmt_btn mx-75"
            onClick={handleSubmit(async data => handleUpdateProfile(data))}
            disabled={!isInputChange}
          >
            SAVE
          </button>
        </Col>
      </Row>
      <ChangePassword open={show} setOpen={setShow} />
    </form>
  )
}

export default Account
