import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import App from './search.js'
// import App from './results/flightresult.js'


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
