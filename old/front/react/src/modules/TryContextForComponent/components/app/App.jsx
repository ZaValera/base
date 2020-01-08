import React from 'react';
import {ProvideState} from '../../stateProvider';
import {FirstLevel, firstLevelState}from '../firstLevel/FirstLevel'

const firstLevelStateExtended = firstLevelState.clone({
    item1: {
        count: 10,
    },
    item2: {
        count: 20,
    }
});

export class App extends React.PureComponent {
    render() {
        return (
            <div className='tryContext'>
                <ProvideState state={firstLevelStateExtended.item1}>
                    <FirstLevel/>
                </ProvideState>
                <ProvideState stateName={firstLevelStateExtended.item2}>
                    <FirstLevel/>
                </ProvideState>
                {this.props.count1}
                {this.props.count2}
            </div>
        )
    }
}

export const AppContainer = firstLevelStateExtended.connectAndProvide(
    (items) => {
        items.item1.connect(
            (state) => {
                return {
                    count1: state.count,
                };
            },
            (methods) => {
                return {
                    increaseCount1: methods.increaseCount,
                };
            }
        );
        items.item2.connect(
            (state) => {
                return {
                    count2: state.count,
                };
            },
        );
    },
)(App);

export default App;