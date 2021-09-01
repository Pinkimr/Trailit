import React from 'react'
import {mount, configure} from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'

import NotificationCount from '../components/Widgets/NotificationCount'

configure({adapter: new Adapter()})
const props = {
  notificationList: [
    {flag: 'unread', notification: 'followed you'},
    {flag: 'unread', notification: 'followed you'},
    {flag: 'read', notification: 'followed you'},
    {flag: 'read', notification: 'followed you'},
  ],
}

describe('Notification Component', () => {
  it('Number of counts (unread notification)`', () => {
    const notification = mount(<NotificationCount {...props} />)

    expect(notification.find('span').text('')).toEqual('2')
  })
})
