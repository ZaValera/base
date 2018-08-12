import React from 'react';
import Weather from '../containers/Weather';

export default function App(props) {
    console.log(props);

    return (
        <div onClick={props.onClick}>
            <div>{props.userName}</div>
            <div>{props.balance}</div>
            <Weather/>
        </div>
    );
}