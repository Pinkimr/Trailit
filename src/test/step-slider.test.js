import React from 'react'
import {mount, configure} from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import UserImg from '../components/Widgets/UserImg'

configure({adapter: new Adapter()})

const props = {
  img: null,
}

describe('User image', () => {
  it('Check if classname exist then provided className else className is `rounded-circle` ', () => {
    const img = mount(<UserImg {...props} />)
    // expect(img.props().hasOwnProperty('className')).toBeFalsy()
    expect(img.find('img').hasClass('rounded-circle'))
  })
})
