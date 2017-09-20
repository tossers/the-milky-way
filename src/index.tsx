import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Index as Login} from './components/Login/Index';
ReactDOM.render(
  <Login />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
