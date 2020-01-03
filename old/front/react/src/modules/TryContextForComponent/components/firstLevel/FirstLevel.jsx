import React from 'react';
import {compose} from 'redux';
import {SecondLevelContainer} from './components/secondLevel/SecondLevel';
import {createState, connectAndProvide} from '../../stateProvider';

export const {Provider, Consumer} = React.createContext('en');

export const firstLevelState = createState(
    {
        count: 1,
    },
    {
        increaseCount: (setValue, state) => {
            setValue({
                count: state.count + 1,
            });
        }
    }
);

export class FirstLevel extends React.PureComponent {
    render() {
        return (
            <div className='firstLevel'>
                {this.props.count}
                <SecondLevelContainer/>
            </div>
        )
    }
}

export const FirstLevelContainer = compose(
    firstLevelState.connectAndProvide(
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
    ),
)(FirstLevel);

export const FirstLevelContainer2 = compose(
    firstLevelState.provide(),
)(FirstLevel);


export const FirstLevelMod = compose(
    firstLevelState.connectAndProvide(
        (state) => {
            return {
                count: state.count,
            };
        },
        (methods) => {
            return {
                increaseCount: (setValue, state) => {
                    setValue({
                        count: state.count + 2,
                    });
                },
            };
        },
    ),
)(FirstLevel);
