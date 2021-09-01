/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import SVG from 'react-inlinesvg'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import CrousalSliderSmall from '../../components/CrousalSliderSmall'
import {
  copyStringToClipboard,
  get,
  getTrailUrl,
} from '../../Utils/AppUtill'
import {
  getTrailTourDetails,
  getTrailTourDetailsPublic,
  updateTrailFollow,
  updateTrailTour
} from '../../action/trails.action'
import {
  doCategoriesExist,
  getAllCategories,
  getTrailsList,
  getTrailsListPublic,
  removeCategories,
} from '../../action/categories.action'
import {
  getFollowUser,
  updateFollowUser,
} from '../../action/user.action'
import {
  CREATE_TRAIL_FOLLOW,
  GET_TOUR_DETAILS,
  UPDATE_FOLLOW_USER,
  UPDATE_TOUR_INFO,
} from '../../action/reducer.types'
import userPng from '../../images/user.png'
import StepSlider from '../../components/StepSlider'
import {chromeSendMessage} from '../../Utils/extension-connection'
import ConfirmationModal from '../../components/ConfirmationModal'
import {GlobalContext} from '../../context/globalContext'
import BgImage from '../../images/trailit_bx_img.png'
import PageNotFound from '../PageNotFound'
import useIsLoading from '../../hooks/useIsLoading'
import trailBigLogo from '../../images/trailit_big_logo.png'
import trailComment from '../../images/comment.svg'
import trailPlus from '../../images/plus.svg'
import trailItShare from '../../images/share.svg'
import visibilityPrivate from '../../images/visibility-private.svg'
import visibility from '../../images/visibility.svg'

const CreatorTrailDetails = props => {
  const [confirmationData, setConfirmationData] = useState(null)
  const history = useHistory()
  const {
    userData: {_id: user_id} = {},
    userData = {},
    isLoggedIn,
  } = useContext(GlobalContext)

  const addBodyClass = className =>
    document.body.classList.add('trailit_header_black')
  const removeBodyClass = className =>
    document.body.classList.remove('trailit_header_black')

  const {trailSlug} = props.match.params
  const dispatch = useDispatch()
  const isLoading = useIsLoading()

  const [confirmationData1, setConfirmationData1] = useState('test')
  const {trailTourData} = useSelector(state => state.trailReducer)
  const {
    trailList,
    doCategoryExistData,
    getAllCategory = [],
  } = useSelector(state => state.categoryReducer)
  const {getFollowUserData = []} = useSelector(
    state => state.userReducer,
  )
  const {successLabels = []} = useSelector(state => state.apiReducer)
  const [categoryList, setCategoryList] = useState([])

  const getExistingCategoryArray = useCallback(() => {
    if (get(['categories_list'], doCategoryExistData)) {
      return get(['categories_list'], doCategoryExistData, '')
        .split(',')
        .map(Number)
    }
    return []
  }, [doCategoryExistData])

  const handleCategory = (id, action) => {
    const categoryFindIndex = categoryList.findIndex(
      r => r.trail_category_id === id,
    )

    if (action === 'add' && categoryFindIndex === -1) {
      const categoryFind = getAllCategory.find(
        r => r.trail_category_id === id,
      )
      categoryList.push(categoryFind)
      setCategoryList(categoryList)
    }

    const data = {
      categories_list: id.toString(),
      action,
    }
    dispatch(removeCategories(data))
  }

  useEffect(() => {
    if (successLabels.includes(CREATE_TRAIL_FOLLOW)) {
      dispatch(getTrailTourDetails(trailSlug))
    }
  }, [dispatch, successLabels, trailSlug, trailTourData])

  const Follow = props => (
    <Button variant="link" {...props}>
      <img
        src={trailBigLogo}
        alt="logo"
        height={25}
        width={25}
        className="mr-1"
      />
      <span>
        {get(['isFollowing'], trailTourData, false)
          ? 'Following Trail'
          : 'Follow Trail'}
      </span>
    </Button>
  )

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
    if (isLoggedIn) {
      dispatch(getTrailTourDetails(trailSlug))
    } else {
      dispatch(getTrailTourDetailsPublic(trailSlug))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoggedIn, trailSlug])

  useEffect(() => {
    dispatch(getAllCategories({type: 'random'}))
  }, [dispatch])

  useEffect(() => {
    if (successLabels.includes(UPDATE_FOLLOW_USER)) {
      dispatch(getFollowUser(get(['userData', '_id'], trailTourData)))
    }
  }, [dispatch, isLoggedIn, successLabels, trailTourData])

  useEffect(() => {
    if (successLabels.includes(GET_TOUR_DETAILS)) {
      dispatch({type: 'CLEAR_TRAIL_LIST'})
      if (isLoggedIn) {
        dispatch(
          getTrailsList({
            userId: get(['userData', '_id'], trailTourData),
            page: 1,
            itemsPerPage: 8,
          }),
        )
        dispatch(
          getFollowUser(get(['userData', '_id'], trailTourData)),
        )
        dispatch(doCategoriesExist())
      } else {
        dispatch(
          getTrailsListPublic({
            userId: get(['userData', '_id'], trailTourData),
            page: 1,
            itemsPerPage: 8,
          }),
        )
      }
    }
  }, [successLabels])

  const settings = {
    arrows: true,
    infinite: false,
    vertical: true,
    verticalSwiping: true,
    speed: 1000,
    slidesToShow: 10,
    slidesToScroll: 5,
  }

  const styleBgImg = {
    background: `url(${BgImage}) no-repeat scroll center center / cover`,
  }

  const renderIntro = () => {
    const arr = get(['trail_intro_url'], trailTourData, '').split('.')

    if (['mp4', 'mkv', 'mpeg'].includes(arr[arr.length - 1])) {
      return (
        <div
          className="trailit_video_bx trailit_video_height_500"
          // style={styleBgImg}
        >
          <video controls>
            <source
              src={get(['trail_intro_url'], trailTourData, '')}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )
    }
    if (['jpeg', 'png', 'jpg'].includes(arr[arr.length - 1])) {
      return (
        <div
          className="trailit_video_bx trailit_video_height_500"
          // style={styleBgImg}
        >
          <img
            src={get(['trail_intro_url'], trailTourData, '')}
            alt="intro"
            style={{height: '100%'}}
          />
        </div>
      )
    }
    if (
      !get(['trail_intro_url'], trailTourData, '') &&
      get(['userData', '_id'], trailTourData) === user_id
    ) {
      return (
        <div className="trailit_video_bx trailit_video_height_500 trailit_video_bx_as">
          <Button
            variant="link"
            className="trailit_play_btn btn btn-pink"
            onClick={() => history.push(`/edit-trail/${trailSlug}`)}
          >
            {' '}
            Add Intro
          </Button>
        </div>
      )
    }
    if (
      !get(['trail_intro_url'], trailTourData, '') &&
      get(['userData', '_id'], trailTourData) !== user_id
    ) {
      return (
        <div
          className="trailit_video_bx trailit_video_height_500"
          style={styleBgImg}
        />
      )
    }
    return (
      <div
        className="trailit_video_bx trailit_video_height_500"
        style={styleBgImg}
      />
    )
  }

  const handleStepClick = (
    stepNumber,
    trailDataId,
    continueTour,
    noStepsToWatch,
  ) => {
    if (
      window.localStorage.getItem('extension_status') !== 'active'
    ) {
      const userId = user_id || null
      const {origin} = window.location
      const {pathname} = window.location
      const redirectUrl = `${origin}${pathname}`
      const singleStepPreview =
        continueTour === 'undefined' ||
        'null' ||
        undefined ||
        null ||
        false
          ? true
          : undefined

      window
        .open(
          getTrailUrl(
            get(['steps'], trailTourData, []),
            get(['userData', '_id'], trailTourData),
            stepNumber,
            userId,
            redirectUrl,
            singleStepPreview,
            trailDataId,
          ),
          '_self',
        )
        .focus()
    } else if (user_id) {
      if (!stepNumber) {
        chromeSendMessage(
          {
            loggedInData: userData,
            userData: get(['userData'], trailTourData, {}),
            trail_id: get(['trail_id'], trailTourData),
            trail_name: get(['trail_name'], trailTourData),
            type: 'WEB_REQUEST',
            action: 'PREVIEW',
          },
          response => {},
        )
      } else if (continueTour) {
        let step
        // checking if visited step is last then start from other non visited step
        const check =
          get(['steps'], trailTourData, [])[
            get(['steps'], trailTourData, []).length - 1
          ].trail_data_id ===
          Number(
            get(['visitedSteps'], trailTourData, '').split(',')[
              get(['visitedSteps'], trailTourData, '').split(',')
                .length - 1
            ],
          )

        if (!check) {
          step = stepNumber
        } else {
          const index = get(['steps'], trailTourData, []).findIndex(
            step =>
              !get(['visitedSteps'], trailTourData, '')
                .split(',')
                .map(i => i, Number)
                .includes(step),
          )
          step = index + 1
        }
        chromeSendMessage(
          {
            loggedInData: userData,
            userData: get(['userData'], trailTourData, {}),
            trail_id: get(['trail_id'], trailTourData),
            trail_name: get(['trail_name'], trailTourData),
            tourStep: step,
            type: 'WEB_REQUEST',
            action: 'CONTINUE_PREVIEW',
          },
          response => {},
        )
      }
    }
  }

  const validateLogin = () => {
    const status = window.localStorage.getItem('extension_status')
    if (status === 'inactive') {
      setConfirmationData(
        'Please install extension or login if already installed !',
      )
    }
    if (status === 'different_user') {
      setConfirmationData(
        'Please login with same user to get the add-on experience ',
      )
    }
    if (status === 'active') {
      handleStepClick(
        undefined,
        undefined,
        undefined,
        get(['steps'], trailTourData, []).length > 3 ? 3 : 1,
      )
    }
  }
  const filteredTrailList = Array.isArray(trailList)
    ? trailList.filter(
        trail =>
          trail.trail_id !== Number(get(['trail_id'], trailTourData)),
      )
    : []

  const RenderCategories = useCallback(() => {
    const list = getAllCategory.filter(
      item =>
        !get(['categories_list'], doCategoryExistData, '')
          .split(',')
          .map(Number)
          .includes(item.trail_category_id),
    )

    const categoryL = [...categoryList, ...list].map(item => {
      return [item.trail_category_id, item]
    })

    const maparr = new Map(categoryL)

    const categoryData = [...maparr.values()]
      .slice(0, 3)
      .sort((a, b) => a.trail_category_id - b.trail_category_id)

    return (
      categoryData.length > 0 && (
        <Col lg={3} className="trailit_categories">
          <div className="trailit_14_500">
            Explore other categories
          </div>
          <hr className="trailit_white_hr" />
          <ul className="list-unstyled m-0">
            {categoryData.map(cat => (
              <li className="trailit_14_500 d-flex justify-content-between align-items-center">
                <span>{cat.trail_category_name}</span>

                <>
                  {getExistingCategoryArray().includes(
                    cat.trail_category_id,
                  ) ? (
                    <Button
                      variant="link"
                      onClick={() =>
                        handleCategory(
                          cat.trail_category_id,
                          'delete',
                        )
                      }
                    >
                      <img
                        alt="cat"
                        src={trailComment}
                        width={25}
                        height={25}
                      />
                    </Button>
                  ) : (
                    <Button
                      variant="link"
                      onClick={() =>
                        handleCategory(cat.trail_category_id, 'add')
                      }
                    >
                      <img
                        alt="cat"
                        src={trailPlus}
                        width={25}
                        height={25}
                      />{' '}
                    </Button>
                  )}
                </>
              </li>
            ))}
          </ul>
        </Col>
      )
    )
  }, [doCategoryExistData, getAllCategory, getExistingCategoryArray])

  if (!isLoading && !get(['trail_id'], trailTourData)) {
    return <PageNotFound />
  }

  const startViewTrail = () => {
    const tourDataSteps = get(['steps'], trailTourData, []).length
    const visitedSteps = get(['visitedSteps'], trailTourData, '')
    if (visitedSteps) {
      return tourDataSteps === visitedSteps.split(',').length
        ? 'View again'
        : 'Start trail'
    }
    return 'Start trail'
  }

  return (
    <>
      <ConfirmationModal
        content={confirmationData}
        header="Reminder"
        open={confirmationData}
        setOpen={setConfirmationData}
        onSuccess={() => setConfirmationData(null)}
        onCancel={() =>
          handleStepClick(
            undefined,
            undefined,
            undefined,
            get(['steps'], trailTourData, []).length > 3 ? 3 : 1,
          )
        }
        successText="Ok"
        cancelText="Continue on go.trailit.live"
      />
      <div className="trailit_top_section_bg_dark">
        <div className="container-fluid">
          <Row>
            <Col xl={8}>
              <Row className="align-items-center">
                <Col lg={8}>
                  <div className="text-white trailit_24_600 mb-2">
                    {get(['trail_name'], trailTourData, '')}
                  </div>
                  <div className="pb-2 d-flex align-items-center">
                    <Link
                      to={`/profile/${get(
                        ['userData', 'userName'],
                        trailTourData,
                      )}`}
                    >
                      <img
                        alt="userData"
                        className="rounded-circle"
                        width="44px"
                        src={
                          get(
                            ['userData', 'profileImage'],
                            trailTourData,
                          )
                            ? get(
                                ['userData', 'profileImage'],
                                trailTourData,
                              )
                            : userPng
                        }
                      />
                    </Link>
                    <span className="trailit_12_600 ml-2 text-white">
                      Created by{' '}
                      {`${get(
                        ['userData', 'firstName'],
                        trailTourData,
                        [],
                      )} ${get(
                        ['userData', 'lastName'],
                        trailTourData,
                        [],
                      )}`}
                      .{' '}
                      {get(['userData', '_id'], trailTourData) !==
                        user_id &&
                        isLoggedIn && (
                          <span
                            className="text-pink cursor-pointer"
                            onClick={() =>
                              dispatch(
                                updateFollowUser(
                                  get(
                                    ['userData', '_id'],
                                    trailTourData,
                                  ),
                                ),
                              )
                            }
                          >
                            {(getFollowUserData || []).length > 0
                              ? 'Following'
                              : ' Follow'}{' '}
                          </span>
                        )}
                      <span className="trailit_12_400 mobile_width100">
                        {moment(
                          get(['trail_created'], trailTourData, []),
                        ).format('DD MMM YYYY')}
                      </span>
                    </span>
                  </div>
                </Col>
                <Col lg={4} className="text-right">
                  <Button
                    disabled={
                      get(['steps'], trailTourData, []).length === 0
                    }
                    variant="pink"
                    type="submit"
                    className="py-2 px-4 btn-md"
                    onClick={() => {
                      if (
                        user_id &&
                        get(['userData', '_id'], trailTourData) !==
                          user_id &&
                        !get(['isFollowing'], trailTourData, true)
                      ) {
                        dispatch(
                          updateTrailFollow(
                            get(['trail_id'], trailTourData),
                          ),
                        )
                      }

                      validateLogin()
                    }}
                  >
                    {startViewTrail()}{' '}
                    {get(['visitedSteps'], trailTourData, '').split(
                      ',',
                    ).length > 1 &&
                      !(
                        get(['steps'], trailTourData, []).length ===
                        get(
                          ['visitedSteps'],
                          trailTourData,
                          '',
                        ).split(',').length
                      )}
                  </Button>
                  {get(['visitedSteps'], trailTourData, '').split('')
                    .length > 0 &&
                    !(
                      get(['steps'], trailTourData, []).length ===
                      get(['visitedSteps'], trailTourData, '').split(
                        ',',
                      ).length
                    ) && (
                      <Button
                        variant="pink"
                        type="submit"
                        className="py-2 px-4 ml-2 btn-md"
                        onClick={() =>
                          handleStepClick(
                            get(
                              ['steps'],
                              trailTourData,
                              [],
                            ).findIndex(
                              step =>
                                step.trail_data_id ===
                                Number(
                                  get(
                                    ['visitedSteps'],
                                    trailTourData,
                                    '',
                                  ).split(',')[
                                    get(
                                      ['visitedSteps'],
                                      trailTourData,
                                      '',
                                    ).split(',').length - 1
                                  ],
                                ),
                            ),
                            null,
                            true,
                          )
                        }
                      >
                        Continue
                      </Button>
                    )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xl={8}>
              {renderIntro()}

              <Row className="py-2 align-items-center">
                {/* <Col>
                  <div className="d-flex align-items-center mr-3">
                    <img
                      alt="twitter"
                      src={require("../../images/trailit_coin.png")}
                    />
                    <span className="ml-2 text-pink trailit_14_700">94</span>
                    <span className="ml-2 text-white trailit_14_500">
                      People liked this trail
                    </span>
                  </div>
                </Col> */}
                <Col>
                  <div className="bottom d-flex just">
                    <div className="text-white trailit_18_500 col m-auto cursor-pointer">
                      Category: {' '}
                      <a onClick={() =>
                        history.push(`/trails/filter?name=${get(['trail_category_name'], trailTourData)}&categoryId=${get(['trail_categor_id'], trailTourData)}&page=1&itemsPerPage=20`)
                      }>
                        {get(['trail_category_name'], trailTourData)}
                        </a>
                    </div>
                    <div className="col text-right">
                      {get(['userData', '_id'], trailTourData) !==
                        user_id &&
                        isLoggedIn && (
                          <Follow
                            className="trail_follow_button"
                            onClick={() => {
                              dispatch(
                                updateTrailFollow(
                                  get(['trail_id'], trailTourData),
                                ),
                              )
                            }}
                          />
                        )}
                        {get(['userData', '_id'], trailTourData) ===
                          user_id &&
                          isLoggedIn && get(['trail_user_status'], trailTourData) ===
                          'public' && (
                            <Button
                            variant="link"
                            onClick={e => {
                              e.preventDefault()
                              e.stopPropagation()
                              dispatch(
                                updateTrailTour(get(['trail_id'], trailTourData), {
                                  trail_user_status: 'private',
                                  trail_id: get(['trail_id'], trailTourData),
                                })
                              )
                            }}
                          >
                            <SVG alt="share" width="20px" height="20px" src={visibility} />
                          </Button>
                          )}
                        {get(['userData', '_id'], trailTourData) ===
                        user_id &&
                        isLoggedIn && get(['trail_user_status'], trailTourData) ===
                        'private' && (
                          <Button
                            variant="link"
                            onClick={e => {
                              e.preventDefault()
                              e.stopPropagation()
                              dispatch(
                                updateTrailTour(get(['trail_id'], trailTourData), {
                                  trail_user_status: 'public',
                                  trail_id: get(['trail_id'], trailTourData),
                                })
                              )
                            }}
                          >
                          <SVG alt="share" width="20px" height="20px" src={visibilityPrivate} />
                          </Button>
                        )}
                      <Button
                        variant="link"
                        onClick={() =>
                          copyStringToClipboard(
                            getTrailUrl(
                              get(['steps'], trailTourData, []),
                              get(['userData', '_id'], trailTourData),
                            ),
                          )
                        }
                      >
                        <SVG
                          alt="share"
                          width="25px"
                          height="25px"
                          src={trailItShare}
                        />
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl={4} className="trailit_vertical_slider_padding">
              <div className="trailit_18_600 text-white mb-2">
                {get(['steps'], trailTourData, []).length} Steps
              </div>

              <StepSlider
                settings={settings}
                steps={get(['steps'], trailTourData, [])}
                visitedSteps={get(['visitedSteps'], trailTourData, '')
                  .split(',')
                  .map(item => Number(item))}
                handleStepClick={handleStepClick}
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className="container-fluid py-lg-5 py-3">
        <div className="trailit_section2">
          <Row className="pt-3 mb-3">
            <Col lg={9}>
              <div className="trailit_20_600 mb-3">
                About this trail
              </div>
              <div className="trail_width_75p">
                <p className="pre-wrap">
                  {get(['trail_description'], trailTourData, '')}
                </p>
              </div>
            </Col>
            {isLoggedIn && <RenderCategories />}
          </Row>
        </div>
      </div>
      {filteredTrailList.length > 0 && (
        <div className="trialit_section_last_gray_bg ">
          <div className="container-fluid">
            <div className="trailit_slider">
              <Row className="pt-3 mb-3">
                <Col>
                  <div className="trailit_20_600">
                    Trails Created by{' '}
                    {`${get(
                      ['userData', 'firstName'],
                      trailTourData,
                      [],
                    )} ${get(
                      ['userData', 'lastName'],
                      trailTourData,
                      [],
                    )}`}
                  </div>
                </Col>
                {filteredTrailList.length > 4 && (
                  <Col className="text-right">
                    <Link
                      onClick={() =>
                        dispatch({type: 'CLEAR_TRAIL_LIST'})
                      }
                      className="trailit_16_400 link text-dark"
                      to={`/trails/filter?name=${`${get(
                        ['userData', 'firstName'],
                        trailTourData,
                      )}'s Trail`}&userId=${get(
                        ['userData', '_id'],
                        trailTourData,
                      )}&page=1&itemsPerPage=8`}
                    >
                      View all
                    </Link>
                  </Col>
                )}
              </Row>
              <CrousalSliderSmall
                afterChange={current => {
                  if (user_id) {
                    dispatch(
                      getTrailsList({
                        userId: get(
                          ['userData', '_id'],
                          trailTourData,
                        ),
                        page: Math.ceil(current / 8 + 1),
                        itemsPerPage: 8,
                      }),
                    )
                  } else {
                    dispatch(
                      getTrailsListPublic({
                        userId: get(
                          ['userData', '_id'],
                          trailTourData,
                        ),
                        page: Math.ceil(current / 8 + 1),
                        itemsPerPage: 8,
                      }),
                    )
                  }
                }}
                getTrailsListData={filteredTrailList}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default CreatorTrailDetails
