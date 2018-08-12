import React from 'react';

export default function Weather(props) {
    return (
        <div onClick={(e) => {
            e.stopPropagation();
            props.onClick()
        }}>
            <div>{props.temperature}</div>
            <div>{props.pressure}</div>
        </div>
    );
}