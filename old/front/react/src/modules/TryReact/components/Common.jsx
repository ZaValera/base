import React from 'react';


export default class Common extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: 1,
        };

        window.common = (data) => {
            this.setState(data);
        }
    }

    render() {
        console.log('render Common');

        return (
            <div>
                {this.props.data}
                {this.state.data}
            </div>
        );
    }
}