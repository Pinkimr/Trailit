/* eslint-disable global-require */
import React, {useState} from 'react'
import {Modal, Row, Col, Button} from 'react-bootstrap'
import {Scrollbars} from 'react-custom-scrollbars'
import {Link} from 'react-router-dom'
import BgImage from '../../images/trailit_bx_img.png'
import UserImg from '../Widgets/UserImg'

const Details = props => {
  const [show] = useState(true)

  // trailit_bx_img
  const styleBgImg = {
    background: `url(${BgImage}) no-repeat scroll center center / cover`,
  }

  return (
    <>
      <Modal show={show} onHide={props.handleCloseDetails} centered size="xl" className="trailit_details">
        <Modal.Header closeButton>
          <div>
            <Link to="/user">
              } <UserImg style={{width: '44px', height: '44px'}} />
            </Link>
            <span className="trailit_12_600 ml-2">
              Created by Jon Jones . <span className="text-pink">Follow </span>
              <span className="trailit_12_400">April 20 2020</span>
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xl={9}>
              <div className="trailit_video_bx" style={styleBgImg}>
                {/* <video controls>
                <source src="movie.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
              </video> */}
                <div className="trailit_afterVideo">
                  <div className="pb-3">
                    <span>Thank you</span> for viewing this Trail!
                  </div>
                  <div>
                    <Button variant="link" className="trailit_blueLink">
                      Sign up
                    </Button>{' '}
                    for more updates
                  </div>
                </div>
                <Button variant="link" className="trailit_play_btn">
                  <img alt="play" width="" src={require('../../images/trailit_play_btn.png')} />
                </Button>
                <div className="bottom">
                  <div className="d-flex justify-content-end">
                    <Button variant="link">
                      <img alt="twitter" src={require('../../images/trailit_plus.png')} />
                    </Button>
                    <Button variant="link">
                      <img alt="twitter" src={require('../../images/trailit_share.png')} />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="py-3 d-flex justify-content-between">
                <Link to="/creator-profile">
                  <Button variant="outline-black" className="trailit_14_500">
                    Visit Creator
                  </Button>
                </Link>
                <Button variant="pink" className="trailit_14_500">
                  Trait it
                </Button>
                <Button variant="pink" className="trailit_14_500">
                  Follow Trail
                </Button>
              </div>
              <div className="trailit_24_600 trailit_ellips_2line ">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries,
              </div>
              <div className="pt-3 pb-1 trailit_14_400">Introduction....</div>
              <div className="trailit_14_400 trailit_ellips_2line mb-3">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam ipsum dolor sit amet
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
              </div>
            </Col>
            <Col xl={3}>
              <div className="trailit_gray_box mb-4">
                <div className="d-flex align-items-center">
                  <div className="trailit_12_500_roboto d-flex align-items-center mr-3">
                    <img alt="twitter" src={require('../../images/trailit_coin.png')} />
                    <span className="ml-2">94</span>
                  </div>
                  <div className="trailit_12_500_roboto d-flex align-items-center">
                    <img alt="twitter" src={require('../../images/trailit_message_icon.png')} />
                    <span className="ml-2">35</span>
                  </div>
                </div>
                <hr className="trailit_black_hr" />
                <Scrollbars style={{width: '100%', height: 270}}>
                  <div className="trialit_comment_bx">
                    <div className="d-flex align-items-top pb-2">
                      <div className="trailit_img">
                        <img alt="user" src={require('../../images/1.png')} />
                      </div>
                      <div className="pl-2">
                        <div className="trailit_13_600 text-pink py-2">Josh TK</div>
                        <div className="trailit_11_400">Love it~</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-top pb-2">
                      <div className="trailit_img">
                        <img alt="user" src={require('../../images/2.png')} />
                      </div>
                      <div className="pl-2">
                        <div className="trailit_13_600 text-pink py-2">Shinny Lee</div>
                        <div className="trailit_11_400">
                          From an absolute beginners standpoint, I found this vid extremely easy to follow and very
                          helpful indeed.{' '}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-top pb-2">
                      <div className="trailit_img">
                        <img alt="user" src={require('../../images/1.png')} />
                      </div>
                      <div className="pl-2">
                        <div className="trailit_13_600 text-pink py-2">Josh TK</div>
                        <div className="trailit_11_400">Love it~</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-top pb-2">
                      <div className="trailit_img">
                        <img alt="user" src={require('../../images/1.png')} />
                      </div>
                      <div className="pl-2">
                        <div className="trailit_13_600 text-pink py-2">Josh TK</div>
                        <div className="trailit_11_400">Love it~</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-top pb-2">
                      <div className="trailit_img">
                        <img alt="user" src={require('../../images/2.png')} />
                      </div>
                      <div className="pl-2">
                        <div className="trailit_13_600 text-pink py-2">Shinny Lee</div>
                        <div className="trailit_11_400">
                          From an absolute beginners standpoint, I found this vid extremely easy to follow and very
                          helpful indeed.{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </Scrollbars>
                <input type="text" placeholder="Leave a comment..." className="trialit_comment_input" />
              </div>
              <div className="trailit_14_500">Related Topics</div>
              <hr className="trailit_black_hr" />
              <ul className="list-unstyled m-0">
                <li className="trailit_14_500 d-flex justify-content-between align-items-center">
                  <span>Art</span>
                  <Button variant="link">
                    <img alt="twitter" src={require('../../images/trailit_checkmark_pink.png')} />
                  </Button>
                </li>
                <li className="trailit_14_500 d-flex justify-content-between align-items-center">
                  <span>Design</span>
                  <Button variant="link">
                    <img alt="twitter" src={require('../../images/trailit_plus_pink.png')} />
                  </Button>
                </li>
                <li className="trailit_14_500 d-flex justify-content-between align-items-center">
                  <span>Illustration</span>
                  <Button variant="link">
                    <img alt="twitter" src={require('../../images/trailit_plus_pink.png')} />
                  </Button>
                </li>
              </ul>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Details
