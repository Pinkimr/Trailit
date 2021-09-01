import React, {useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import UserImg from '../Widgets/UserImg'

const FollowerListModal = props => {
  const dispatch = useDispatch()
  const {followListModal, setFollowListModal} = props
  const {followListEachTrailData = []} = useSelector(state => state.trailReducer)

  useEffect(() => {
    return () => {
      dispatch({type: 'CLEAR_FOLLOWER_LIST'})
    }
  }, [])

  return (
    <Modal
      show={followListModal}
      onHide={() => {
        setFollowListModal(false)
      }}
      centered
    >
      <Modal.Header closeButton>Followers</Modal.Header>
      <Modal.Body>
        {' '}
        <div className="follower_list">
          {followListEachTrailData.map(item => {
            const follow = item.user
            return (
              <Link to={`/profile/${follow.userName}`}>
                <div key={follow._id} className="d-flex align-items-center grybx">
                  <UserImg className="mduserPic rounded-circle mr-3" img={follow.profileImage} />

                  <h5>{`${follow.firstName} ${follow.lastName}`}</h5>
                  <span>{moment(item.follow_date).fromNow()}</span>
                </div>
              </Link>
            )
          })}{' '}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default FollowerListModal
