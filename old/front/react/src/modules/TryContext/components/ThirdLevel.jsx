import React from 'react';
import {Consumer} from './App';

export default class ThirdLevel extends React.PureComponent {
    render() {
        return (
            <Consumer>
                {value => (
                    <div className='thirdLevel'>
                        Value from "Provider" - {value}
                    </div>
                )}
            </Consumer>
        )
    }
}