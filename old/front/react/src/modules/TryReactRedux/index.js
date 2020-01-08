import React from 'react';
import {createStore} from 'redux';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import reducers from './reducers';
import {AppContainer} from './components/app/App';

export const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//store нужно передать либо через Provider либо в качестве props
//Если прокидывать как props, то нужно будет прокидывать store в каждый компонент, который обернут в connect
//Если прокидывать через Provider, то connect будет брать store из контекста и не нужно больше никуда прокидывать
render(
    <Provider store={store}>
        <AppContainer prop1={123}/>
    </Provider>,
    document.getElementById('react_redux'),
);

/*render(
    <App prop1={123} store={store}/>,
    document.getElementById('react_redux'),
);*/
