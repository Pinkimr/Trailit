/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable camelcase */
import React, {useEffect, useState, useContext, useRef} from 'react'
import {Col, Dropdown, Navbar, Nav} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {Scrollbars} from 'react-custom-scrollbars'

import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import CreateATrail from '../modal/create-a-trail/CreateATrail'
import {GlobalContext} from '../../context/globalContext'
import {LOGOUT, UPDATE_NOTIFICATION_LIST, UPDATE_NOTIFICATION_LIVE} from '../../action/reducer.types'
import {clearNotification, getAllNotification, searchBy, updateNotification} from '../../action/user.action'
import {useDebounce} from '../../hooks/userDebounce'
import {get, getQueryStringObj} from '../../Utils/AppUtill'
import io from '../../socket'
import NotificationCount from '../Widgets/NotificationCount'
import UserImg from '../Widgets/UserImg'
import {NearContext} from '../../context/nearContext'
import {logoutFromWebapp} from '../../action/auth.action'
import {chromeSendMessage} from '../../Utils/extension-connection'
import notificationPink from '../../images/trailit_notification_pink.png'
import userImg from '../../images/user.png'
import trailBxBg from '../../images/trailit_bx_img.png'
import logo from '../../images/trailit_logo.png'
import searchPink from '../../images/trailit_search_pink.png'
import moreDots from '../../images/trailit_dots.svg'

const Header = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {wallet, toggleNearData} = useContext(NearContext)
  const {setUserInfo, setUserToken, setIsLoggedIn, setExtStatus, setSignInModal, isLoggedIn} = useContext(GlobalContext)
  const {userData: {_id: user_id, profileImage} = {}, appToken} = useContext(GlobalContext)
  // Login

  const {searchData = {}, notificationList = []} = useSelector(state => state.userReducer)
  const {successLabels = []} = useSelector(state => state.apiReducer)
  const {accessDenied} = useSelector(state => state.apiReducer)
  const myRef = React.useRef(null);
  const [createTrail, setCreateTrail] = useState(false)
  const [searchText, setSearchText] = React.useState('')
  const [navExpanded, setNavExpanded] = React.useState(false)
  const debouncedSearchTerm = useDebounce(searchText, 800)

  const queryObj = getQueryStringObj()

  const clearSearch = () => {
    dispatch({type: 'CLEAR_SEARCH_DATA'})
  }

  const logout = () => {
    dispatch(logoutFromWebapp())
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logoutNear = () => {
    wallet.signOut()
    toggleNearData()
  }

  const handleScroll = () => {
    const scrollPosition = Math.round(window.scrollY)
    if (scrollPosition > 40) {
      document.querySelector('header').classList.add('sticky')
    } else {
      document.querySelector('header').classList.remove('sticky')
    }
  }

  const handleNavBarType = type => {
    if (type === 'categories') {
      if (history.location.pathname === '/categories') {
        return 'active'
      }
    }
    if (type === 'recommended') {
      if (history.location.pathname === '/') {
        return 'active'
      }
    }
    if (type === 'filter') {
      if (history.location.pathname === '/trails/filter') {
        if (Object.values(queryObj).includes('following')) {
          return 'active'
        }
      }
    }
    if(type==='mytrails') {
      if(history.location.pathname ==='/trails/filter' && Object.values(queryObj).includes('My Trails')){
        return 'active'
      }
    }
  }

  const handleClick = (type, data) => {
    clearSearch()
    setSearchText('')
    
    if (type === 'Users') {
      history.push(`/profile/${data.userName}`)
    }
    if (type === 'Categories') {
      history.push(
        `/trails/filter?name=${data.trail_category_name}&categoryId=${data.trail_category_id}&page=1&itemsPerPage=12`
      )
    }
    if (type === 'Trails') {
      history.push(`/trail/${data.trail_name_slug}`)
    }
  }

  const handleNotificationView = (data, index) => {
    if (data.type === 'userFollow' || data.type === 'trailFollow') {
      let noti_class = 'trailit_notiItem'
      if (data.flag === 'unread') {
        noti_class = 'trailit_notiItem_unread'
      }
      return (
        <Dropdown.Item
          key={`notification${index}`}
          className={`d-flex align-items-center ${noti_class}`}
          onClick={() => {
            history.push(`/profile/${get(['creator_data', 'userName'], data)}`)
            dispatch({
              type: UPDATE_NOTIFICATION_LIVE,
              payload: get(['trail_notification_id'], data),
            })
            dispatch(
              updateNotification({
                notification_id: get(['trail_notification_id'], data),
                user_id: data.user_id,
                flag: 'read',
              })
            )
          }}
        >
          <div className="trailit_notiItem_first">
            <img alt="user" width="" src={get(['creator_data', 'profileImage'], data, userImg)} />
          </div>
          <div className="trailit_notiItem_middle">
            <div className="trailit_16_400 text-wrap pb-2 trailit_ellips_2line">
              <span className="trailit_16_600">
                {`${get(['creator_data', 'firstName'], data)} ${get(['creator_data', 'lastName'], data)}`}
              </span>{' '}
              {get(['notification'], data)}
            </div>
            <div className="trailit_12_500 text-blue">{moment(get(['created'], data)).fromNow()}</div>
          </div>
          {/* <div className="trailit_notiItem_last">
                                <Button
                                  variant="pink"
                                  className="btn-sm px-2 py-1 rounded-7"
                                >
                                  Follow
                                </Button>
                              </div> */}
        </Dropdown.Item>
      )
    }
  }

  const getSearchView = (type, result, i) => {
    if (type === 'Users') {
      return (
        <Dropdown.Item
          className="d-flex align-items-center trailit_notiItem"
          onClick={() => handleClick(type, result)}
          key={`user${i}`}
        >
          <div className="trailit_notiItem_first">
            <UserImg img={get(['profileImage'], result)} style={{width: '44px', height: '44px'}} />
          </div>
          <div className="trailit_notiItem_middle">
            <div className="trailit_16_400 text-wrap trailit_ellips_2line">
              <span className="trailit_16_600">
                {`${get(['firstName'], result, '')} ${get(['lastName'], result, '')}`}
              </span>{' '}
            </div>
          </div>
        </Dropdown.Item>
      )
    }
    if (type === 'Categories') {
      return (
        <Dropdown.Item
          className="d-flex align-items-center trailit_notiItem"
          onClick={() => handleClick(type, result)}
          key={`category${i}`}
        >
          <div className="trailit_notiItem_first">
            <UserImg text={get(['trail_category_name'], result, '')} style={{width: '44px', height: '44px'}} />
          </div>
          <div className="trailit_notiItem_middle">
            <div className="trailit_16_400 text-wrap trailit_ellips_2line">
              <span className="trailit_16_600">{`${get(['trail_category_name'], result, '')}`}</span>{' '}
            </div>
          </div>
        </Dropdown.Item>
      )
    }
    if (type === 'Trails') {
      return (
        <Dropdown.Item
          className="d-flex align-items-center trailit_notiItem"
          onClick={() => handleClick(type, result)}
          key={`trail${i}`}
        >
          <div className="trailit_notiItem_first">
            <UserImg img={get(['cover_image_url'], result) || trailBxBg} style={{width: '44px', height: '44px'}} />
          </div>
          <div className="trailit_notiItem_middle">
            <div className="trailit_16_400 text-wrap trailit_ellips_2line">
              <span className="trailit_16_600">{`${get(['trail_name'], result, '')}`}</span>{' '}
            </div>
          </div>
        </Dropdown.Item>
      )
    }
  }

  useEffect(() => {
    if (accessDenied) {
      logoutNear()
      setUserInfo({})
      setUserToken('')
      setExtStatus('inactive')
      window.localStorage.clear()
      setIsLoggedIn(false)
      history.push('/')
    }
  }, [accessDenied, history, logoutNear, setExtStatus, setIsLoggedIn, setUserInfo, setUserToken])

  useEffect(() => {
    if (successLabels.includes(LOGOUT)) {
      setUserInfo({})
      setUserToken('')
      setExtStatus('inactive')
      chromeSendMessage(
        {
          message: 'init',
          type: 'STATUS',
        },
        response => {
          if (response) {
            // if (response.userId === get(["user", "_id"], loginData)) {
            //   window.localStorage.setItem("extension_status", "active");
            // } else {
            //   window.localStorage.setItem("extension_status", "different_user");
            // }
            chromeSendMessage(
              {
                type: 'WEB_LOGIN',
                action: 'LOGOUT_FROM_WEB',
              },
              response => {}
            )
          } else {
            window.localStorage.setItem('extension_status', 'inactive')
          }
        }
      )
      logoutNear()
    }
  }, [history, logoutNear, setExtStatus, setUserInfo, setUserToken, successLabels])
  
  useEffect(() => {
    
    if(searchText === '') {
      clearSearch()
      setSearchText('')
    }

    if (debouncedSearchTerm !== null) {
      dispatch(searchBy(debouncedSearchTerm))
    }
  }, [debouncedSearchTerm, dispatch])

  useEffect(() => {
    if (user_id) {
      dispatch(getAllNotification())
    }
    window.addEventListener('scroll', handleScroll)
  }, [dispatch, user_id])

  useEffect(() => {
    io.emit('join_rooms', user_id)

    return () => {}
  }, [user_id])

  useEffect(() => {
    io.on('notification', msg => {
      dispatch({type: UPDATE_NOTIFICATION_LIST, payload: msg[0]})
    })

    return () => io.off('notification')
  }, [dispatch, user_id])

  useEffect(() => {
    if (
      (['#signup', '#signin', '#signin-to-continue'].includes(history.location.hash) || queryObj.resetPwd) &&
      !isLoggedIn
    ) {
      setSignInModal(true)
    }
  }, [history, queryObj.resetPwd, setSignInModal, isLoggedIn])

  function handleClickOutside(e) {
      if(myRef && myRef.current){
          const ref = myRef.current
          if(!ref.contains(e.target)){
            setNavExpanded(false);
          }
      }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      {!isLoggedIn && (
        <header className="fixed-top as_header">
          <div className="container-fluid">
            <Navbar expand="lg"  expanded={navExpanded} >
              <Link to="/" className="navbar-brand">
                <img className="trailit_logo" src={logo} alt="Trailit Logo" />
              </Link>
              <div ref={myRef} className="hdrDiv">
              <Navbar.Toggle aria-controls="basic-navbar-nav"  onClick={() => setNavExpanded(navExpanded ? false : 'expanded')}/>
              <Navbar.Collapse id="basic-navbar-nav" className="trailit_menu_row">
                <Nav className="mr-auto" onSelect={(e) => setNavExpanded(false)}>
                  <ul className="trailit_menu list-unstyled m-0">
                    <li className="mx-3">
                      <Dropdown>
                        <Dropdown.Toggle variant="link" className="p-0">
                          Explore
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                    <li  onClick={()=> setNavExpanded(false)}>
                      <Link to="" className="trailit_14_500 white-text">
                        What we do
                      </Link>
                    </li>
                  </ul>
                  <Col className="text-right for_algn">
                    <ul className="list-unstyled m-0 d-flex justify-content-end align-items-center">
                      {/* <li className="trailit_14_500 white-text mr-3">
                        Call to action
                      </li> */}
                      {!appToken && (
                        <li>
                          <div
                            onClick={() => {
                              setSignInModal(true)
                              setNavExpanded(false)
                            }}
                            className="click trailit_14_500 white-text trailit_login_btn"
                          >
                            Login
                          </div>
                        </li>
                      )}
                    </ul>
                  </Col>
                </Nav>
              </Navbar.Collapse>
              </div>
            </Navbar>
          </div>
        </header>
      )}
      {isLoggedIn && (
        <header className="fixed-top">
          {}
          <div>
            <Navbar expand="lg" className="lgn_hdr" expanded={navExpanded} >
              {/* <div className="d-flex justify-content-between align-items-center"> */}
              <Link to="/" className="navbar-brand">
                <img className="trailit_logo" src={logo} alt="Trailit Logo" />
              </Link>
              <div ref={myRef} className="hdrDiv">
                <Navbar.Toggle aria-controls="basic-navbar-nav_v2" onClick={() => setNavExpanded(navExpanded ? false : 'expanded')}/>
                <Navbar.Collapse
                  id="basic-navbar-nav_v2"
                  className="trailit_menu_row justify-content-between align-items-center nvbr_v2"
                  
                >
                  <Nav className="align-items-center" onSelect={(e) => setNavExpanded(false)}>
                    {history.location.pathname !== '/setup' && (
                      <ul className="trailit_dash_menu list-unstyled m-0">
                        <li
                          className={handleNavBarType('categories')}
                          onClick={() => {
                            setNavExpanded(false);
                            history.push(`/categories`)
                          }}
                        >
                          <div className="trailit_18_500">Categories</div>
                        </li>
                        <li
                          className={handleNavBarType('recommended')}
                          onClick={() => {
                            setNavExpanded(false);
                            history.push(`/`)
                          }}
                        >
                          <div className="trailit_18_500">Recommended</div>
                        </li>
                        {/* <li className={handleNavBarType()}>
                        <div className="trailit_18_500">Recommended</div>
                      </li> */}
                        <li
                          className={handleNavBarType('filter')}
                          onClick={() => {
                            // dispatch({ type: "CLEAR_TRAIL_LIST" });
                            setNavExpanded(false);
                            history.push(`/trails/filter?name=Following&type=following&page=1&itemsPerPage=20`)
                          }}
                        >
                          <div className="trailit_18_500">Following</div>
                        </li>
                        <li
                          className={handleNavBarType('mytrails')}
                          onClick={() => {
                            setNavExpanded(false);
                            history.push(`/trails/filter?name=My+Trails&userId=${user_id}&trailStatus=all&page=1&itemsPerPage=20`)
                         }}  
                        >
                          <div className="trailit_18_500">My Trails</div>
                        </li>
                      </ul>
                    )}
                    <ul className="trailit_menu list-unstyled m-0 ml-auto">
                      <li className="mr-3 trialit_search_bx_main">
                        <Dropdown alignRight className="toggle_remove">
                          <Dropdown.Toggle variant="link" className="p-0">
                            <button type="button" className="trialit_plain_btn">
                              <img alt="user" width="" src={searchPink} />
                            </button>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="trialit_search_bx trailit_notification">
                            <div>
                              <div className="d-flex" style={{marginBottom: 15}}>
                                <input
                                  type="text"
                                  autoFocus
                                  placeholder="Search by user, category, trail"
                                  value={searchText}
                                  onChange={e => setSearchText(e.target.value)}
                                />
                              </div>
                              <Scrollbars
                                style={{width: '100%'}}
                                autoHeight
                                autoHeightMax={500}
                              >
                                {Object.keys(searchData).map((cat, index) => (
                                  <>
                                    <div className="trailit_18_500 pb-2 pt-2 px-2 searchTitle" key={index}>
                                      {cat}
                                    </div>
                                    {searchData[cat].map((result, i) => getSearchView(cat, result, i))}
                                  </>
                                ))}
                               {searchText.length > 0 &&  Object.keys(searchData).length === 0 && <div className="trailit_18_500 pb-2 px-2"> No Data Found </div>}
                              </Scrollbars>
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                      <li className="mr-3">
                        <Dropdown alignRight className="toggle_remove">
                          <Dropdown.Toggle variant="link" className="p-0">
                            <NotificationCount notificationList={notificationList} />
                            <img alt="user" width="" src={notificationPink} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="trailit_notification">
                            <div className="d-flex align-items-center justify-content-between px-2 py-3">
                              <div className="trailit_20_600">Notifications</div>
                              <Dropdown alignRight className="toggle_remove trailit_notiDropdown">
                                <Dropdown.Toggle variant="link" className="p-0">
                                  <img alt="user" width="" src={moreDots} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => dispatch(clearNotification())}>Clear All</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <Scrollbars
                              style={{width: '100%'}}
                              autoHeight
                              autoHeightMin={(notificationList || []).length > 2 ? 300 : 0}
                            >
                              {/* <div className="trailit_18_500 py-2 px-2">
                                Earlier
                              </div> */}
                              {(notificationList || []).map((list, i) => handleNotificationView(list, i))}
                            </Scrollbars>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                      <li className="mr-3">
                        <Dropdown alignRight className="toggle_remove">
                          <Dropdown.Toggle variant="link" className="p-0">
                            <UserImg img={profileImage} style={{width: '44px', height: '44px'}} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => {history.push(`/profile`)
                             setNavExpanded(false)}}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() => {history.push(`/settings`)
                             setNavExpanded(false)}}>Settings</Dropdown.Item>
                            <Dropdown.Item onClick={() => {logout()
                              setNavExpanded(false)}}>Logout</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </Nav>
              </Navbar.Collapse>
              </div>
            </Navbar>
          </div>
        </header>
      )}
      {/* <Addon /> */}
      {createTrail && <CreateATrail createTrail={createTrail} setCreateTrail={setCreateTrail} />}
    </>
  )
}

export default Header
