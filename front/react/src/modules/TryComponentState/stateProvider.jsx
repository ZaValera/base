import {connect, createProvider} from 'react-redux'
import {createStore} from 'redux';
import React from 'react';

const storeKey = 'componentStore';
const Provider = createProvider(storeKey);

let index = 1;

export function connectToState(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options = {}
) {
    options.storeKey = storeKey;

    return connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps,
        options
    )
}

export function createRef() {
    return {};
}

export function setStateAction(newState) {
    return {
        type: 'SET_STATE',
        newState,
    };
}

export function createState(initialState, props) {
    const store = createStore((state = initialState, {type, newState}) => {
        switch (type) {
            case 'SET_STATE':
                return {
                    ...state,
                    ...newState,
                };

            default:
                return state;
        }
    }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        name: props.storeName || `${storeKey}_${index++}`
    }));

    const setState = function (newState) {
        store.dispatch(setStateAction(newState));
    };

    if (props.storeRef) {
        props.storeRef.setState = setState;
        props.storeRef.getState = store.getState;
    }

    return {
        Provider: (props) => {
            return <Provider store={store}>
                {...props.children}
            </Provider>
        },
        getState: store.getState,
        setState,
    };
}