import * as React from 'react';
import {Head} from '../Head/Head';
import {Main} from '../Main/Main';

export class App extends React.Component {
    render() {
        return (
            <div>
                <Head/>
                <Main/>
            </div>
        )
    }
}