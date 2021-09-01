/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {useContext} from 'react'
import {Button} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import Slider from 'react-slick'
import {GlobalContext} from '../context/globalContext'
import video1 from '../images/video1.svg'
import volume1 from '../images/volume1.svg'
import text1 from '../images/text1.svg'
import image1 from '../images/image1.svg'

const StepSlider = props => {
  const {steps, settings, visitedSteps, handleStepClick} = props
  const {userData: {_id: userId} = {}} = useContext(GlobalContext)

  const getIcon = type => {
    if (type === 'video') {
      return video1
    }
    if (type === 'audio') {
      return volume1
    }
    if (type === 'text') {
      return text1
    }
    if (type === 'image') {
      return image1
    }
  }
  const handleDisabled = (list = [], index) => {
    if (!userId) {
      return list.length > 3 ? index > 2 : list.length === 2 || list.length === 3 ? index > 0 : false
    }
    return false
  }

  return (
    <Slider className="trailit_verticle_slider frmx_hgt" {...settings}>
      {steps.map((step, i) => (
        <div
          className="py-1"
          onClick={() => (handleDisabled(steps, i) ? () => {} : handleStepClick(i, step.trail_data_id, true))}
        >
          <div
            className={`trailit_gray_bx d-flex align-items-center justify-content-between py-1 ${
              handleDisabled(steps, i) ? 'stepDisabled' : ''
            }`}
            style={{
              background: visitedSteps.includes(step.trail_data_id)
                ? 'linear-gradient(to right, #fda517 0%, #d51e5e 100%)'
                : '',
            }}
          >
            <Button variant="link" className="p-0">
              <SVG alt="twitter" width={20} height={20} src={getIcon(step.media_type)} />
            </Button>
            <div className="name trailit_ellips trailit_14_500 text-white">{step.title}</div>
            {/* <div className="trailit_16_500 text-white">2:12</div> */}
          </div>
        </div>
      ))}
    </Slider>
  )
}
export default StepSlider
