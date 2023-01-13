import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './component/app.component';

import 'bootstrap/dist/css/bootstrap.min.css';

import './css/sb-admin-2.css';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


