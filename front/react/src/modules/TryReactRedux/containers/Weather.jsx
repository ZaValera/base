import React from 'react';
import {connect} from 'react-redux';
import {setPressure} from '../actions/weather';
import Weather from '../components/Weather';

function mapStateToProps(state, ownProps) {
    return {
        pressure: state.weather.pressure,
        temperature: state.weather.temperature,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClick: () => dispatch(setPressure(Math.round(Math.random() * 100))),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Weather);