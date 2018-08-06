import * as React from 'react';
import {Route} from 'react-router-dom';
import {Page} from '../Page/Page';
import {Page as Page2} from '../Page2/Page';

export class Main extends React.Component {
    render() {
        return (
            <div>
                <Route path='/page_one' component={Page}/>
                <Route path='/page_two' component={Page2}/>
                <Route path='/page_three' component={Page}/>
            </div>
        )
    }
}