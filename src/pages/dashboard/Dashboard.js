/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import CrousalSliderSmall from '../../components/CrousalSliderSmall'
import {doCategoriesExist, getAllCategories, getTrailsList} from '../../action/categories.action'
import {DO_CATEGORY_EXIST} from '../../action/reducer.types'
import {get, getQueryStringObj} from '../../Utils/AppUtill'
import {GlobalContext} from '../../context/globalContext'

const addBodyClass = className => document.body.classList.add('Dashboard')
const removeBodyClass = className => document.body.classList.remove('Dashboard')

const Dashboard = props => {
  const queryObj = getQueryStringObj()
  const history = useHistory()
  const {userData: {_id: userId} = {}} = useContext(GlobalContext)

  const [slideCounter, setSlideCounter] = useState({})

  const dispatch = useDispatch()
  const {getAllCategory = []} = useSelector(state => state.categoryReducer)
  const {trailList = {}, doCategoryExistData} = useSelector(state => state.categoryReducer)
  const {successLabels = []} = useSelector(state => state.apiReducer)

  useEffect(() => {
    // Set up
    if (props instanceof Array) props.map(addBodyClass)
    else addBodyClass(props)

    // Clean up
    return () => {
      if (props instanceof Array) props.map(removeBodyClass)
      else removeBodyClass(props)
    }
  }, [props])

  useEffect(() => {
    dispatch({type: 'CLEAR_TRAIL_LIST'})
    window.location.hash = ''
  }, [])

  // slider settings

  useEffect(() => {
    dispatch(getAllCategories())
    if (Object.keys(queryObj).length !== 0) {
      dispatch(
        getTrailsList({
          categoryId: queryObj.category_id,
        })
      )
    } else {
      dispatch(doCategoriesExist())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, JSON.stringify(queryObj), userId])

  useEffect(() => {
    if (successLabels.includes(DO_CATEGORY_EXIST)) {
      if (!get(['exists'], doCategoryExistData)) {
        history.push('/setup')
      } else if (get(['categories_list'], doCategoryExistData)) {
        const arr = get(['categories_list'], doCategoryExistData).split(',')

        arr.forEach(element => {
          dispatch(
            getTrailsList(
              {
                categoryId: element,
                page: 1,
                itemsPerPage: 8,
              },
              `category_${element}`
            )
          )
        })
      }
    }
  }, [dispatch, history, successLabels])

  return (
    <>
      {/* ------section start---------- */}
      <section className="trailit_section extra-padding-top">
        <div className="container-fluid">
          <div className="text-center recommendedHeading">
              Explore Recommended Topics
          </div>
          <div className="trailit_slider">
            {/* ------row start---------- */}
            {Object.keys(trailList)
              .filter(cat => trailList[cat].length > 0)
              .map((category, index) => (
                <>
                  {}
                  <Row className="mb-3" key={`categorylist${index}`}>
                    <Col>
                      <Col>
                        <div className="trailit_26_500">
                          {get(
                            ['trail_category_name'],
                            getAllCategory.find(
                              item => item.trail_category_id === Number(category.split('category_')[1])
                            ),
                            ''
                          )}
                        </div>
                      </Col>
                    </Col>
                    {trailList[category].length > 4 && (
                      <Col className="text-right">
                        <Link
                          className="trailit_16_400 link"
                          onClick={() => dispatch({type: 'CLEAR_TRAIL_LIST'})}
                          to={`/trails/filter?name=${get(
                            ['trail_category_name'],
                            getAllCategory.find(
                              item => item.trail_category_id === Number(category.split('category_')[1])
                            ),
                            ''
                          )}&categoryId=${Number(category.split('category_')[1])}&page=1&itemsPerPage=20`}
                        >
                          View all
                        </Link>
                      </Col>
                    )}
                  </Row>
                  <CrousalSliderSmall
                    slideCounter={slideCounter}
                    setSlideCounter={setSlideCounter}
                    afterChange={current => {
                      const type = category
                      const catId = Number(category.split('category_')[1])

                      if (current / 8 > (slideCounter[type] || 0) && Math.ceil(current / 8) !== slideCounter[type]) {
                        setSlideCounter({
                          ...slideCounter,
                          [type]: Math.ceil(current / 8),
                        })
                        dispatch(
                          getTrailsList(
                            {
                              categoryId: catId,
                              page: Math.ceil(current / 8 + 1),
                              itemsPerPage: 8,
                            },
                            type
                          )
                        )
                      }
                    }}
                    getTrailsListData={trailList[category]}
                  />
                </>
              ))}

            {/* ------row end---------- */}
          </div>
        </div>
      </section>
      {/* ------section end---------- */}
    </>
  )
}
export default Dashboard
