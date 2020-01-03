import 'reset-css';
import './css/main.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Layout} from './layout/Layout';

ReactDOM.render(
    <Router>
        <Layout/>
    </Router>,
    document.getElementById('root')
);