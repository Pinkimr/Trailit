/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {Row, Col, Button, Container, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {addUserCaetgories, getAllCategories} from '../../action/categories.action'
import SliderBgImage from '../../images/trailit_bx_img.png'
import {ADD_USER_CATEGORY} from '../../action/reducer.types'
import {get} from '../../Utils/AppUtill'

const IntroCategory = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {getAllCategory = []} = useSelector(state => state.categoryReducer)
  const {successLabels = []} = useSelector(state => state.apiReducer)
  const {doCategoryExistData} = useSelector(state => state.categoryReducer)
  const [checked, setChecked] = useState([])

  const style = {
    background: `url(${SliderBgImage}) no-repeat scroll center center / cover`,
  }

  const handleCheckbox = id => {
    if (checked.includes(id)) {
      setChecked(checked.filter(cat => cat !== id))
    } else setChecked([...checked, id])
  }

  const handleContinue = () => {
    const data = {
      categories_list: checked.join(','),
    }
    dispatch(addUserCaetgories(data))
  }

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  useEffect(() => {
    if (successLabels.includes(ADD_USER_CATEGORY)) {
      history.push(`/`)
    }
  }, [history, successLabels])

  useEffect(() => {
    if (get(['exists'], doCategoryExistData)) {
      history.push('/')
    }
  }, [doCategoryExistData])
  return (
    <section className="trailit_section pb-5">
      <Container>
        <div className="trailit_maxWidth940 ">
          {/* ------row start---------- */}
          <Row>
            <Col md={12}>
              <div className="trailit_36_500 text-center">
                Pick a few things you’re into.
                <br />
                We’ll show you content based on what you like.
              </div>
              <p className="text-center trailit_14_500 my-4">
                Having trouble? <Link to="">Contact Support</Link>
              </p>
            </Col>

            {getAllCategory.map(category => (
              <Col lg={4} md={6} key={category.trail_category_id}>
                <div className="trialit_selectCategory">
                  <input
                    type="checkbox"
                    className="trialit_selectCategoryCheckbx"
                    onClick={() => handleCheckbox(category.trail_category_id)}
                  />
                  <div className="trailit_bx mb-4">
                    <div className="img">
                      <span className="img_bg" style={style} />
                    </div>
                    <div className="trailit_bx_title">
                      <div className="trailit_18_500 text-dark">{category.trail_category_name}</div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          {/* ------row end---------- */}
        </div>
      </Container>
      <Button
        variant="link"
        disabled={checked.length < 3}
        className={`trailit_progressBtn ${checked.length > 1 ? 'spanText' : ''}`}
        onClick={handleContinue}
      >
        <div
          style={{
            width: `${checked.length < 3 ? (checked.length / 3) * 100 : 100}%`,
          }}
        />
        {checked.length < 3 ? <span>Select {3 - checked.length} more to continue</span> : <span>Continue</span>}
      </Button>
    </section>
  )
}
export default IntroCategory
