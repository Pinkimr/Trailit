/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react'
import {Row, Col, Button, Dropdown, Modal} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {getTrailsList} from '../../action/categories.action'
import SliderBgImage from '../../images/trailit_bx_img.png'
import CrousalSliderSmall from '../../components/CrousalSliderSmall'
// import {getAuthorDetails, getMyProfileDetails} from '../../action/user.action'
import Follow from '../../components/profile/Follow'
import {GET_PROFILE_DATA, MY_PROFILE_DATA, UPDATE_FOLLOW_USER} from '../../action/reducer.types'
import {get} from '../../Utils/AppUtill'
import NumberAbbreviation from '../../components/Widgets/NumberAbbreviation'
import UserImg from '../../components/Widgets/UserImg'
import {GlobalContext} from '../../context/globalContext'

/* global chrome */

const addBodyClass = props => document.body.classList.add('Profile')
const removeBodyClass = props => document.body.classList.remove('Profile')
const AccountPage = props => {
  const {userData: {userName, profileImage, _id: userId} = {}} = useContext(GlobalContext)

  const dispatch = useDispatch()
  const history = useHistory()
  const {myProfile} = useSelector(state => state.userReducer)
  const {trailList = []} = useSelector(state => state.categoryReducer)
  const {successLabels = []} = useSelector(state => state.apiReducer)
  useEffect(() => {
    // Set up
    if (props instanceof Array) props.map(addBodyClass)
    else addBodyClass(props)

    // Clean up
    return () => {
      if (props instanceof Array) props.map(removeBodyClass)
      else removeBodyClass(props)
    }
  }, [props])
  const style = {
    background: `url(${SliderBgImage}) no-repeat scroll center center / cover`,
  }

  // Followers Modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [modalKey, setModalKey] = useState('follower')

  // useEffect(() => {
  //   dispatch(getMyProfileDetails(userName))
  // }, [dispatch, userName])

  // useEffect(() => {
  //   if (successLabels.includes(UPDATE_FOLLOW_USER)) {
  //     dispatch(getMyProfileDetails(userName))
  //   }
  // }, [successLabels])

  useEffect(() => {
    if (userId) {
      dispatch({type: 'CLEAR_TRAIL_LIST'})
      dispatch(
        getTrailsList({
          userId,
          trailStatus: 'all',
          page: 1,
          itemsPerPage: 8,
        })
      )
    }
  }, [userId])

  return (
    <>
      {/* ------section start---------- */}
      <section className="trailit_section mt-xl-5 pb-5">
        <div className="trailit_profile_hdr">
          <div className="container-fluid">
            <div className="trailit_slider">
              <Row className="align-items-center">
                <Col lg={5} className="text-center">
                  <div className="d-flex align-items-center flxrspnsv">
                    <UserImg className="trialit_userPic" img={profileImage} />
                    <div>
                      <div className="trailit_24_600 mb-2">{`${get(['userData', 'firstName'], myProfile, '')} ${get(
                        ['userData', 'lastName'],
                        myProfile,
                        ''
                      )}`}</div>
                      <div className="trailit_14_500">{get(['profileData', 'user_titles'], myProfile, '')}</div>
                    </div>
                  </div>
                </Col>
                <Col lg={7} className="rsp_mrgn">
                  <div className="d-flex align-items-center justify-content-end flxrspnsv_v1">
                    <div className="d-flex align-items-center justify-content-center  text-center p-5">
                      {/* <div className="trailit_24_600 trailit_line_height_80">
                        1.45m
                        <br />
                        <span className="trailit_14_500 trailit_line_height_80">
                          LIT
                        </span>
                      </div> */}
                      <div
                        className="click trailit_24_600 trailit_line_height_80 px-3"
                        onClick={() => {
                          handleShow()
                          setModalKey('followed')
                        }}
                      >
                        <NumberAbbreviation value={get(['followers'], myProfile, 0)} precision={2} />

                        <br />
                        <span className="trailit_14_500 trailit_line_height_80">Followers</span>
                      </div>
                      <div
                        className="click trailit_24_600 trailit_line_height_80"
                        onClick={() => {
                          handleShow()
                          setModalKey('follower')
                        }}
                      >
                        <NumberAbbreviation value={get(['following'], myProfile, 0)} precision={2} />

                        <br />
                        <span className="trailit_14_500 trailit_line_height_80">Following</span>
                      </div>
                    </div>
                    <Button variant="pink" className="rounded-7 btnsmll" onClick={() => history.push(`settings`)}>
                      Settings
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        {trailList.length > 0 && (
          <div className="container-fluid">
            <div className="trailit_slider">
              {/* ------row start---------- */}
              <Row>
                <Col className="mb-3">
                  <div className="trailit_24_600">My Trails</div>
                </Col>

                {trailList.length > 4 && (
                  <Col className="text-right">
                    <Col>
                      <Link
                        className="trailit_16_400 link"
                        onClick={() => dispatch({type: 'CLEAR_TRAIL_LIST'})}
                        to={`/trails/filter?name=My Trails&userId=${get(
                          ['userData', '_id'],
                          myProfile
                        )}&trailStatus=all&page=1&itemsPerPage=20`}
                      >
                        View all
                      </Link>
                    </Col>
                  </Col>
                )}

                <Col className="mb-2 col-md-12">
                  <div className="trailit_slider">
                    {trailList.length > 0 && (
                      <CrousalSliderSmall
                        moreDropdown
                        getTrailsListData={trailList}
                        afterChange={current => {
                          dispatch(
                            getTrailsList({
                              userId,
                              page: Math.ceil(current / 8 + 1),
                              itemsPerPage: 8,
                              trailStatus: 'all',
                            })
                          )
                        }}
                      />
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton />
          <Modal.Body>
            <Follow modalKey={modalKey} setModalKey={setModalKey} userId={userId} handleClose={handleClose} />
          </Modal.Body>
        </Modal>
      </section>
      {/* ------section end---------- */}
    </>
  )
}
export default AccountPage
