import * as React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';

export class Head extends React.PureComponent {
    render() {
        return (
            <div>
                <Link to={'/page_one'}>Page One</Link>
                <Link to={'/page_two'}>Page Two</Link>
                <Link to={'/page_three'}>Page Three</Link>
            </div>
        )
    }
}