import React from 'react';
import SecondLevel from './SecondLevel';

export default class FirstLevel extends React.PureComponent {
    render() {
        return (
            <div className='firstLevel'>
                <SecondLevel/>
            </div>
        )
    }
}