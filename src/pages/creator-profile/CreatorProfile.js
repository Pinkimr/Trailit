/* eslint-disable global-require */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useContext, useEffect, useState} from 'react'
import {Container, Row, Col, Button, Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import SVG from 'react-inlinesvg'
import {useDispatch, useSelector} from 'react-redux'
import Details from '../../components/details/Details'
import {getAuthorDetails, getFollowUser, updateFollowUser} from '../../action/user.action'
import {get, getQueryStringObj, windowOpen} from '../../Utils/AppUtill'
import {GET_PROFILE_DATA, UPDATE_FOLLOW_USER} from '../../action/reducer.types'
import {getTrailsList, getTrailsListPublic} from '../../action/categories.action'
import WrappedIframe from '../../components/WrappedIframe'
import CrousalSliderSmall from '../../components/CrousalSliderSmall'
import Follow from '../../components/profile/Follow'
import NumberAbbreviation from '../../components/Widgets/NumberAbbreviation'
import UserImg from '../../components/Widgets/UserImg'
import {GlobalContext} from '../../context/globalContext'
import IsProtected from '../../HOC/IsProtected'
import trailItFb from '../../images/trailit_FB.svg'
import trailTwitter from '../../images/trailit_twiter.svg'
import trailIn from '../../images/trailit_IN.svg'
import trailIg from '../../images/trailit_IG.svg'
import trailUdemy from '../../images/udemy.svg'
import trailSkillShare from '../../images/skillshare.svg'
import trailTikTok from '../../images/tik-tok.svg'

const queryObj = getQueryStringObj()

const addBodyClass = className => document.body.classList.add('trailit_header_black')
const removeBodyClass = className => document.body.classList.remove('trailit_header_black')

const CreatorProfile = props => {
  const {id} = props.match.params
  const {
    userData: {userName},
    isLoggedIn,
  } = useContext(GlobalContext)
  const [slideCounter, setSlideCounter] = useState(0)
  const dispatch = useDispatch()
  const {getProfileData, getFollowUserData = []} = useSelector(state => state.userReducer)
  const {trailList = []} = useSelector(state => state.categoryReducer)
  const {successLabels = []} = useSelector(state => state.apiReducer)
  // details modal
  const [showDetails, setShowDetails] = useState(false)
  const [preview] = useState(userName === id || queryObj.isPreview)

  const handleCloseDetails = () => setShowDetails(false)
  // const [preview, setPreview] = useState(userName === id);
  // console.log({pre});

  // followers modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [modalKey, setModalKey] = useState('follower')

  const getSocialLinks = () => {
    return (
      <>
        {get(['profileData', 'facebook'], getProfileData) && (
          <li>
            <a
              without
              rel="noopener noreferrer"
              onClick={() => windowOpen(get(['profileData', 'facebook'], getProfileData), '_blank')}
            >
              <SVG alt="creator facebook" src={trailItFb} />
            </a>
          </li>
        )}
        {get(['profileData', 'twitter'], getProfileData) && (
          <li>
            <a
              without
              rel="noopener noreferrer"
              onClick={() => windowOpen(get(['profileData', 'twitter'], getProfileData), '_blank')}
            >
              <SVG alt="creator twitter" src={trailTwitter} />
            </a>
          </li>
        )}
        {get(['profileData', 'linkedin'], getProfileData) && (
          <li>
            <a
              without
              rel="noopener noreferrer"
              onClick={() => windowOpen(get(['profileData', 'linkedin'], getProfileData), '_blank')}
            >
              <SVG alt="creator linkedin" src={trailIn} />
            </a>
          </li>
        )}
        {get(['profileData', 'instagram'], getProfileData) && (
          <li>
            <a
              onClick={() => windowOpen(get(['profileData', 'instagram'], getProfileData), '_blank')}
              without
              rel="noopener noreferrer"
            >
              <SVG alt="creator instagram" src={trailIg} />
            </a>
          </li>
        )}
        {get(['profileData', 'udemy'], getProfileData) && (
          <li>
            <a
              onClick={() => windowOpen(get(['profileData', 'udemy'], getProfileData), '_blank')}
              without
              rel="noopener noreferrer"
            >
              <SVG alt="creator udemy" src={trailUdemy} width="32px" height="32px" />
            </a>
          </li>
        )}
        {get(['profileData', 'skillshare'], getProfileData) && (
          <li>
            <a
              onClick={() => windowOpen(get(['profileData', 'skillshare'], getProfileData), '_blank')}
              without
              rel="noopener noreferrer"
            >
              <SVG alt="creator skillshare" src={trailSkillShare} width="32px" height="32px" />
            </a>
          </li>
        )}
        {get(['profileData', 'tiktok'], getProfileData) && (
          <li>
            <a
              onClick={() => windowOpen(get(['profileData', 'tiktok'], getProfileData), '_blank')}
              without
              rel="noopener noreferrer"
            >
              <SVG alt="creator tiktok" src={trailTikTok} width="32px" height="32px" />
            </a>
          </li>
        )}
      </>
    )
  }

  const Following = props => {
    return (
      <Button variant="link" className="trailit_18_600 text-pink" {...props}>
        {getFollowUserData.length > 0 ? 'Following' : ' Follow'}{' '}
      </Button>
    )
  }
  const FollowingButton = IsProtected(Following)

  const FollowerCount = props => {
    return (
      <div className="trailit_24_600 trailit_line_height_80 cursor-pointer" {...props}>
        <NumberAbbreviation value={get(['followers'], getProfileData, 0)} precision={2} />

        <br />
        <span className="trailit_14_500 trailit_line_height_80">Followers</span>
      </div>
    )
  }
  const ProtectedFollowerCount = IsProtected(FollowerCount)

  const FollowingCount = props => {
    return (
      <div className="trailit_24_600 trailit_line_height_80 cursor-pointer" {...props}>
        <NumberAbbreviation value={get(['following'], getProfileData, 0)} precision={2} />

        <br />
        <span className="trailit_14_500 trailit_line_height_80">Following</span>
      </div>
    )
  }

  const ProtectedFollowingCount = IsProtected(FollowingCount)

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

  useEffect(() => {
    dispatch(getAuthorDetails(id))
  }, [dispatch, id])

  useEffect(() => {
    if (successLabels.includes(GET_PROFILE_DATA)) {
      dispatch({type: 'CLEAR_TRAIL_LIST'})
      if (isLoggedIn) {
        dispatch(getFollowUser(get(['userData', '_id'], getProfileData)))
        dispatch(
          getTrailsList({
            userId: get(['userData', '_id'], getProfileData),
            page: 1,
            itemsPerPage: 8,
          })
        )
      } else {
        dispatch(
          getTrailsListPublic({
            userId: get(['userData', '_id'], getProfileData),
            page: 1,
            itemsPerPage: 8,
          })
        )
      }
    }
    if (successLabels.includes(UPDATE_FOLLOW_USER)) {
      dispatch(getAuthorDetails(id))
    }
  }, [dispatch, getProfileData, id, isLoggedIn, successLabels])

  return (
    <>
      <div className="trailit_section extra-padding-top">
        <Container>
          <Row>
            <Col lg={4}>
              <div className="trailit_creator_bx">
                <UserImg className="trailit_creator_pic" img={get(['userData', 'profileImage'], getProfileData)} />
                <div className="trailit_18_600 mb-2">{`${get(['userData', 'firstName'], getProfileData, '')} ${get(
                  ['userData', 'lastName'],
                  getProfileData,
                  ''
                )}`}</div>
                <span className="trailit_14_500 mb-3">@{get(['userData', 'userName'], getProfileData, '')}</span>
                <div className="trailit_14_500 mb-3">{get(['profileData', 'user_titles'], getProfileData, '')}</div>
                <div>
                  {!preview && isLoggedIn && (
                    <FollowingButton
                      onClick={() => dispatch(updateFollowUser(get(['userData', '_id'], getProfileData)))}
                    />
                  )}
                </div>

                {get(['profileData', 'websites'], getProfileData, '')
                  .split(',')
                  .map(website => (
                    <a
                      onClick={() => windowOpen(get(['profileData', 'websites'], getProfileData), '_blank')}
                      without
                      rel="noopener noreferrer"
                      className="trailit_14_500 text-dark cursor-pointer"
                    >
                      {website}
                    </a>
                  ))}

                <Row className="mt-4">
                  {/* <Col md={4} className="text-center">
                    <div className="trailit_24_600 trailit_line_height_80">
                      1.45m
                      <br />
                      <span className="trailit_14_500 trailit_line_height_80">
                        LIT
                      </span>
                    </div>
                  </Col> */}
                  <Col md={6} className="text-center">
                    <ProtectedFollowerCount
                      onClick={() => {
                        handleShow()
                        setModalKey('followed')
                      }}
                    />
                  </Col>
                  <Col md={6} className="text-center">
                    <ProtectedFollowingCount
                      onClick={() => {
                        handleShow()
                        setModalKey('follower')
                      }}
                    />
                  </Col>
                </Row>
                <hr className="trailit_dark" />
                <ul className="list-unstyled mb-5 d-flex align-items-center justify-content-center trailit_social">
                  {getSocialLinks()}
                </ul>
              </div>
            </Col>
            <Col lg={8}>
              <div className="trailit_24_600 mb-3">
                About{' '}
                {`${get(['userData', 'firstName'], getProfileData, '')} ${get(
                  ['userData', 'lastName'],
                  getProfileData,
                  ''
                )}`}
              </div>
              <WrappedIframe srcDoc={get(['profileData', 'user_about'], getProfileData, '')} />
            </Col>
          </Row>

          <>
            {' '}
            <div className="container">
              {' '}
              {trailList.length > 0 && (
                <Row className="mb-3 mt-5">
                  <Col>
                    <div className="trailit_26_500">{get(['userData', 'firstName'], getProfileData, '')}'s Trails</div>
                  </Col>
                  {trailList.length > 4 && (
                    <Col className="text-right">
                      <Link
                        className="trailit_16_400 link"
                        onClick={() => dispatch({type: 'CLEAR_TRAIL_LIST'})}
                        to={`/trails/filter?name=${`${get(
                          ['userData', 'firstName'],
                          getProfileData
                        )}'s Trail`}&userId=${get(['userData', '_id'], getProfileData)}&page=1&itemsPerPage=8`}
                      >
                        View all
                      </Link>
                    </Col>
                  )}
                </Row>
              )}
              <Row className="mb-3 mt-5">
                <Col>
                  <div className="trailit_slider">
                    {trailList.length > 0 && (
                      <CrousalSliderSmall
                        getTrailsListData={trailList}
                        afterChange={current => {
                          if (current / 8 > slideCounter && Math.ceil(current / 8) !== slideCounter) {
                            setSlideCounter(Math.ceil(current / 8))

                            if (isLoggedIn) {
                              dispatch(
                                getTrailsList({
                                  userId: get(['userData', '_id'], getProfileData),
                                  page: Math.ceil(current / 8 + 1),
                                  itemsPerPage: 8,
                                })
                              )
                            } else {
                              dispatch(
                                getTrailsListPublic({
                                  userId: get(['userData', '_id'], getProfileData),
                                  page: Math.ceil(current / 8 + 1),
                                  itemsPerPage: 8,
                                })
                              )
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </>
        </Container>
      </div>

      {showDetails && <Details handleCloseDetails={handleCloseDetails} />}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton />
        <Modal.Body>
          <Follow
            modalKey={modalKey}
            setModalKey={setModalKey}
            otherProfile="true"
            userId={get(['userData', '_id'], getProfileData)}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CreatorProfile
