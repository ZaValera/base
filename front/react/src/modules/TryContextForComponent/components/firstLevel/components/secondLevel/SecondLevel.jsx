import React from 'react';
import {compose} from 'redux';
import {firstLevelState} from '../../FirstLevel'

export class SecondLevel extends React.PureComponent {
    render() {
        return (
            <div
                onClick={() => {this.props.increaseCount()}}
            >
                {this.props.count}
            </div>
        )
    }
}

export const SecondLevelContainer = compose(
    firstLevelState.connect(
        (state) => {
            return {
                count: state.count,
            };
        },
        (methods) => {
            return {
                increaseCount: methods.increaseCount,
            };
        },
    )
)(SecondLevel);