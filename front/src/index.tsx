// import 'reset-css';
import 'src/styles/index.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import {BrowserRouter as Router} from 'react-router-dom';
import {Layout} from './layout/Layout';
import {log} from 'shared/src/utils';
import {SomeModule} from 'shared/src/modules/someModule';

console.log(_.uniqueId('init'));


ReactDOM.render(
    <Router>
        <Layout/>
    </Router>,
    document.getElementById('root')
);