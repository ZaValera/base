import React from 'react';

class Dummy extends React.Component {
    constructor(props) {
        super(props);

        const initProps = props.initProps;
        const store = initProps.store;
        const mapStateToProps = props.mapStateToProps;

        if (!store) {
            throw 'Need "store" prop';
        }

        if (mapStateToProps) {
            this.state = mapStateToProps(store.getState(), initProps);

            store.subscribe(() => {
                this.setState({
                    ...mapStateToProps(store.getState(), initProps),
                });
            });
        }
    }

    render() {
        const Component = this.props.component;
        const mapDispatchToProps = this.props.mapDispatchToProps;
        const initProps = this.props.initProps;
        const store = initProps.store;
        let dispatchProps;

        if (mapDispatchToProps) {
            dispatchProps = mapDispatchToProps(store.dispatch, initProps);
        } else {
            dispatchProps = {
                dispatch: store.dispatch,
            }
        }

        return (
            <Component {...initProps} {...this.state} {...dispatchProps}/>
        );
    }
}

export default function connect(mapStateToProps, mapDispatchToProps) {
    return function (Component) {
        return function(props) {
            return (
                <Dummy
                    component={Component}
                    initProps={props}
                    mapStateToProps={mapStateToProps}
                    mapDispatchToProps={mapDispatchToProps}
                />
            );
        }
    }
}