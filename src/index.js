import React from 'react'
import ReactDOM from 'react-dom'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import App from './App'
// import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import '../node_modules/react-country-dropdown/dist/index.css'
import rootReducer from './reducers'
import customMiddleware from './middleware/api'
import ErrorBoundary from './components/Widgets/ErrorBoundary'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(customMiddleware)))

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
)
