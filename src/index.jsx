import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

import  React from "react";

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Provider store={store}>
      <App />
      </Provider>
  </React.StrictMode>
);