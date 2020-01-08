import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Head} from './components/Head/Head';
import {Body} from './components/Body/Body';
import {render} from 'react-dom';

render(
    <BrowserRouter>
        <div className='tryRouter'>
            <Head/>
            <Body/>
        </div>
    </BrowserRouter>,
    document.getElementById('router'),
);