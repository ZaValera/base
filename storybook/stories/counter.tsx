import * as React from 'react';

import {ProvidedCounter, ProvidedParent} from 'src/components/counter/Counter';
import {CounterModel} from 'src/components/counter/CounterModel';
export default { title: 'Counter' };

const model = new CounterModel({count: 35});

export const counter = () => {

    return (
        <>
            <ProvidedCounter count={5}/>
            <ProvidedCounter count={50}/>
            <ProvidedCounter inject={model}/>
            <ProvidedParent/>
        </>
    );
};
