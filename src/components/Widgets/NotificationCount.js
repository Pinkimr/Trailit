import React from 'react'

const NotificationCount = props => {
  const {notificationList} = props

  const counts = (notificationList || []).filter(not => not.flag === 'unread').length

  if (counts) {
    return <span className="n_counts">{counts}</span>
  }
  return ''
}

export default NotificationCount
