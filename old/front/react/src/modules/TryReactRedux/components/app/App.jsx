import React from 'react';
import {connect} from 'react-redux';
import {addMoney} from '../../actions/user';
import {WeatherContainer} from './components/weather/Weather';

export function App(props) {
    return (
        <div onClick={props.onClick}>
            <div>{props.userName}</div>
            <div>{props.balance}</div>
            <WeatherContainer status={1}/>
            <WeatherContainer status={2}/>
        </div>
    );
}

export const AppContainer = connect(
    (state, ownProps) => {
        return {
            userName: `${state.user.firstName} ${state.user.lastName}`,
            balance: state.user.balance,
        };
    },
    (dispatch, ownProps) => {
        return {
            onClick: () => dispatch(addMoney(100)),
        };
    },
)(App);