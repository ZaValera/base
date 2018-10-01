import React from 'react';
import {connect} from 'react-redux';
import {setPressure} from '../../../../actions/weather';
import {getProvider} from '../../../../contextProvider';
import {ButtonContainer} from './components/button/Button'

export function Weather(props) {
    const ContextProvider = getProvider({
        status: props.status,
    });

    return (
        <ContextProvider>
            <div onClick={(e) => {
                e.stopPropagation();
                props.onClick()
            }}>
                <div>{props.temperature}</div>
                <div>{props.pressure}</div>
                <ButtonContainer/>
            </div>
        </ContextProvider>
    );
}

export const WeatherContainer = connect(
    (state) => {
        return {
            pressure: state.weather.pressure,
            temperature: state.weather.temperature,
        };
    },
    (dispatch) => {
        return {
            onClick: () => dispatch(setPressure(Math.round(Math.random() * 100))),
        };
    },
)(Weather);