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

export function createStateRef() {
    const subscribes = new Map();
    const tempSubscribes = new Map();
    const _subscribe = function (subscribe, cb) {
        const unsubscribe = subscribe(cb);

        subscribes.set(cb, unsubscribe);

        return unsubscribe;
    };

    return {
        subscribe: function (cb) {
            const unsubscribe = function () {
                const unsubscribe = subscribes.get(cb);

                if (unsubscribe) {
                    unsubscribe();
                }

                tempSubscribes.delete(cb);
            };

            tempSubscribes.set(cb, unsubscribe);

            return unsubscribe;
        },
        unsubscribe: function (cb) {
            if (cb) {
                let subscribe;

                subscribe = subscribes.get(cb);

                if (subscribe) {
                    subscribe();
                    subscribes.delete(cb);
                }

                subscribe = tempSubscribes.get(cb);

                if (subscribe) {
                    subscribe();
                    tempSubscribes.delete(cb);
                }
            } else {
                for (const item of subscribes.values()) {
                    item();
                }

                subscribes.clear();

                for (const item of tempSubscribes.values()) {
                    item();
                }

                tempSubscribes.clear();
            }
        },
        _init: function(subscribe) {
            for (const cb of tempSubscribes.keys()) {
                _subscribe(subscribe, cb);
            }
        },
        _subscribe,
    };
}

export function setStateAction(newState) {
    return {
        type: 'SET_STATE',
        newState,
    };
}

export function withState(initial) {
    return function (WrappedComponent) {
        return class extends React.PureComponent {
            constructor(props) {
                super(props);
                const initialState = (typeof initial === 'function' ? initial(this.props) : initial) || {};

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

                const storeRef = props.storeRef;
                const onChangeState = props.onChangeState;

                if (storeRef) {
                    storeRef.setState = function (newState) {
                        store.dispatch(setStateAction(newState));
                    };
                    storeRef.getState = store.getState;
                    storeRef._init(store.subscribe);
                    storeRef.subscribe = function (cb) {
                        return storeRef._subscribe(store.subscribe, cb);
                    }
                }

                if (onChangeState) {
                    this.unsubscribe = store.subscribe(onChangeState);
                }

                this.store = store;
            }

            render() {
                const {storeRef, onChangeState, ...restProps} = this.props;

                return (
                    <Provider store={this.store}>
                        <WrappedComponent {...restProps}/>
                    </Provider>
                );
            }

            componentWillUnmount() {
                const storeRef = this.props.storeRef;

                if (storeRef) {
                    storeRef.unsubscribe();
                }

                if (this.unsubscribe) {
                    this.unsubscribe();
                }
            }
        };
    };
}