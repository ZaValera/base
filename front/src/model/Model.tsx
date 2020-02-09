import * as React from 'react';

const {useState} = React;

interface IModelClass<S> {
    state: S & IHash;
    setState: (state: Partial<S>) => void;
}

export class Model<S> implements IModelClass<S>{
    static defaultState: any;
    static Context: React.Context<any>;
    state: S;

    __constructor: typeof Model;
    __reactSetState: React.Dispatch<Partial<S>>;
    __changed: boolean;

    constructor(props?: Partial<S>) {
        this.__constructor = this.constructor as typeof Model;

        this.__changed = false;

        this.state = {
            ...this.__constructor.defaultState,
            ...this.__filterProps(props),
        };
    }

    setState(newState: Partial<S>, bySelf?: boolean) {
        let changed = false;

        for (const [key, value] of Object.entries(newState)) {
            const name = key as keyof S;

            if (this.state[name] !== value) {
                changed = true;
                break;
            }
        }

        this.state = {
            ...this.state,
            ...newState,
        };

        if (this.__reactSetState && changed && !bySelf) {
            this.__reactSetState(this.state);
            this.__changed = true;
        }
    }

    connectToState(setState: React.Dispatch<Partial<S>>) {
        this.__reactSetState = setState;
    }

    __filterProps(props: IHash) {
        const filteredProps: Partial<S> = {};

        if (!props) {
            return filteredProps;
        }

        for (const [key, value] of Object.entries(props)) {
            const name = key as keyof S;

            if (this.__constructor.defaultState.hasOwnProperty(key)) {
                filteredProps[name] = value;
            }
        }

        return filteredProps;
    }

    __setFilteredState(props: IHash) {
        this.setState(this.__filterProps(props), true);
    }

    static connect = function (mapStateToProps: TMapStateToProps) {
        const Constructor = this;
        const Context = Constructor.__getContext();

        return function (WrappedComponent: any) {

            return function (props: any) {

                return (
                    <Context.Consumer>
                        {({model}: any) => {
                            if (model === null) {
                                throw new Error(`Connect without provider: ${Constructor.name}`);
                            }

                            if (!model.__changed) {
                                model.__setFilteredState(props);
                            }

                            model.__changed = false;

                            return (<WrappedComponent {...props} {...mapStateToProps(model)}/>);
                        }}
                    </Context.Consumer>
                );
            };
        };
    };

    static provider = function () {
        const Constructor = this;
        const Context = Constructor.__getContext();

        return function (WrappedComponent: any) {
            return function (props: any) {
                const [model] = useState(() => {
                    return props.inject || new Constructor(props);
                });

                const [, setState] = useState(model.state);

                model.connectToState(setState);

                return (
                    <Context.Provider value={{model}}>
                        <WrappedComponent {...props}/>
                    </Context.Provider>
                );
            };
        };
    };

    static __getContext() {
        const Constructor = this;

        if (!Constructor.Context) {
            Constructor.Context = React.createContext(null);
        }

        return Constructor.Context;
    }
}

interface IHash {
    [key: string]: any;
}

type TMapStateToProps = (model: any) => {[key: string]: any};
