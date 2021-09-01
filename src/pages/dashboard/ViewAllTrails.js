/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'

import SVG from 'react-inlinesvg'
import {useDispatch, useSelector} from 'react-redux'
import _ from 'lodash'
import {get, getQueryStringObj} from '../../Utils/AppUtill'
import {getTrailsList} from '../../action/categories.action'
import SliderBgImage from '../../images/trailit_bx_img.png'
import TrailBox from '../../components/TrailBox'
import {GlobalContext} from '../../context/globalContext'


const ViewAllTrails = props => {
  const queryObj = getQueryStringObj()
  const history = useHistory()
  const dispatch = useDispatch()
  const {userData: {_id: userId} = {}} = useContext(GlobalContext)
  const [filter, setFilter] = useState(queryObj)

  const {trailList = [], trailTotalPages = 1} = useSelector(state => state.categoryReducer)
  const {isLoadingData} = useSelector(state => state.apiReducer)

  const filters = JSON.stringify(filter)
  

  const sliderStyle = {
    background: `url(${SliderBgImage}) no-repeat scroll center center / cover`,
  }

  useEffect(() => {
    dispatch({type: 'CLEAR_TRAIL_LIST'})
    if (Object.keys(JSON.parse(filters)).length > 0) {
      dispatch(
        getTrailsList({
          ..._.omit(JSON.parse(filters), ['name']),
        })
      )
    }
  }, [dispatch, filters, userId])

  useEffect(() => {
    setFilter(queryObj)
  }, [JSON.stringify(queryObj)])

  const paginationNumbers = (current, totalPages, index) => {
    if (totalPages >= 3) {
      if (totalPages - current < 3) {
        return totalPages - 2 + index
      }
      return current + index
    }
    if (totalPages === 2) {
      if (current === 1) {
        return current + index
      }
      return totalPages - 1 + index
    }
    return current
  }

  return (
    <>
      {/* ------section start---------- */}
      <section className="trailit_section mt-xl-5">
        <div className="container-fluid">
          <div className="trailit_slider">
            <Row className="mb-3">
              <Col>
                <Col>
                  <div className="trailit_26_500">{queryObj.name}</div>
                </Col>
              </Col>
            </Row>
            <Row>
              {(Array.isArray(trailList) ? trailList : []).map(trail => (
                <Col xs={12} sm={6} md={4} lg={3}>
                  <TrailBox cat={trail} moreDropdown={history.location.pathname ==='/trails/filter' && Object.values(queryObj).includes('My Trails')}/>
                </Col>
              ))}
              <Col md={12} className="text-right pgntn_prnt">
                {/* <Pagination
                  activePage={Number(filter.page)}
                  itemsCountPerPage={filter.itemsPerPage}
                  pageRangeDisplayed={5}
                  onChange={(current) =>
                    setFilter({ ...filter, page: current })
                  }
                /> */}
                {trailTotalPages > 1 && !isLoadingData && (
                  <Pagination>
                    <Pagination.First
                      disabled={!(Number(filter.page) > 1)}
                      onClick={() => setFilter({...filter, page: 1})}
                    />
                    <Pagination.Prev
                      disabled={!(Number(filter.page) > 1)}
                      onClick={() =>
                        setFilter({
                          ...filter,
                          page: Number(filter.page) > 1 ? Number(filter.page) - 1 : 1,
                        })
                      }
                    />
                    {Number(filter.page) > 3 && <Pagination.Ellipsis />}
                    {Array.from({length: trailTotalPages > 3 ? 3 : trailTotalPages}, (item, index) => (
                      <Pagination.Item
                        active={
                          Number(Number(filter.page)) === paginationNumbers(Number(filter.page), trailTotalPages, index)
                        }
                        onClick={() =>
                          setFilter({
                            ...filter,
                            page: paginationNumbers(Number(filter.page), trailTotalPages, index),
                          })
                        }
                      >
                        {paginationNumbers(Number(filter.page), trailTotalPages, index)}
                      </Pagination.Item>
                    ))}
                    {Number(filter.page) <= trailTotalPages - 3 && <Pagination.Ellipsis />}

                    <Pagination.Next
                      disabled={!(Number(filter.page) < trailTotalPages)}
                      onClick={() =>
                        setFilter({
                          ...filter,
                          page: Number(filter.page) < trailTotalPages ? Number(filter.page) + 1 : trailTotalPages,
                        })
                      }
                    />
                    <Pagination.Last
                      disabled={!(Number(filter.page) < trailTotalPages)}
                      onClick={() => setFilter({...filter, page: trailTotalPages})}
                    />
                  </Pagination>
                )}
              </Col>
            </Row>

            {/* ------row end---------- */}
          </div>
        </div>
      </section>
      {/* ------section end---------- */}
    </>
  )
}
export default ViewAllTrails
