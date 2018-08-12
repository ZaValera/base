export function setPressure(pressure) {
    return {
        type: 'CHANGE_PRESSURE',
        pressure,
    };
}

export function setTemperature(temperature) {
    return {
        type: 'CHANGE_TEMPERATURE',
        temperature,
    };
}