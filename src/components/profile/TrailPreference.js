import React, {useState, useEffect, useContext} from 'react'
import {Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Select from 'react-select'
import {addUserCaetgories, doCategoriesExist, getAllCategories} from '../../action/categories.action'
import {DO_CATEGORY_EXIST, GET_ALL_CATEGORY} from '../../action/reducer.types'

const TrailPrefernce = props => {
  const dispatch = useDispatch()
  const [categoryList, setCategoryList] = useState([])
  const [category, setCategory] = useState([]) 
  const [isInputChange, setisInputChange] = useState(false)

  const {doCategoryExistData, getAllCategory} = useSelector(state => state.categoryReducer)
  const {successLabels = []} = useSelector(state => state.apiReducer)
  const resetData = () => {
    if (doCategoryExistData.exists) {
      const value = categoryList.filter(cat =>
        doCategoryExistData.categories_list
          .split(',')
          .map(cat => Number(cat))
          .includes(cat.value)
      )
      setCategory(value)
    } else {
      setCategory([])
    }
  }
  const colourStyles = {
    multiValue: (styles, {data}) => {
      return {
        ...styles,
        backgroundColor: '#d41e79',
      }
    },
    multiValueLabel: (styles, {data}) => ({
      ...styles,
      color: '#fff',
    }),
    multiValueRemove: (styles, {data}) => ({
      ...styles,
      color: '#fff',
    }),
  }

  const handleSave = () => {
    setisInputChange(false)
    const data = {
      categories_list: category.map(value => value.value).join(','),
    }
    dispatch(addUserCaetgories(data))
  }

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(doCategoriesExist())
  }, [dispatch])

  useEffect(() => {
    if (getAllCategory) {
      setCategoryList(
        getAllCategory.map(cat => ({
          value: cat.trail_category_id,
          label: cat.trail_category_name,
        }))
      )
    }
  }, [getAllCategory])

  useEffect(() => {
    if (successLabels.includes(DO_CATEGORY_EXIST)) {
      resetData()
    }
  }, [successLabels])

  return (
    <form className="def_form">
      <Row>
        <Col md={12} className="mb-3">
          <label>Select Categories</label>
          <Select
            styles={colourStyles}
            isMulti
            closeMenuOnSelect={false}
            options={categoryList}
            value={category}
            onChange={value => {
              setisInputChange(true)
              setCategory(value)
            }}
          />
          {category.length < 3 && <span className="errorLabel">Please select atleast 3 categories</span>}
        </Col>
        <Col md={12} className="text-right mb-2 mt-1">
          <button
            type="button"
            className="cncl_btn mr-2"
            onClick={e => {
              e.preventDefault()
              resetData()
            }}
          >
            Cancel
          </button>
          <button type="button" className="sbmt_btn mx-75" disabled={category.length < 3 || !isInputChange} onClick={handleSave}>
            SAVE
          </button>
        </Col>
      </Row>
    </form>
  )
}

export {TrailPrefernce}
