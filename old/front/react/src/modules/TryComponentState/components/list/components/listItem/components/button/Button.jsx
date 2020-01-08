import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {connectToState, setStateAction} from '../../../../../../stateProvider';
import {increaseCount} from '../../../../../../actions/common';

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
        (state) => {
            return {
                status: state.status,
            };
        },
        (dispatch) => {
            return {
                setStatus: (status) => dispatch(setStateAction({status})), // setStateAction - изменение state родительского компонента
            };
        },
    ),
)(Button);