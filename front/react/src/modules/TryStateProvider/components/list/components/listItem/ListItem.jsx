import React from 'react';
import {createState, Provider} from '../../../../stateProvider';
import {ButtonContainer} from './components/button/Button';

export class ListItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.name} ({this.props.status})
                <ButtonContainer name={this.props.name}/>
            </div>
        );
    }
}