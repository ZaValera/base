import * as React from 'react';

const {useState} = React;

interface IModelClass<S> {
    state: S & IHash;
    setState: (state: Partial<S>) => void;
}

export class Model<S> implements IModelClass<S>{
    static defaultState: any;
    static Context: React.Context<any>;
    static instances = new WeakSet();
    static ids: any = [];
    state: S;

    __constructor: typeof Model;
    __componentUpdate: Function;
    __changed: boolean;
    __prevProps: Partial<S>;

    constructor(props?: Partial<S>) {
        this.__constructor = this.constructor as typeof Model;

        this.__changed = false;
        this.__prevProps = {};

        this.state = {
            ...this.__constructor.defaultState,
            ...this.__filterProps(props),
        };

        Model.instances.add(this);
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

        if (this.__componentUpdate && changed && !bySelf) {
            this.__componentUpdate();
            this.__changed = true;
        }
    }

    __connectToComponent(update: Function) {
        this.__componentUpdate = update;
    }

    __disconnect() {
        this.__componentUpdate = null;
    }

    __filterProps(props: IHash): Partial<S> {
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
        const filteredProps = this.__filterProps(props);
        const propsToSet: Partial<S> = {};
        let changed = false;

        for (const [key, value] of Object.entries<any>(filteredProps)) {
            const name = key as keyof S;

            if (this.__prevProps[name] !== value) {
                propsToSet[name] = value;
                changed = true;
            }
        }

        if (changed) {
            this.__prevProps = filteredProps;

            this.setState(propsToSet, true);
        }
    }

    static connect = function (mapStateToProps: TMapStateToProps) {
        const Constructor = this;
        const Context = Constructor.__getContext();

        return function (WrappedComponent: any) {
            return function (props: any) {
                return (
                    <Context.Consumer>
                        {(model: Model<any>) => {
                            if (model === null) {
                                throw new Error(`Connect without provider: ${Constructor.name}`);
                            }

                            if (!model.__changed) {
                                model.__setFilteredState(props);
                            }

                            model.__changed = false;

                            return (<WrappedComponent {...props} {...mapStateToProps(model, props)}/>);
                        }}
                    </Context.Consumer>
                );
            };
        };
    };

    static provide = function () {
        const Constructor = this;
        const Context = Constructor.__getContext();

        return function (WrappedComponent: any) {
            return class WithProvider extends React.PureComponent<any, any> {
                model: Model<any>;

                constructor(props: any) {
                    super(props);

                    this.state = {
                        flag: false,
                    };

                    this.model = props.inject || new Constructor(props);

                    this.model.__connectToComponent(() => {
                        this.setState({flag: !this.state.flag});
                    });
                }

                render() {
                    return (
                        <Context.Provider value={this.model}>
                            <WrappedComponent {...this.props}/>
                        </Context.Provider>
                    );
                }

                componentWillUnmount() {
                    this.model.__disconnect();
                }
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

setInterval(function() {
    console.log(Model.instances);
}, 3000);

interface IHash {
    [key: string]: any;
}

type TMapStateToProps = (model: any, ownProps: any) => {[key: string]: any};
