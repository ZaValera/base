import * as React from 'react';
import {Redirect} from '../Redirect/Redirect';

export class Page extends React.PureComponent {
    constructor(props) {
        super(props);

        console.log(this.props.history);
    }

    render() {
        return (
            <div>
                A am PAGE 2
                <Redirect {...this.props}/>
            </div>
        )
    }
}