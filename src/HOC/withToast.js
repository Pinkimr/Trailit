import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {Toast} from 'react-bootstrap'
import {get} from '../Utils/AppUtill'
import loading1 from '../images/loding1.png'
import loading2 from '../images/loding2.png'

const withToast = Component => props => {
  const {
    apiData,
    successLabels = [],
    errorLabels = [],
    isLoadingData,
    showLoader = [],
  } = useSelector(state => state.apiReducer)

  const getColor = color => {
    if (color === 'error') {
      return '#ff4949'
    }
    if (color === 'success') {
      return '#2dff49'
    }
  }

  const [snack, setSnack] = useState({
    visibilty: false,
    message: '',
    type: '',
  })

  useEffect(() => {
    if (successLabels.includes(get(['label'], apiData)) && get(['showToast'], apiData)) {
      setSnack({
        visibilty: true,
        message: apiData.successMessage,
        type: 'success',
      })
    }
    if (errorLabels.includes(get(['label'], apiData)) && get(['showToast'], apiData)) {
      setSnack({
        visibilty: true,
        message: apiData.errorMessage,
        type: 'error',
      })
    }
  }, [apiData, successLabels, errorLabels])

  return (
    <>
      <Toast
        autohide
        style={{
          position: 'fixed',
          top: 75,
          right: 50,
          zIndex: 10000,
          backgroundColor: getColor(snack.type),
        }}
        show={snack.visibilty}
        delay={10000}
        onClose={() =>
          setSnack({
            visibilty: false,
            message: '',
            type: '',
          })
        }
      >
        <Toast.Header>
          <strong className="mr-auto">{snack.message}</strong>
        </Toast.Header>
      </Toast>
      {isLoadingData && Object.values(showLoader).some(bool => bool) && (
        <div className="trailit_loaderBox">
          <div className="trial_spinner">
            <div className="ellipse">
              <img className="ring1" src={loading1} alt="loader" />
              <img className="ring2" src={loading2} alt="loader" />
            </div>
          </div>
        </div>
      )}

      <Component {...props} />
    </>
  )
}

export default withToast
