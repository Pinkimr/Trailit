import React, {useContext} from 'react'

import Login from '../components/modal/login/Login'
import {GlobalContext} from '../context/globalContext'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

const Main = props => {
  const {signInModal, setIsSignInModal} = useContext(GlobalContext)

  return (
    <>
      <Header />
      <div className="trailit-body">{props.children}</div>
      <Footer />
      {signInModal && <Login handleCloseLogin={setIsSignInModal} />}
    </>
  )
}

export default Main
