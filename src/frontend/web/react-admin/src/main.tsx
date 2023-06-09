import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';

import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';

const store = configureStore()


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store = { store }>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
