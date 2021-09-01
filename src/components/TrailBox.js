import React, {useContext, useEffect, useState} from 'react'
import SVG from 'react-inlinesvg'
import {Button, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import _ from 'lodash'
import SliderBgImage from '../images/trailit_bx_img.png'
import moreIcon from '../images/trailit_dots-wt.svg'
import Details from './details/Details'
import {copyStringToClipboard, get, getTrailUrl,getQueryStringObj} from '../Utils/AppUtill'
import {deleteTour, getFollowListForEachTrail, updateTrailFollow, updateTrailTour} from '../action/trails.action'
import ConfirmationModal from './ConfirmationModal'
import {DELETE_TOUR} from '../action/reducer.types'
import UserImg from './Widgets/UserImg'
import {GlobalContext} from '../context/globalContext'
import FollowerListModal from './modal/FollowerListModal'
import groupSvg from '../images/group.svg'
import comment from '../images/comment.svg'
import plus from '../images/plus.svg'
import shareImg from '../images/share.svg'
import visibilityPrivate from '../images/visibility-private.svg'
import visibility from '../images/visibility.svg'

const TrailBox = props => {
  const {cat, moreDropdown} = props
  const {isLoggedIn, userData} = useContext(GlobalContext)
  const history = useHistory()
  const dispatch = useDispatch()
  const [showDetails, setShowDetails] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [followListModal, setFollowListModal] = useState(false)
  const handleShowDetails = () => setShowDetails(true)
  const handleCloseDetails = () => setShowDetails(false)
  const {successLabels = []} = useSelector(state => state.apiReducer)

  const queryObj = getQueryStringObj()
  const sliderStyle = {
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${
      cat.cover_image_url ? cat.cover_image_url : SliderBgImage
    }) no-repeat scroll center center / cover`,
  }

  useEffect(() => {
    if (successLabels.includes(DELETE_TOUR)) {
      setDeleteModal(false)
    }
  }, [successLabels])
  
  return (
    <>
      <div className="trailit_bx cursor-pointer" onClick={() => history.push(`/trail/${cat.trail_name_slug}`)}>
        <div className="img">
          <div className="img_overlay" />
          <span className="img_bg" style={sliderStyle}>
            <div className="trailit_img_content">
              <div className="top">
                <div className="d-flex justify-content-end">
                  {(window.location.pathname === '/profile' || history.location.pathname ==='/trails/filter' && Object.values(queryObj).includes('My Trails')) && (
                    <Button
                      variant="link"
                      style={{color: '#fff'}}
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (cat.trailFollowCount > 0) {
                          setFollowListModal(true)
                          dispatch(getFollowListForEachTrail(cat.trail_id))
                        }
                      }}
                    >
                      {cat.trailFollowCount}
                      <SVG className="ml-2" alt="share" width="25px" height="25px" src={groupSvg} />
                    </Button>
                  )}
                  {!moreDropdown && (
                    <>
                      {isLoggedIn && cat.user_id !== get(['_id'], userData) && (
                        <Button
                          variant="link"
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            dispatch(updateTrailFollow(cat.trail_id))
                          }}
                        >
                          <SVG alt="share" width="20px" height="20px" src={!cat.isFollowing ? plus : comment} />
                        </Button>
                      )}
                      <Button
                        variant="link"
                        onClick={e => {
                          e.preventDefault()
                          e.stopPropagation()
                          copyStringToClipboard(getTrailUrl(get(['trailTour'], cat, []), cat.user_id))
                        }}
                      >
                        <SVG alt="share" width="20px" height="20px" src={shareImg} />
                      </Button>
                    </>
                  )}
                  {moreDropdown && cat.trail_user_status === 'private' && (
                    <Button
                      variant="link"
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        dispatch(
                          updateTrailTour(cat.trail_id, {
                            trail_user_status: 'public',
                            trail_id: cat.trail_id,
                          })
                        )
                      }}
                    >
                      <OverlayTrigger
                        placement="bottom"
                        delay={{show: 250, hide: 100}}
                        overlay={compProps => (
                          <Tooltip id="button-tooltip1" {...compProps}>
                            {_.startCase(cat.trail_user_status)}
                          </Tooltip>
                        )}
                      >
                        <SVG alt="share" width="20px" height="20px" src={visibilityPrivate} />
                      </OverlayTrigger>
                    </Button>
                  )}
                  {moreDropdown && cat.trail_user_status === 'public' && (
                    <Button
                      variant="link"
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        dispatch(
                          updateTrailTour(cat.trail_id, {
                            trail_user_status: 'private',
                            trail_id: cat.trail_id,
                          })
                        )
                      }}
                    >
                      <OverlayTrigger
                        placement="bottom"
                        delay={{show: 250, hide: 100}}
                        overlay={compProps => (
                          <Tooltip id="button-tooltip" {...compProps}>
                            {_.startCase(cat.trail_user_status)}
                          </Tooltip>
                        )}
                      >
                        <SVG alt="share" width="20px" height="20px" src={visibility} />
                      </OverlayTrigger>
                    </Button>
                  )}

                  {moreDropdown && (
                    <Dropdown
                      className="accdrpdwn"
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                    >
                      <Dropdown.Toggle variant="link" className="p-0">
                        <img style={{marginTop: 7}} alt="" src={moreIcon} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            copyStringToClipboard(getTrailUrl(get(['trailTour'], cat, []), cat.user_id))
                          }}
                        >
                          Share
                        </Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => history.push(`/edit-trail/${cat.trail_name_slug}`)}>
                          {' '}
                          {cat.trail_intro_url ? 'Edit Trail' : ' Add Trail'}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setDeleteModal(true)
                          }}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
              <div className="bottom">
                <div className="d-flex justify-content-between">
                  <div className="trailit_14_500_roboto d-flex text-white align-items-center">
                    <UserImg img={get(['userData', 'profileImage'], cat)} className="trialit_user" />
                    <span className="ml-2">{`${get(['userData', 'firstName'], cat, '')} ${get(
                      ['userData', 'lastName'],
                      cat,
                      ''
                    )}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
        <div className="trailit_bx_title">
          <div onClick={handleShowDetails} className="click trailit_16_500 trailit_ellips text-dark">
            {cat.trail_name}
          </div>
        </div>
        {showDetails && <Details handleCloseDetails={handleCloseDetails} />}
        {deleteModal && (
          <ConfirmationModal
            open={deleteModal}
            setOpen={setDeleteModal}
            onSuccess={() => dispatch(deleteTour(cat.trail_id))}
          />
        )}
      </div>
      {followListModal && (
        <FollowerListModal followListModal={followListModal} setFollowListModal={setFollowListModal} />
      )}
    </>
  )
}

export default TrailBox
