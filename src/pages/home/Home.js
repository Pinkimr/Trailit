/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState, useEffect} from 'react'
import {Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import BgImage from '../../images/trailit_herovideo.jpg'
import CrousalSliderSmall from '../../components/CrousalSliderSmall'
import {getAllCategories, getTrailsListPublic} from '../../action/categories.action'
import {GlobalContext} from '../../context/globalContext'
import infoGraphic from '../../images/trailit_infographic.png'

const Home = props => {
  const [currentTab, setCurrentTab] = useState(null)
  const {setSignInModal} = useContext(GlobalContext)
  const dispatch = useDispatch()
  const [slideCounter, setSlideCounter] = useState(0)
  const {getAllCategory = []} = useSelector(state => state.categoryReducer)
  const {trailList = []} = useSelector(state => state.categoryReducer)

  // banner image
  const styleBgImg = {
    background: `url(${BgImage}) no-repeat scroll center center / cover`,
  }

  // slider settings

  useEffect(() => {
    dispatch({type: 'CLEAR_TRAIL_LIST'})
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    if (getAllCategory.length > 0) {
      setCurrentTab(getAllCategory[0].trail_category_id)
    }
  }, [getAllCategory])

  useEffect(() => {
    if (currentTab) {
      dispatch({type: 'CLEAR_TRAIL_LIST'})
      dispatch(
        getTrailsListPublic({
          categoryId: currentTab,
          page: 1,
          itemsPerPage: 8,
        })
      )
      setSlideCounter(0)
    }
  }, [currentTab])

  return (
    <>
      {/* ------banner section start---------- */}
      <section className="trailit_bnr">
        <div className="trailit_bnr_img" style={styleBgImg} />
        <div className="trailit_overlay">
          <p className="text-white trailit_48_600">
            <span className="text-pink">Welcome</span> to the
            <br />
            Overnet.
          </p>
          <p className="text-white trailit_18_500 trailit_bnr_sun_title">
            A social media platform where influencers tell a story by guiding followers through a trail of websites.
          </p>
          <Button variant="pink" onClick={() => setSignInModal(true)}>
            Get Started
          </Button>
        </div>
      </section>
      {/* ------banner section end---------- */}
      {/* ------Discover what inspires You start---------- */}
      <section className="trailit_section">
        <div className="container-fluid">
          <div className="trailit_36_600 text-center">Discover what inspires You</div>

          <ul className="list-unstyled d-flex flex-wrap justify-content-center trailit_filter">
            {getAllCategory.map(category => (
              <li
                className={Number(currentTab) === category.trail_category_id ? 'trailit_active' : ''}
                key={category.trail_category_id}
              >
                <Button variant="link" onClick={() => setCurrentTab(category.trail_category_id)}>
                  {category.trail_category_name}
                </Button>
              </li>
            ))}
          </ul>
          <div className="trailit_slider">
            {trailList.length > 0 && (
              <CrousalSliderSmall
                getTrailsListData={trailList}
                afterChange={current => {
                  dispatch(
                    getTrailsListPublic({
                      categoryId: currentTab,
                      page: Math.ceil(current / 8 + 1),
                      itemsPerPage: 8,
                    })
                  )
                }}
              />
            )}
            {trailList.length === 0 && 
              <h2 className="no_data_found text-center py-5">No Trails created yet for this category</h2>
            }
          </div>
        </div>
      </section>
      {/* ------Discover what inspires You end---------- */}
      {/* ------slider big start---------- */}
      <section className="trailit_big_slider ">
        <div className="slide_item">
          <Row className="align-items-center">
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
        {/* <Slider2/> */}
      </section>
      {/* ------slider big end---------- */}
      {/* ------section start---------- */}
      {/* <section className="trailit_section">
                <div className="container-fluid">
                <div className="trailit_slider">
                    <Row className="mb-3">
                            <Col>
                                <Col>
                                    <div className="trailit_26_500">Newest</div>
                                </Col>
                            </Col>
                            <Col className="text-right">
                                <Col>
                                    <Link className="trailit_16_400 link" to="">View all</Link>
                                </Col>
                            </Col>
                        </Row>
                        <CrousalSliderSmall settings={settings} style={sliderStyle}/>
                        <Row className="mt-5 mb-3">
                            <Col>
                                <Col>
                                    <div className="trailit_26_500">Best Rated</div>
                                </Col>
                            </Col>
                            <Col className="text-right">
                                <Col>
                                    <Link className="trailit_16_400 link" to="">View all</Link>
                                </Col>
                            </Col>
                        </Row>
                        <CrousalSliderSmall settings={settings} style={sliderStyle}/>
                        <Row className="mt-5 mb-3">
                            <Col>
                                <Col>
                                    <div className="trailit_26_500">Trending</div>
                                </Col>
                            </Col>
                            <Col className="text-right">
                                <Col>
                                    <Link className="trailit_16_400 link" to="">View all</Link>
                                </Col>
                            </Col>
                        </Row>
                        <CrousalSliderSmall settings={settings} style={sliderStyle}/>
                        
                    </div>
                </div>
            </section>
            */}
    </>
  )
}
export default Home
