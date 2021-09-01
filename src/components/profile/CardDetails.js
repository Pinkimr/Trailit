/* eslint-disable camelcase */
import React, {useContext, useEffect} from 'react'
import {Col, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {getCardDetails, removeCardDetails} from '../../action/user.action'
import {REMOVE_CARD_DETAILS} from '../../action/reducer.types'
import {GlobalContext} from '../../context/globalContext'
import trailItMasterCard from '../../images/mstercard_img.png'
import trailItAddCard from '../../images/addcard_img.png'

const CardDetails = props => {
  const {setIsAddEditCardActive, setEditID} = props
  const {userData: {_id: user_id} = {}} = useContext(GlobalContext)

  const {getCardDetailsData = []} = useSelector(state => state.userReducer)
  const {successLabels = []} = useSelector(state => state.apiReducer)
  const dispatch = useDispatch()

  const removeCard = card_number => {
    const data = {
      user_id,
      card_number,
    }
    dispatch(removeCardDetails(data))
  }

  useEffect(() => {
    dispatch(getCardDetails(user_id))
  }, [dispatch])

  useEffect(() => {
    if (successLabels.includes(REMOVE_CARD_DETAILS)) {
      dispatch(getCardDetails(user_id))
    }
  }, [successLabels])

  return (
    <form className="def_form">
      <Row>
        <Col md={12} className="mb-0 min-307">
          <Row>
            {getCardDetailsData.map(card => (
              <Col className="mt-3" md={6}>
                <div className="mstr_bx">
                  <div className="tp_mst_info">
                    <Row>
                      <Col className="col-4">
                        <img alt="" src={trailItMasterCard} />
                      </Col>
                      <Col className="col-8">
                        <h4>{`************${card.card_number.slice(-4, card.card_number.length)}`}</h4>
                        <p>
                          Expires {card.month}/ {card.year}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <hr />
                  <div className="pmnt_btm_info">
                    <Row>
                      <Col className="col-4">
                        <label>Primary</label>
                      </Col>
                      <Col className="col-8 text-right">
                        <a onClick={() => removeCard(card.card_number)} className="mr-3">
                          REMOVE
                        </a>
                        <a onClick={() => setEditID(card)}>EDIT</a>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            ))}
            <Col className="mt-3" md={6}>
              <a
                className="d-flex justify-content-center align-items-center addcard_btn"
                onClick={() => setIsAddEditCardActive(true)}
              >
                <img alt="" className="mr-2" src={trailItAddCard} />
                <h5>ADD CARD</h5>
              </a>
            </Col>
          </Row>
        </Col>
        {/* <Col md={12} className="text-right mb-2">
          <button className="cncl_btn mr-2">Cancel</button>
          <button type="submit" className="sbmt_btn mx-75">
            SAVE
          </button>
        </Col> */}
      </Row>
    </form>
  )
}

export default CardDetails
