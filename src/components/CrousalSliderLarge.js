import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import Slider from 'react-slick'
import infoGraphic from '../images/trailit_infographic.png'

const CrousalSliderLarge = () => {
  const settings = {
    dots: true,
    arrows: true,
    fade: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <>
      <Slider {...settings}>
        <div className="slide_item">
          <Row>
            <Col lg={6}>
              <div className="slider_content">
                <p className="text-white trailit_36_600">Guides tell a story</p>
                <p className="text-white trailit_18_500 trailit_bnr_sun_title">
                  by bringing followers through a trail of websites with text, audio and video overlay commentaries.
                </p>
                <Button variant="pink" className="mt-3">
                  Watch now
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <img alt="slider images" className="w-100" src={infoGraphic} />
            </Col>
          </Row>
        </div>
        <div className="slide_item">
          <Row>
            <Col lg={6}>
              <div className="slider_content">
                <p className="text-white trailit_36_600">Guides tell a story</p>
                <p className="text-white trailit_18_500 trailit_bnr_sun_title">
                  by bringing followers through a trail of websites with text, audio and video overlay commentaries.
                </p>
                <Button variant="pink" className="mt-3">
                  Watch now
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <img alt="slider images" className="w-100" src={infoGraphic} />
            </Col>
          </Row>
        </div>
        <div className="slide_item">
          <Row>
            <Col lg={6}>
              <div className="slider_content">
                <p className="text-white trailit_36_600">Guides tell a story</p>
                <p className="text-white trailit_18_500 trailit_bnr_sun_title">
                  by bringing followers through a trail of websites with text, audio and video overlay commentaries.
                </p>
                <Button variant="pink" className="mt-3">
                  Watch now
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <img alt="slider images" className="w-100" src={infoGraphic} />
            </Col>
          </Row>
        </div>
      </Slider>
    </>
  )
}

export default CrousalSliderLarge
