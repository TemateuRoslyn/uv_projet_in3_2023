import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import configureStore from './redux/configureStore.ts';
import { Provider } from 'react-redux';

const store = configureStore()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store = { store }>
        <App />
      </Provider>
  </React.StrictMode>,
)
