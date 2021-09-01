import React, {useState, useEffect, useContext} from 'react'
import {Button, Row, Col, Tabs, Tab} from 'react-bootstrap'

import {useDispatch, useSelector} from 'react-redux'
import Cropper from 'react-easy-crop'
import AccountProfile from './Account'
import Profile from './Profile'
import Socials from './Socials'

import {changeUserPicture, getMyProfileDetails} from '../../action/user.action'

import {CHANGE_USER_PICTURE, MY_PROFILE_DATA, NEAR_DETAILS, UPLOAD_MEDIA} from '../../action/reducer.types'
import getCroppedImg, {get, blobToFile} from '../../Utils/AppUtill'
import NumberAbbreviation from '../Widgets/NumberAbbreviation'
import UserImg from '../Widgets/UserImg'
import {nearDetails, uploadMedia} from '../../action/auth.action'
import {NearContext} from '../../context/nearContext'
import {TrailPrefernce} from './TrailPreference'
import {GlobalContext} from '../../context/globalContext'

function UserProfile(props) {
  const {accountId, balance, toggleNearData} = useContext(NearContext)
  const {
    userData: {profileImage, userName},
    userData = {},
    setUserInfo,
  } = useContext(GlobalContext)
  const dispatch = useDispatch()
  const [profilePicture, setProfilePicture] = useState(profileImage !== 'null' ? profileImage : null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [accountBalance, setAccountBalance] = useState(null)
  const [tempProfilePic, setTempProfilePic] = useState(null)
  const [crop, setCrop] = useState({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)

  const {successLabels = []} = useSelector(state => state.apiReducer)
  const {myProfile} = useSelector(state => state.userReducer)
  const {mediaUrl = {}, nearDetailsData = null} = useSelector(state => state.authReducer)

  const imageUploader = React.useRef(null)
  const handleImageUpload = e => {
    const [file] = e.target.files
    if (file) {
      setTempProfilePic(URL.createObjectURL(file))
    }
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(tempProfilePic, croppedAreaPixels, 0)

      const file = blobToFile(croppedImage, 'profile-picture.png')

      const formData = new FormData()
      formData.append('media', file)

      dispatch(uploadMedia(formData))
    } catch (e) {
      alert(e)
    }
  }

  /// //for Tabs
  const [key, setKey] = useState('account')
  /// /for ckeditor

  useEffect(() => {
    if (accountId) {
      balance()
        .then(bal => setAccountBalance(bal))
        .catch()
    } else {
      setAccountBalance(null)
    }
  }, [accountId, balance])

  useEffect(() => {
    if (successLabels.includes(UPLOAD_MEDIA)) {
      dispatch(
        changeUserPicture({
          profileImage: get(['fileUrl'], mediaUrl, null),
        })
      )
    }
    if (successLabels.includes(CHANGE_USER_PICTURE)) {
      setUserInfo({
        ...userData,
        profileImage: get(['fileUrl'], mediaUrl, null),
      })

      setProfilePicture(get(['fileUrl'], mediaUrl, null))

      setTempProfilePic('')
    }
    if (successLabels.includes(NEAR_DETAILS)) {
      if (nearDetailsData) {
        toggleNearData({
          accountId: nearDetailsData.socialId,
          publicKey: nearDetailsData.publicKey,
        })
      }
    }
  }, [dispatch, mediaUrl, nearDetailsData, setUserInfo, successLabels, toggleNearData, userData])

  useEffect(() => {
    dispatch(getMyProfileDetails(userName))
  }, [userName, dispatch])

  useEffect(() => {
    if (successLabels.includes(MY_PROFILE_DATA)) {
      if (get(['userData', 'socialId'], myProfile, 0)) {
        dispatch(nearDetails())
      }
      setUserInfo(get(['userData'], myProfile, {}))
      setProfilePicture(get(['userData', 'profileImage'], myProfile))
    }
  }, [dispatch, myProfile, successLabels])

  return (
    <section className="trailit_section extra-padding-top mt-5">
      <div className="container-fluid as-fluid">
        <Row>
          <Col lg={4}>
            <div className="gr_bx text-center">
              <div className="gr_bx_wtbg">
                <div className="uploadprofileimg">
                  {tempProfilePic && (
                    <Cropper
                      image={tempProfilePic}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      cropShape="round"
                    />
                  )}
                  {!tempProfilePic && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={imageUploader}
                      style={{
                        display: 'none',
                      }}
                    />
                  )}

                  <div
                    className="avtr_img"
                    style={{
                      background: profilePicture && !tempProfilePic && '#fff',
                    }}
                    onClick={() => imageUploader.current.click()}
                  >
                    {!tempProfilePic && <UserImg img={profilePicture} style={{width: 'inherit', height: '100%'}} />}
                  </div>

                  {!tempProfilePic && <div className="upld_icn" />}
                </div>
                {tempProfilePic && (
                  <div className="text-center cstm_d_btn">
                    <Button
                      className="cnlbtn_v1"
                      onClick={() => {
                        setTempProfilePic('')
                        setProfilePicture(profileImage)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={showCroppedImage}>Save</Button>
                  </div>
                )}
                {/* <div className="userinfo">
                  <Row>
                    <Col md={12}>
                      <h3>Premium Plan</h3>
                    </Col>
                    <Col md={12}>
                      <p>Expires on: 12/12/22</p>
                    </Col>
                    <Col md={12}>
                      <Button className="btn btn-secondary">
                        UPGRADE SUBSCRIPTION
                      </Button>
                    </Col>
                  </Row>
                </div> */}
              </div>
              <div className="scl_info">
                <Row>
                  {/* <Col md={4}>
                    <h4>1.45m</h4>
                    <p>LIT</p>
                  </Col> */}
                  <Col md={6}>
                    <h4>
                      <NumberAbbreviation value={get(['followers'], myProfile, 0)} precision={2} />
                    </h4>
                    <p>Followers</p>
                  </Col>
                  <Col md={6}>
                    <h4>
                      {' '}
                      <NumberAbbreviation value={get(['following'], myProfile, 0)} precision={2} />
                    </h4>
                    <p>Following</p>
                  </Col>
                </Row>
              </div>
              {accountBalance && (
                <div className="pmnt_info">
                  <Row>
                    <Col className="text-center brdrrght col-6">
                      <h4>{accountBalance} Near Credits</h4>
                    </Col>
                    {/* <Col className="text-center col-6">
                    <h4>$300 USD</h4>
                  </Col> */}
                  </Row>
                </div>
              )}
            </div>
          </Col>
          <Col lg={8}>
            <div className="gr_bx gr_bxwt_pdng">
              <Tabs
                id="ProfiileTab"
                activeKey={key}
                onSelect={k => setKey(k)}
                className="prfltb justify-content-center"
              >
                <Tab eventKey="account" title="Account">
                  <AccountProfile {...props} />
                </Tab>
                <Tab eventKey="profile" title="Profile">
                  <Profile {...props} />
                </Tab>
                <Tab eventKey="socials" title="Socials">
                  <Socials {...props} />
                </Tab>
                <Tab eventKey="trail-preference" title="Preferences">
                  <TrailPrefernce {...props} />
                </Tab>
                {/* <Tab eventKey="paymentdetails" title="Payment Details">
                  <PaymentDetails {...props} />
                </Tab> */}
                {/* <Tab eventKey="carddetails" title="Card Details">
                  {!isAddEditCardActive && !editID ? (
                    <CardDetails
                      {...props}
                      setIsAddEditCardActive={setIsAddEditCardActive}
                      isAddEditCardActive={isAddEditCardActive}
                      setEditID={setEditID}
                    />
                  ) : (
                    <AddEditCardDetails
                      {...props}
                      setIsAddEditCardActive={setIsAddEditCardActive}
                      isAddEditCardActive={isAddEditCardActive}
                      editID={editID}
                      setEditID={setEditID}
                    />
                  )}
                </Tab> */}
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default UserProfile
