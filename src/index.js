import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';
import Header from './Header';

ReactDOM.render(
    <Container>
      <Header/>
      <App />
    </Container>, document.getElementById('root'));
