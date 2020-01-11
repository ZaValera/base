import 'reset-css';
import 'src/css/main.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Layout} from './layout/Layout';
import {log} from 'shared/src/utils';
import {SomeModule} from 'shared/src/modules/someModule';

log('----=====----');

const someModule = new SomeModule();

someModule.log();

ReactDOM.render(
    <Router>
        <Layout/>
    </Router>,
    document.getElementById('root')
);