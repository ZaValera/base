import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {increaseCount} from '../../../../../../actions/common';
import {connectToState} from '../../../../../../stateProvider';
import {state as listState} from '../../ListItem';

export class Button extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <div
                onClick={this.onClick}
                style={{color: 'blue'}}
            >
                <button>Set status</button>
            </div>
        );
    }

    onClick() {
        this.props.setStatus(this.props.name);
        this.props.increaseCount();
    }
}

export const ButtonContainer = compose(
    connect(
        null,
        (dispatch) => {
            return {
                increaseCount: () => dispatch(increaseCount()),
            };
        },
    ),
    connectToState(
        listState,
        (state) => {
            return {
                status: state.status,
            };
        },
        (setState) => {
            return {
                setStatus: (status) => setState(status),
            };
        },
    ),
)(Button);