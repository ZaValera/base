import React from 'react';
import ThirdLevel from './ThirdLevel';

export default class SecondLevel extends React.PureComponent {
    render() {
        return (
            <div className='secondLevel'>
                <ThirdLevel/>
            </div>
        )
    }
}