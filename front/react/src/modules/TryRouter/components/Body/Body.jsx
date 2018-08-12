import React from 'react';
import {Route} from 'react-router-dom';
import {Page} from '../Page/Page';

export class Body extends React.Component {
    render() {
        return (
            <div className='body'>
                <Route path='/page_one' component={Page}/>
                <Route path='/page_two' component={Page}/>
                <Route path='/page_three' component={Page}/>
            </div>
        )
    }
}