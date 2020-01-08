import React from 'react';
import {compose} from 'redux';
import {connectToState, withState} from '../../stateProvider';
import {ListItemContainer} from './components/listItem/ListItem';

export class List extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.name} ({this.props.status})
                <ListItemContainer name={'Item 1'}/>
                <ListItemContainer name={'Item 2'}/>
            </div>
        );
    }
}

export const ListWithState = compose(
    withState((props) => {
        return {
            status: props.status || 'init',
        }
    }),
    connectToState(
        (state) => {
            return {
                status: state.status,
            };
        },
    ),
)(List);