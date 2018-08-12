import React from 'react';
import {Link} from 'react-router-dom';

export class Head extends React.PureComponent {
    render() {
        return (
            <div className='head'>
                <Link to={'/page_one'}>Page One</Link>
                <Link to={'/page_two'}>Page Two</Link>
                <Link to={'/page_three'}>Page Three</Link>
            </div>
        )
    }
}