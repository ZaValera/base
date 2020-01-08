import React from 'react';
import {connectToState} from '../../../../stateProvider';
import {ButtonContainer} from './components/button/Button';

export class ListItem extends React.PureComponent {
    render() {
        return (
            <div>
                {this.props.name} ({this.props.status})
                <ButtonContainer name={this.props.name}/>
            </div>
        );
    }
}

export const ListItemContainer = connectToState( // подключение к state родительского компонента
    (state) => {
        return {
            status: state.status,
        };
    },
)(ListItem);