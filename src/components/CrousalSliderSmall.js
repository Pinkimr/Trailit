import React, {useState} from 'react'
import {Col} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import Slider from 'react-slick'

import TrailBox from './TrailBox'

const CrousalSliderSmall = props => {
  const {getTrailsListData = [], afterChange, slideCount, moreDropdown} = props

  // details modal
  const [slideCounter, setSlideCounter] = useState(slideCount || 0)

  const updatedSettings = () => {
    const settings = {
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      afterChange: current => {
        if (!slideCount) {
          if (current / 8 > slideCounter && Math.ceil(current / 8) !== slideCounter) {
            setSlideCounter(Math.ceil(current / 8))
            afterChange(current)
          }
        } else {
          afterChange(current)
        }
      },

      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    }
    return settings
  }

  return (
    <Slider className="trail_slider" {...updatedSettings()}>
      {getTrailsListData.map((cat, index) => (
        <Col key={index}>
          <TrailBox cat={cat} moreDropdown={moreDropdown} />
        </Col>
      ))}
    </Slider>
  )
}
export default CrousalSliderSmall
