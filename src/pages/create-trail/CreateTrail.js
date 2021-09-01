/* eslint-disable global-require */
import React, {useEffect, useState} from 'react'
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import {Link} from 'react-router-dom'

const addBodyClass = className => document.body.classList.add('CreateTrail')
const removeBodyClass = className => document.body.classList.remove('CreateTrail')

const CreateTrail = className => {
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

  // edit trail step
  const [showStep, SetShowStep] = useState(1)

  const handleStep = e => SetShowStep(e, window.scroll(0, 0))

  return (
    <>
      {/* ------section start---------- */}
      <section className="trailit_section mt-xl-5">
        <Container>
          {showStep === 1 && (
            <div className="trailit_CreateTrailStep1 pt-md-5">
              <div className="trailit_24_500 text-center mb-3">First, let’s get you set up.</div>
              <div className="trailit_18_400 text-center">
                Pick a trail category to connect with a specific community.
              </div>
              <div className="trailit_18_400 text-center mb-4">You can always update this later.</div>
              <Form>
                <Form.Group className="pb-5">
                  <Form.Control as="select" className="trailit_18_400 trailit_height_42">
                    <option>Select your category</option>
                    <option>Art</option>
                    <option>Design</option>
                    <option>Illustration</option>
                  </Form.Control>
                </Form.Group>
                <hr />
                <div className="text-right pb-md-5 mb-md-5">
                  <Button variant="pink" className="px-5 trailit_18_400" onClick={e => handleStep(2)}>
                    Next
                  </Button>
                </div>
              </Form>
              <p className="pt-4 trailit_12_400 text-center">
                To create a trail, you're required to provide your location, age, national ID, banking and tax
                information, email, and mailing address. This information is necessary to prevent fraud, comply with the
                law.
              </p>
            </div>
          )}
          {showStep === 2 && (
            <div className="trailit_CreateTrailStep2 pt-md-5">
              <div className="trailit_24_500 text-center mb-3">Describe what you’ll be creating.</div>
              <div className="trailit_18_400 text-center mb-5">
                This will be the intro to your trail, don’t worry, you can edit this later, too.
              </div>
              <Form>
                <p className="trailit_12_700 mb-3">COVER IMAGE</p>
                <p className="trailit_12_500 mb-2">Choose a photo that represents your trail. Max 8MB.</p>
                <div className="trailit_uploadImage mb-4">
                  <Form.Control type="file" />
                  <label className="trailit_12_700 text-dark">Upload Image</label>
                </div>
                <Form.Group>
                  <Form.Control placeholder="Trail Title" className="trailit_24_700" />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    placeholder="Type Introduction here ..."
                    className="trailit_14_500"
                    rows="5"
                  />
                </Form.Group>
                <p className="trailit_12_700 mb-3">ADD MORE CONTENT</p>
                <div className="d-flex">
                  <div className="trailit_addMoreImage">
                    <Form.Control type="file" />
                    <img src={require('../../images/image.svg')} alt="upload" />
                    <div className="trailit_8_500">Image</div>
                  </div>
                  <div className="trailit_addMoreImage">
                    <Form.Control type="file" />
                    <img src={require('../../images/video.svg')} alt="upload" />
                    <div className="trailit_8_500">Video</div>
                  </div>
                  <Button variant="link" className="trailit_addMoreImage text-dark p-0">
                    <img src={require('../../images/link.svg')} alt="upload" />
                    <div className="trailit_8_500">Other</div>
                  </Button>
                </div>
                <Row className="align-items-end">
                  <Col md={6}>
                    <ul className="trailit_HashTagsList list-unstyled m-0 d-flex flex-wrap">
                      <li className="trailit_14_600">
                        Visual Arts <SVG src={require('../../images/close.svg')} alt="close" />
                      </li>
                      <li className="trailit_14_600">
                        Concept Arts <SVG src={require('../../images/close.svg')} alt="close" />
                      </li>
                    </ul>
                    <Form.Control placeholder="Hashtags" className="trailit_14_500" />
                  </Col>
                  <Col md={6}>
                    <div className="d-flex align-items-center justify-content-end">
                      <Form.Check label="Make this trail private" className="trailit_customCheckbox" />
                      <Button variant="link" className="trailit_deleteIcon">
                        <SVG src={require('../../images/delete.svg')} alt="delete" />
                      </Button>
                    </div>
                  </Col>
                </Row>
                <hr />
                <div className="d-flex justify-content-between">
                  <Button variant="gray" onClick={e => handleStep(1)}>
                    Back to caegory
                  </Button>
                  <Link to="/profile" className="btn btn-pink">
                    Get listed
                  </Link>
                </div>
              </Form>
            </div>
          )}
        </Container>
      </section>
      {/* ------section end---------- */}
    </>
  )
}
export default CreateTrail
