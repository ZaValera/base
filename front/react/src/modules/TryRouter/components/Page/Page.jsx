import React from 'react';
import {RoutedRedirect, Redirect} from '../Redirect/Redirect';

export class Page extends React.PureComponent {
    constructor(props) {
        super(props);
        debugger;
    }

    render() {
        return (
            <div>
                A am {this.props.match.path}
                <RoutedRedirect/>
                <Redirect history={this.props.history}/>
            </div>
        )
    }
}