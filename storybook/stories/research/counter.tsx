import * as React from 'react';

import {ProvidedCounter, ProvidedParent} from 'src/research/counter/Counter';
import {CounterModel} from 'src/research/counter/CounterModel';
export default { title: 'Counter' };

// const model = new CounterModel({count: 35});

export const counter = () => {
    const [model] = React.useState(() => {
        new CounterModel({count: 35});
    });
    const [flag, setFlag] = React.useState(true);

    return (
        <>
            <button onClick={() => setFlag(!flag)}>toggle flag</button>
            {flag ? (<ProvidedCounter count={5}/>) : null}
            <ProvidedCounter count={50}/>
            <ProvidedCounter inject={model}/>
            <ProvidedParent/>
        </>
    );
};
