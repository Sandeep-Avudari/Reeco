import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./store/storeConfiguration";
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/page.css';
import './css/model.css';
import './css/editmodel.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
