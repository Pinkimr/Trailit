/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Col, Row} from 'react-bootstrap'
import {getAllCategories, getTrailsList} from '../../action/categories.action'
import TrailBox from '../../components/TrailBox'
import {GET_TRAILS_LIST} from '../../action/reducer.types'
import {useDebounce} from '../../hooks/userDebounce'

const Categories = () => {
  const [currentTab, setCurrentTab] = useState(null)
  const [currentParams, setCurrentParams] = useState({
    page: 1,
    itemsPerPage: 9,
  })
  const [loadMore, setLoadMore] = useState(false)

  const dispatch = useDispatch()
  const loader = useRef(null)
  const {getAllCategory = [], trailList = [], trailTotalPages} = useSelector(state => state.categoryReducer)
  const {type = [], isLoadingData} = useSelector(state => state.apiReducer)
  
  const onScroll = e => {
    const el = e.target
    if (el.scrollTop + el.clientHeight === el.scrollHeight) {
      setLoadMore(true)
    }
  }

  const getData = () => {
    if (trailTotalPages > currentParams.page) {
      setCurrentParams(currentParams => ({
        ...currentParams,
        page: currentParams.page + 1,
      }))
    }
    setLoadMore(false)
  }

  useEffect(() => {
    if (loadMore) {
      getData()
    }
  }, [loadMore])

  useEffect(() => {
    dispatch({type: 'CLEAR_TRAIL_LIST'})
    dispatch(getAllCategories())
  }, [dispatch])

  useEffect(() => {
    if (getAllCategory.length > 0) {
      setCurrentTab(getAllCategory[0].trail_category_id)
    }
  }, [getAllCategory])

  useEffect(() => {
    if (currentTab) {
      dispatch({type: 'CLEAR_TRAIL_LIST'})
      setCurrentParams({
        categoryId: currentTab,
        itemsPerPage: 12,
        page: 1,
      })
    }
  }, [currentTab, dispatch])

  useEffect(() => {
    if (currentParams.categoryId) {
      dispatch(getTrailsList(currentParams))      
    }
  }, [JSON.stringify(currentParams), dispatch])

  return (
    <>
      <section className="trailit_section">
        <div className="container-fluid">
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
          {/* <Row>
            <Col className="text-right mx-5 my-3">
              <Link
                className="trailit_16_400 link"
                onClick={() => dispatch({ type: "CLEAR_TRAIL_LIST" })}
                to={`/trails/filter?name=${_.get(
                  getAllCategory.find(
                    (item) => item.trail_category_id === Number(currentTab)
                  ),
                  ["trail_category_name"],
                  ""
                )}&categoryId=${currentTab}&page=1&itemsPerPage=20`}
              >
                View all
              </Link>
            </Col>
          </Row> */}

          <Row className="infinite_container" onScroll={onScroll}>
            {(Array.isArray(trailList) ? trailList : []).map(trail => (
              <Col xs={12} sm={6} md={4} lg={3}>
                <TrailBox cat={trail} />
              </Col>
            ))}
            {(Array.isArray(trailList) ? trailList : []).length === 0 && !isLoadingData && (
              <Col>
                <h2 className="no_data_found text-center py-5">No Trails created yet for this category</h2>
              </Col>
            )}
          </Row>
          {/* <div className="trailit_slider">
            {trailList.length > 0 && (
              <CrousalSliderSmall
                getTrailsListData={trailList}
                afterChange={(current) => {
                  dispatch(
                    getTrailsList({
                      categoryId: currentTab,
                      page: Math.ceil(current / 8 + 1),
                      itemsPerPage: 8,
                    })
                  );
                }}
              />
            )}
          </div> */}
        </div>
      </section>
    </>
  )
}

export default Categories
