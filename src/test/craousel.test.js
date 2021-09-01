import React from 'react'
import {mount, configure} from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import CrousalSliderSmall from '../components/CrousalSliderSmall'

configure({adapter: new Adapter()})

const props = {
  getTrailsListData: [],
  afterChange: () => {},
  slideCount: 0,
  moreDropdown: false,
}

describe('Craousel Test', () => {
  it('Number of trail cards is Equal to number of trail tours ', () => {
    const slider = mount(<CrousalSliderSmall {...props} />)
    slider.find('.trailit_bx').forEach(trail => {
      expect(trail.hasClass('trailit_bx')).toEqual(true)
    })
  })
})
