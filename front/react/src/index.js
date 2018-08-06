import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Link, HashRouter} from 'react-router-dom';
import {App} from './components/App/App';
import * as $ from 'jquery';

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('app'),
);

window.$ = $;

$.ajax({
    url: '/api/v1/test',
    type: 'POST',
});
