import React from 'react';
import {withRouter} from 'react-router-dom';

export class Redirect extends React.PureComponent {
    constructor(props) {
        super(props);

        this.someRedirect = this.someRedirect.bind(this);
    }

    render() {
        return (
            <div onClick={this.someRedirect}>Redirect ro root</div>
        )
    }

    someRedirect() {
        this.props.history.push('/');
    }
}

export const RoutedRedirect = withRouter(Redirect);