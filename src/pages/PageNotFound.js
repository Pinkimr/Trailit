import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const PageNotFound = props => {
  const history = useHistory()
  const addBodyClass = className => document.body.classList.add('trailit_header_black')
  const removeBodyClass = className => document.body.classList.remove('trailit_header_black')

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

  return (
    <div id="notfound" className="trailit-body">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <a  className="sbmt_btn" onClick={() => history.push('/')}>
          Go To Homepage
        </a>
      </div>
    </div>
  )
}

export default PageNotFound
