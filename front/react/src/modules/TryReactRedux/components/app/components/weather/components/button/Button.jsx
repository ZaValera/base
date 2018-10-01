import React from 'react';
import {connectToContext} from '../../../../../../contextProvider';
import {setStatus} from '../../actions';

export function Button(props) {
    return (
        <div onClick={(e) => {
            e.stopPropagation();
            props.setStatus('loaded')
        }}>{props.status}</div>
    );
}

export const ButtonContainer = connectToContext(
    (state) => {
        return {
            status: state.status,
        };
    },
    (dispatch) => {
        return {
            setStatus: (status) => dispatch(setStatus(status)),
        };
    },
)(Button);