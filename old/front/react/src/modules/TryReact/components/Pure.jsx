import React from 'react';


export default class Pure extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: 1,
        };

        window.pure = (data) => {
            this.setState(data);
        }
    }

    render() {
        console.log('render Pure');

        return (
            <div>
                {this.props.data}
                {this.state.data}
            </div>
        );
    }
}