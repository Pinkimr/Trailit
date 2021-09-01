import React, {useEffect, useState} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import SliderBgImage from '../../images/trailit_bx_img.png'
import Details from '../../components/details/Details'
import UserImg from '../../components/Widgets/UserImg'
import plusPink from '../../images/trailit_plus.png'
import shareImg from '../../images/trailit_share.png'
import trailCoin from '../../images/trailit_coin.png'

const addBodyClass = className => document.body.classList.add('Profile')
const removeBodyClass = className => document.body.classList.remove('Profile')

const Profile = className => {
  useEffect(() => {
    // Set up
    if (className instanceof Array) className.map(addBodyClass)
    else addBodyClass(className)

    // Clean up
    return () => {
      if (className instanceof Array) className.map(removeBodyClass)
      else removeBodyClass(className)
    }
  }, [className])

  const style = {
    background: `url(${SliderBgImage}) no-repeat scroll center center / cover`,
  }

  // details modal
  const [showDetails, setShowDetails] = useState(false)
  const handleShowDetails = () => setShowDetails(true)
  const handleCloseDetails = () => setShowDetails(false)

  return (
    <>
      {/* ------section start---------- */}
      <section className="trailit_section mt-3 pb-5">
        <div className="trailit_profile_hdr">
          <div className="container-fluid">
            <div className="trailit_slider">
              <Row className="align-items-center">
                <Col lg={5}>
                  <div className="d-flex align-items-center">
                    <UserImg className="trialit_userPic" />
                    <div>
                      <div className="trailit_24_600 mb-2">Jon Jones</div>
                      <div className="trailit_14_500">Founder, Creator, Designer</div>
                    </div>
                  </div>
                </Col>
                <Col lg={7}>
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="d-flex align-items-center text-center mr-5">
                      <div className="trailit_24_600 trailit_line_height_80">
                        1.45m
                        <br />
                        <span className="trailit_14_500 trailit_line_height_80">LIT</span>
                      </div>
                      <div className="trailit_24_600 trailit_line_height_80 px-3">
                        5.2k
                        <br />
                        <span className="trailit_14_500 trailit_line_height_80">Followers</span>
                      </div>
                      <div className="trailit_24_600 trailit_line_height_80">
                        120
                        <br />
                        <span className="trailit_14_500 trailit_line_height_80">Following</span>
                      </div>
                    </div>
                    <Button variant="pink" className="rounded-7">
                      Setting
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="trailit_slider">
            {/* ------row start---------- */}
            <Row>
              <Col md={12} className="mb-3">
                <div className="trailit_24_600">My Trails</div>
              </Col>
              <Col lg={3} md={6} className="mb-5">
                <div className="trailit_bx mb-4"> 
                  <div className="img">
                    <span className="img_bg" style={style}>
                      <div className="trailit_img_content">
                        <div className="top">
                          <div className="d-flex justify-content-end">
                            <Button variant="link">
                              <img width="26px" alt="twitter" src={plusPink} />
                            </Button>
                            <Button variant="link">
                              <img width="20px" alt="twitter" src={shareImg} />
                            </Button>
                          </div>
                        </div>
                        <div className="bottom">
                          <div className="d-flex justify-content-between">
                            <div className="trailit_14_500_roboto d-flex text-white align-items-center">
                              <UserImg className="trialit_userPic" />
                              <span className="ml-2">Jon Jones</span>
                            </div>
                            <div className="trailit_12_500_roboto d-flex text-white align-items-center">
                              <img alt="twitter" src={trailCoin} />
                              <span className="ml-2">94</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                  <div className="trailit_bx_title">
                    <div onClick={handleShowDetails} className="click trailit_16_500 trailit_ellips_2line text-dark">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Link to="/create-trail" className="btn-outline-black-small trailit_18_500">
                    Edit
                  </Link>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-5">
                <div className="trailit_bx mb-4">
                  <div className="img">
                    <span className="img_bg" style={style}>
                      <div className="trailit_img_content">
                        <div className="top">
                          <div className="d-flex justify-content-end">
                            <Button variant="link">
                              <img width="26px" alt="twitter" src={plusPink} />
                            </Button>
                            <Button variant="link">
                              <img width="20px" alt="twitter" src={shareImg} />
                            </Button>
                          </div>
                        </div>
                        <div className="bottom">
                          <div className="d-flex justify-content-between">
                            <div className="trailit_14_500_roboto d-flex text-white align-items-center">
                              <UserImg className="trialit_userPic" />
                              <span className="ml-2">Jon Jones</span>
                            </div>
                            <div className="trailit_12_500_roboto d-flex text-white align-items-center">
                              <img alt="twitter" src={trailCoin} />
                              <span className="ml-2">94</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                  <div className="trailit_bx_title">
                    <div onClick={handleShowDetails} className="click trailit_16_500 trailit_ellips_2line text-dark">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Link to="/create-trail" className="btn-outline-black-small trailit_18_500">
                    Edit
                  </Link>
                </div>
              </Col>
            </Row>
            {/* ------row end---------- */}
            {/* ------row start---------- */}
            <Row>
              <Col md={12} className="my-3">
                <div className="trailit_24_600">Followed Trails</div>
              </Col>
              <Col lg={3} md={6} className="mb-5">
                <div className="trailit_bx mb-4">
                  <div className="img">
                    <span className="img_bg" style={style}>
                      <div className="trailit_img_content">
                        <div className="top">
                          <div className="d-flex justify-content-end">
                            <Button variant="link">
                              <img width="26px" alt="twitter" src={plusPink} />
                            </Button>
                            <Button variant="link">
                              <img width="20px" alt="twitter" src={shareImg} />
                            </Button>
                          </div>
                        </div>
                        <div className="bottom">
                          <div className="d-flex justify-content-between">
                            <div className="trailit_14_500_roboto d-flex text-white align-items-center">
                              <UserImg className="trialit_userPic" />
                              <span className="ml-2">Jon Jones</span>
                            </div>
                            <div className="trailit_12_500_roboto d-flex text-white align-items-center">
                              <img alt="twitter" src={trailCoin} />
                              <span className="ml-2">94</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                  <div className="trailit_bx_title">
                    <div onClick={handleShowDetails} className="click trailit_16_500 trailit_ellips_2line text-dark">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Link to="/create-trail" className="btn-outline-black-small trailit_18_500">
                    Edit
                  </Link>
                </div>
              </Col>
              <Col lg={3} md={6} className="mb-5">
                <div className="trailit_bx mb-4">
                  <div className="img">
                    <span className="img_bg" style={style}>
                      <div className="trailit_img_content">
                        <div className="top">
                          <div className="d-flex justify-content-end">
                            <Button variant="link">
                              <img width="26px" alt="twitter" src={plusPink} />
                            </Button>
                            <Button variant="link">
                              <img width="20px" alt="twitter" src={shareImg} />
                            </Button>
                          </div>
                        </div>
                        <div className="bottom">
                          <div className="d-flex justify-content-between">
                            <div className="trailit_14_500_roboto d-flex text-white align-items-center">
                              <UserImg className="trialit_userPic" />
                              <span className="ml-2">Jon Jones</span>
                            </div>
                            <div className="trailit_12_500_roboto d-flex text-white align-items-center">
                              <img alt="twitter" src={trailCoin} />
                              <span className="ml-2">94</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                  <div className="trailit_bx_title">
                    <div onClick={handleShowDetails} className="click trailit_16_500 trailit_ellips_2line text-dark">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Link to="/create-trail" className="btn-outline-black-small trailit_18_500">
                    Edit
                  </Link>
                </div>
              </Col>
            </Row>
            {/* ------row end---------- */}
          </div>
        </div>
      </section>
      {/* ------section end---------- */}
      {showDetails && <Details handleCloseDetails={handleCloseDetails} />}
    </>
  )
}
export default Profile
