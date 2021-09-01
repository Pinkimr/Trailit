import React, {useState} from 'react'
import {Modal, Button} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import trailItClose from '../../../images/trailit_close.svg'
import trailItAdd from '../../../images/trailit_addon_bg.png'

const Addon = props => {
  const [show] = useState(true)

  return (
    <>
      <Modal show={show} onHide={props.handleCloseLogin} centered className="trailit_addon_main">
        <Modal.Body className="p-0 d-flex">
          <button type="button" className="close">
            <SVG alt="close" src={trailItClose} />
          </button>
          <div className="trailit_left">
            <img alt="user" width="" src={trailItAdd} />
          </div>
          <div className="trailit_right d-flex justify-content-center align-items-center">
            <div>
              <div className="trailit_26_600 mb-3">Create a Trail</div>
              <div className="trailit_18_500 mb-4">
                Please download the
                <br />
                browser add-on
                <br />
                to Creat trails.
              </div>
              <Button variant="pink">Download</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default Addon
