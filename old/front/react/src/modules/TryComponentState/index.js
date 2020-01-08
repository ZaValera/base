import React from 'react';
import {createStore} from 'redux';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import reducers from './reducers';
import {AppContainer} from './components/app/App';

export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
    <Provider store={store}>
        <AppContainer name={'App'}/>
    </Provider>,
    document.getElementById('component_state'),
);
