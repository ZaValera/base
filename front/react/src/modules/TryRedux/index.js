import {createStore, bindActionCreators} from 'redux';
import {createSelector} from 'reselect'
import reducers from './reducers';
import * as userActions from './userActions';
import * as weatherActions from './weatherActions';

const store = createStore(reducers);
const bindedUserActions = bindActionCreators(userActions, store.dispatch);
const bindedWeatherActions = bindActionCreators(weatherActions, store.dispatch);

store.subscribe(() => {
    console.log(store.getState());
});


bindedUserActions.setFirstName('Valera');
bindedWeatherActions.setTemperature(36);


const pressureSelector = (state) => {
    return state.weather.pressure;
};

const temperatureSelector = (state) => {
    return state.weather.temperature;
};

const selector = createSelector(
    [pressureSelector, temperatureSelector],
    (pressure, temperature) => {
        return pressure * temperature;
    }
);

const selector2 = createSelector(
    [temperatureSelector],
    (temperature) => {
        console.log('selector2');
        return temperature;
    }
);

console.log(selector2(store.getState()));

bindedWeatherActions.setPressure(123);

console.log(selector2(store.getState()));