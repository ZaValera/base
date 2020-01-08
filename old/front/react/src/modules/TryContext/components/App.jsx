import React from 'react';
import FirstLevel from './FirstLevel'

export const {Provider, Consumer} = React.createContext('en');

export class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            lang: 'ru',
        };

        setInterval(() => {
            this.setState((prevState) => {
                return {
                    lang: prevState.lang === 'en' ? 'ru' : 'en',
                }
            });
        }, 2000);
    }

    render() {
        return (
            <div className='tryContext'>
                <Consumer>
                    {value => (
                        <div>
                            Default value without "Provider" - {value}
                        </div>
                    )}
                </Consumer>
                <Provider value={this.state.lang}>
                    <FirstLevel/>
                </Provider>
            </div>
        )
    }
}

export default App;