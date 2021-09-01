/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import './App.scss'

import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import * as nearAPI from 'near-api-js'
import {Near} from 'near-api-js'
import jwt from 'jsonwebtoken'
import {GlobalContext} from './context/globalContext'
import Routes from './routes/Routes'
import socket from './socket'
import {chromeSendMessage} from './Utils/extension-connection'
import {get} from './Utils/AppUtill'
import {GET_PROFILE_DATA, MY_PROFILE_DATA, SOCIAL_LOG_IN} from './action/reducer.types'
import {NearContext} from './context/nearContext'
import {socialLogin} from './action/auth.action'
import getConfig from './near/config'
import {getAuthorDetails, getMyProfileDetails} from './action/user.action'

const App = () => {
  // near detail
  const NearConfig = getConfig('development' || process.env.NODE_ENV)

  const {networkId, nodeUrl, walletUrl} = NearConfig

  const near = new Near({
    networkId,
    nodeUrl,
    walletUrl,
    deps: {
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    },
  })
  const wallet = new nearAPI.WalletAccount(near)
  const accountId = wallet.getAccountId()
  // near wallet balance logic
  const getBalance = async accountId => {
    if (accountId) {
      const provider = new nearAPI.providers.JsonRpcProvider(nodeUrl)
      const state = await provider.query(`account/${accountId}`, '')
      //
      //
      return nearAPI.utils.format.formatNearAmount(state.amount, 5)
    }
    return null
  }
  const [nearData, setNearData] = useState({
    accountId,
    wallet,
    NearConfig,
    publicKey: get(['_authData', 'allKeys', [0]], wallet, null),
    balance: async () => getBalance(accountId),
  })

  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem('token') !== 'null' && window.localStorage.getItem('token')
  )
  const [userData, setUserData] = useState(JSON.parse(window.localStorage.getItem('userData') || '{}'))
  const [appToken, setAppToken] = useState(window.localStorage.getItem('token'))

  const [extensionStatus, setExtensionStatus] = useState(window.localStorage.getItem('extension_status') || 'inactive')

  const setUserInfo = data => {
    setUserData(data)
    window.localStorage.setItem('userData', JSON.stringify(data))
  }
  const setUserToken = data => {
    setAppToken(data)
    window.localStorage.setItem('token', data)
  }

  const setExtStatus = data => {
    setExtensionStatus(data)
    window.localStorage.setItem('extension_status', data)
  }

  const dispatch = useDispatch()
  const [signInModal, setSignInModal] = useState(false)
  const {successLabels = []} = useSelector(state => state.apiReducer)
  const {myProfile} = useSelector(state => state.userReducer)
  const {loginData = {}} = useSelector(state => state.authReducer)

  const toggleNearData = async (data = {}) => {
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore()
    const near = await nearAPI.connect({
      deps: {keyStore},
      ...NearConfig,
    })

    const wallet = new nearAPI.WalletConnection(near, NearConfig.contractName)
    const accountId = wallet.getAccountId()

    const acc = data.accountId ? data.accountId : accountId

    setNearData({
      wallet,
      accountId,
      NearConfig,
      publicKey: get(['_authData', 'allKeys', [0]], wallet, null),
      balance: async () => getBalance(acc),
      ...data,
    })
  }

  useEffect(() => {
    socket.connect()

    if (extensionStatus === 'active') {
      window.onload = () => {
        chromeSendMessage(
          {
            message: 'init',
            type: 'STATUS',
          },
          response => {
            if (response) {
              setExtStatus('active')
            } else {
              setExtStatus('inactive')
            }
          }
        )
      }
    }

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    let interval
    if (extensionStatus !== 'active' && !interval && isLoggedIn) {
      interval = setInterval(() => {
        if (extensionStatus === 'inactive') {
          chromeSendMessage(
            {
              message: 'init',
              type: 'STATUS',
            },
            response => {
              if (response) {
                setExtStatus('active')
                clearInterval(interval)

                chromeSendMessage(
                  {
                    loggedInData: userData,
                    authToken: appToken,
                    type: 'WEB_LOGIN',
                    action: 'LOGIN_FROM_WEB',
                  },
                  response => {}
                )
              } else {
                setExtStatus('inactive')
              }
            }
          )
        }
      }, 5000)
    }
  }, [extensionStatus, isLoggedIn])

  useEffect(() => {
    if (successLabels.includes(MY_PROFILE_DATA) && myProfile) {
      setUserInfo({...userData, profileImage: get(['userData', 'profileImage'], myProfile, '')})
    }
  }, [successLabels, myProfile])

  useEffect(() => {
    if (userData && userData.userName) dispatch(getMyProfileDetails(userData.userName))
  }, [])

  useEffect(() => {
    if (accountId && !isLoggedIn) {
      const token = jwt.sign(
        {
          accountId,
        },
        process.env.REACT_APP_JWT_SECRET_KEY,
        {expiresIn: 60}
      )

      dispatch(socialLogin(token))
    }
  }, [isLoggedIn, accountId, dispatch])

  useEffect(() => {
    if (successLabels.includes(SOCIAL_LOG_IN)) {
      if (get(['isExist'], loginData) === false) {
        setSignInModal(true)
      } else if (get(['isExist'], loginData) === true) {
        chromeSendMessage(
          {
            loggedInData: get(['user'], loginData),
            authToken: get(['jwt'], loginData),
            type: 'WEB_LOGIN',
            action: 'LOGIN_FROM_WEB',
          },
          response => {}
        )

        setUserInfo(get(['user'], loginData))
        setUserToken(get(['jwt'], loginData))
        setIsLoggedIn(true)
        setSignInModal(false)
      }
    }
  }, [loginData, successLabels])

  return (
    <Router>
      <GlobalContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          signInModal,
          setSignInModal,
          userData,
          setUserInfo,
          appToken,
          setUserToken,
          setExtStatus,
        }}
      >
        <NearContext.Provider value={{...nearData, toggleNearData}}>
          {' '}
          <Routes />
        </NearContext.Provider>
      </GlobalContext.Provider>
    </Router>
  )
}

export default App
