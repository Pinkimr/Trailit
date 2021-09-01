/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useRef, useState} from 'react'
import {Button, Tabs, Tab} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getFollowListForEachUser, updateFollowUser} from '../../action/user.action'
import {CLEAR_GET_FOLLOW_LIST_EACH_USER, UPDATE_FOLLOW_USER} from '../../action/reducer.types'
import {useDebounce} from '../../hooks/userDebounce'
import UserImg from '../Widgets/UserImg'
import {GlobalContext} from '../../context/globalContext'

const Follow = props => {
  const {modalKey, setModalKey, userId, handleClose} = props
  const {userData: {_id: loggedInId} = {}} = useContext(GlobalContext)
  const [searchText, setSearchText] = useState('')
  const [currentParams, setCurrentParams] = useState({
    page: 1,
    itemsPerPage: 10,
    type: modalKey,
  })
  const debouncedSearchTerm = useDebounce(searchText, 500)
  // tracking on which page we currently are
  // add loader refrence
  const loader = useRef(null)
  const loader1 = useRef(null)

  const {getFollowListForEachUserData = []} = useSelector(state => state.userReducer)
 
  const dispatch = useDispatch()

  const handleObserver = entities => {
    const target = entities[0]
    if (target.isIntersecting) {
      setCurrentParams(currentParams => ({
        ...currentParams,
        page: currentParams.page + 1,
      }))
    }
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    }
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
    if (loader1.current) {
      observer.observe(loader.current)
    }
  }, [])

  useEffect(() => {
    dispatch({type: CLEAR_GET_FOLLOW_LIST_EACH_USER})
    const data = {
      type: modalKey,
      profile_id: userId,

      ...currentParams,
    }

    dispatch(getFollowListForEachUser(data))
  }, [currentParams.type, currentParams.page,currentParams.text, dispatch])

  useEffect(() => {
    if (debouncedSearchTerm !== null) {
      // console.log('xxxxx', debouncedSearchTerm)
      setCurrentParams({
        ...currentParams,
        text: debouncedSearchTerm,
        page: 1,
      })
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    // here we simulate adding new posts to List
    setCurrentParams({
      ...currentParams,
      page: 1,
      type: modalKey,
    })
  }, [modalKey])

  return (
    <Tabs
      id="SocialTabs"
      className="scl_tabs"
      activeKey={modalKey}
      onSelect={k => {
        setSearchText('')
        setModalKey(k)
      }}
    >
      <Tab eventKey="followed" title="Followers">
        <div className="media_info">
          <input
            type="search"
            className="form-control mb-2"
            placeholder="Search"
            value={searchText}
            onChange={e => setSearchText(e.target.value)} 
          />
          {getFollowListForEachUserData.map(follow => (
            <div key={follow._id}>
              <Link to={`/profile/${follow.userName}`}>
                <div key={follow._id} className="d-flex align-items-center mb-3 grybx" onClick={handleClose}>
                  <UserImg className="mduserPic rounded-circle mr-3" img={follow.profileImage} />

                  <h5>{`${follow.firstName} ${follow.lastName}`}</h5>

                  {loggedInId !== follow._id && (
                    <Button
                      className="btn ml-auto"
                      onClick={event => {
                        event.preventDefault()
                        event.stopPropagation()
                        dispatch(updateFollowUser(follow._id))
                      }}
                    >
                      {follow.isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                  )}
                </div>
              </Link>
            </div>
          ))}
          <div ref={loader} />
        </div>
      </Tab>
      <Tab eventKey="follower" title="Following">
        <div className="media_info">
          <input
            type="search"
            className="form-control mb-2"
            placeholder="Search"
            value={searchText}  
            onChange={e => setSearchText(e.target.value)}
          />
          {getFollowListForEachUserData.map(follow => (
            <div key={follow._id}>
              <Link to={`/profile/${follow.userName}`}>
                <div className="d-flex align-items-center mb-3 grybx" onClick={handleClose}>
                  <UserImg className="mduserPic rounded-circle mr-3" img={follow.profileImage} />
                  <h5>{`${follow.firstName} ${follow.lastName}`}</h5>

                  {loggedInId !== follow._id && (
                    <Button
                      className="btn ml-auto"
                      onClick={event => {
                        event.preventDefault()
                        event.stopPropagation()
                        dispatch(updateFollowUser(follow._id))
                      }}
                    >
                      {follow.isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                  )}
                </div>
              </Link>
            </div>
          ))}
          <div ref={loader1} />
        </div>
      </Tab>
    </Tabs>
  )
}

export default Follow
