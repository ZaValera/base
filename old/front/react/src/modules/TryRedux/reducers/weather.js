const inititalWeather = {
    pressure: 760,
    temperature: 20,
};

function weather(state = inititalWeather, action) {
    switch (action.type) {
        case 'CHANGE_PRESSURE':
            return {
                ...state,
                pressure: action.pressure,
            };

        case 'CHANGE_TEMPERATURE':
            return {
                ...state,
                temperature: action.temperature,
            };

        default:
            return state;
    }
}

export default weather;