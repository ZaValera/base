import * as React from 'react';
import {RoutedRedirect} from '../Redirect/Redirect';

export class Page extends React.PureComponent {
    render() {
        return (
            <div>
                A am {this.props.match.path}
                <RoutedRedirect/>
            </div>
        )
    }
}