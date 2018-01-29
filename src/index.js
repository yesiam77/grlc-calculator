import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';
import Header from './Header';

ReactDOM.render(
    <div className="container">
        <Header/>
        <App />
    </div>, document.getElementById('root'));
