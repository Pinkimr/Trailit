import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import whiteLogo from '../../images/trailit_logo_white.png'
import trailitFb from '../../images/trailit_fb.png'
import trailitTwitter from '../../images/trailit_twister.png'
import trailItIg from '../../images/trailit_ig.png'

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container-fluid">
          {/* <Row className="trailit_menu">
          <Col md={6} lg={4} xl={3}>
            <h4>Company</h4>
            <ul className="list-unstyled">
              <li><Link to="">About</Link></li>
              <li><Link to="">Careers</Link></li>
              <li><Link to="">Press</Link></li>
              <li><Link to="">Blog</Link></li>
              <li><Link to="">Affiliates</Link></li>
            </ul>
          </Col>
          <Col md={6} lg={4} xl={3}>
            <h4>Community</h4>
            <ul className="list-unstyled">
              <li><Link to="">Go Premium</Link></li>
              <li><Link to="">Team Plans</Link></li>
              <li><Link to="">Refer a Friend</Link></li>
              <li><Link to="">Gift Cards</Link></li>
              <li><Link to="">Scholarships</Link></li>
              <li><Link to="">Free Classes</Link></li>
            </ul>
          </Col>
          <Col md={6} lg={4} xl={3}>
            <h4>Teaching</h4>
            <ul className="list-unstyled">
              <li><Link to="">Become a Conten Creator</Link></li>
              <li><Link to="">Creator Academy</Link></li>
              <li><Link to="">Conten Creator Handbook</Link></li>
              <li><Link to="">Partnerships</Link></li>
            </ul>
          </Col>
        </Row> */}
          {/* <hr/> */}
          <Row className="pb-3 pt-3">
            <Col lg={6} md={12}>
              <img className="trailit_logo mt-0" src={whiteLogo} alt="Trailit Logo" />
              <ul className="list-unstyled m-0 trailit_copy">
                <li>
                  <Link to="">© Trailit. Co. 2021</Link>
                </li>
                <li>
                  <Link to="">About</Link>
                </li>

                <li>
                  <Link to="">Help</Link>
                </li>
                <li>
                  <Link to="">Privacy</Link>
                </li>
                <li>
                  <Link to="">Terms</Link>
                </li>
              </ul>
            </Col>
            <Col className="text-right social-icons">
              <ul className="list-unstyled m-0 trailit_copy">
                <li>
                  <Link to="">
                    <img alt="facebook" src={trailitFb} />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <img alt="twitter" src={trailitTwitter} />
                  </Link>
                </li>
                <li className="mr-0">
                  <Link to="">
                    <img alt="instagram" src={trailItIg} />
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </footer>
    </>
  )
}

export default Footer
