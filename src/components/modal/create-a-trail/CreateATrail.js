/* eslint-disable global-require */
/* eslint-disable react/button-has-type */
import React, {useState} from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import BgImage from '../../../images/trailit_bx_img.png'
import UserImg from '../../Widgets/UserImg'
import trailItClose from '../../../images/trailit_close.svg'
import trailItAdd from '../../../images/trailit_addon_bg.png'
import trailItPlus from '../../../images/trailit_plus.png'
import trailItShare from '../../../images/trailit_share.png'
import trailItCoin from '../../../images/trailit_coin.png'

const CreateATrail = props => {
  const {createTrail, setCreateTrail} = props

  const [showStep, setShowStep] = useState(1)

  const preview = () => {
    setShowStep(2)
  }

  const back = () => {
    setShowStep(1)
  }

  // trailit_bx_img
  const styleBgImg = {
    background: `url(${BgImage}) no-repeat scroll center center / cover`,
  }

  return (
    <Modal
      show={createTrail}
      onHide={() => setCreateTrail(!createTrail)}
      centered
      className="trailit_CreateATrail_main"
    >
      <Modal.Body className="p-0 d-flex">
        <button className="close">
          <SVG alt="close" src={trailItClose} />
        </button>
        <div className="trailit_left">
          <img alt="user" width="" src={trailItAdd} />
        </div>
        {showStep === 1 && (
          <div className="trailit_right p-4">
            <Row>
              <Col md={12}>
                <div className="trailit_26_600 my-3">Create a Trail</div>
              </Col>
            </Row>
            <Form className="row">
              <Col md={6}>
                <Form.Group>
                  <Form.Control type="text" placeholder="Title" className="trailit_12_400" />
                </Form.Group>
                <Form.Group>
                  <Form.Control as="select" className="trailit_12_400">
                    <option>Category</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Control type="text" placeholder="Hashtags" className="trailit_12_400" />
                </Form.Group>
                <Form.Group>
                  <Form.Control as="select" className="trailit_12_400">
                    <option>Who can see the trail</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Control as="textarea" rows="4" placeholder="Description-150 words" className="trailit_12_400" />
                </Form.Group>
                <Form.Group className="trailit_file_upload">
                  <Form.Control type="file" placeholder="Drop Video/Image here" />
                  <label className="trailit_12_400 text-center w-100 m-0">Drop Video/Image here</label>
                </Form.Group>
              </Col>
              <Col className="text-right">
                <Button variant="pink" onClick={preview}>
                  Preview
                </Button>
              </Col>
            </Form>
          </div>
        )}
        {showStep === 2 && (
          <div className="trailit_right p-4">
            <div className="trailit_bx trailit_start_bx">
              <div className="img">
                <span className="img_bg" style={styleBgImg}>
                  <div className="trailit_img_content">
                    <div className="top">
                      <div className="d-flex justify-content-end">
                        <Button variant="link">
                          <img width="26px" alt="twitter" src={trailItPlus} />
                        </Button>
                        <Button variant="link">
                          <img width="20px" alt="twitter" src={trailItShare} />
                        </Button>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="d-flex justify-content-between">
                        <div className="trailit_14_500_roboto d-flex text-white align-items-center">
                          <UserImg style={{width: '44px', height: '44px'}} className="trialit_user" />
                          <span className="ml-2">Jon Jones</span>
                        </div>
                        <div className="trailit_12_500_roboto d-flex text-white align-items-center">
                          <img alt="twitter" src={trailItCoin} />
                          <span className="ml-2">94</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
              <div className="trailit_bx_title">
                <div className="click trailit_16_500 trailit_ellips_2line text-dark">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center pt-4">
              <Button variant="light" onClick={back}>
                Go back
              </Button>
              <Button variant="pink">Start Trail</Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}
export default CreateATrail
