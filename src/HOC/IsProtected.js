import React from 'react'
import {GlobalContext} from '../context/globalContext'

const IsProtected = Component => props =>
  (
    <GlobalContext.Consumer>
      {({setSignInModal, isLoggedIn}) => {
        const onClick = () => {
          if (!isLoggedIn) {
            setSignInModal(true)
          } else if (props.onClick) props.onClick()
        }
        return <Component {...props} onClick={onClick} />
      }}
    </GlobalContext.Consumer>
  )

export default IsProtected
