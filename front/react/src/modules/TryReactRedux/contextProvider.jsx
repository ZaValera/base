import {connect, createProvider} from 'react-redux'
import {createStore} from 'redux';
import React from 'react';

const storeKey = 'componentStore';
const ContextProvider = createProvider(storeKey);

export function connectToContext(
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

export function getProvider(initialState) {
    const store = createStore((state = initialState, {type, ...action}) => {
        switch (type) {
            case 'SET_STATE':
                return {
                    ...state,
                    ...action,
                };

            default:
                return state;
        }
    },window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        name: 'asdf'
    }));

    return (props) => {
        return <ContextProvider store={store}>
            {...props.children}
        </ContextProvider>
    };
}