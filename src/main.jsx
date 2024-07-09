import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './Redux/Store/Store.js'
import './Component/Spinner/loader.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer/>
    <App />
  </Provider>,
)
