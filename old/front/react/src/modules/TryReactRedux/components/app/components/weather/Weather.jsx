import React from 'react';
import {connect as reduxConnect} from 'react-redux';
import {setPressure} from '../../../../actions/weather';
import {Button} from './components/button/Button'

export function Weather(props) {
    return (
        <div onClick={(e) => {
            e.stopPropagation();
            props.onClick()
        }}>
            <div>{props.temperature}</div>
            <div>{props.pressure}</div>
            <Button name={'Button'}/>
        </div>
    );
}

export const WeatherContainer = reduxConnect(
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