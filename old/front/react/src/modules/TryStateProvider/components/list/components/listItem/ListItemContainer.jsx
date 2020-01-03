import React from 'react';
import {createState, Provider} from '../../../../stateProvider';
import {ButtonContainer} from './components/button/Button';

export const state = createState({
    status: 'init',
});

export class ListItemContainer extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    setCount() {

    }

    render() {
        return (
            <ListItem>
                {this.props.name} ({this.props.status})
                <ButtonContainer name={this.props.name}/>
            </ListItem>
        );
    }
}