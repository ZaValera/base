import React from 'react';
import Common from './Common';
import Pure from './Pure';


export default class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            common: 1,
            pure: 1,
        };

        window.app = (data) => {
            this.setState(data);
        }
    }

    render() {
        console.log('render App');

        return (
            <React.Fragment>
                <Common data={this.state.common}/>
                <Pure data={this.state.pure}/>
            </React.Fragment>
        );
    }
}