import React from 'react';

export function connectBackbone(mapStateToProps, model) {
    return function (Component) {
        return class extends React.PureComponent {
            constructor(props) {
                super(props);

                if (!model) {
                    throw 'Need "model" prop';
                }

                if (mapStateToProps) {
                    this.state = mapStateToProps(model.attributes, props);
                }

                this.handleChange = this.handleChange.bind(this);
            }

            handleChange() {
                this.setState(mapStateToProps(model.attributes, this.props));
            }

            componentDidMount() {
                if (mapStateToProps) {
                    model.on('change', this.handleChange);
                }
            }

            componentWillUnmount() {
                model.off('change', this.handleChange);
            }

            render() {
                return (
                    <Component
                        {...this.props}
                        {...this.state}
                    />
                );
            }
        };
    };
}
