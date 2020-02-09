import * as React from 'react';
import {compose} from 'src/compose';
import {CounterModel} from './CounterModel';

export function Counter(props: IProps) {
    const {count, setCount} = props;

    console.log('Render');

    return (
        <div>
            Счёт: {count}
            <button onClick={() => setCount(0)}>Сбросить</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    );
}

export function Parent(props: IProps) {
    const [parentCount, setParentCount] = React.useState(123);

    return (
        <div>
            With parent <button onClick={() => setParentCount(parentCount + 1)}>cбросить</button>
            <ConnectedCounter count={parentCount}/>
        </div>
    );
}

export const ProvidedParent = compose(
    CounterModel.provider(),
)(Parent);

interface IProps {
    count: number;
    setCount: (count: number) => void;
}

export const ConnectedCounter = compose(
    CounterModel.connect((model) => ({
        setCount: model.setCount,
        count: model.state.count,
    })),
)(Counter);

export const ProvidedCounter = compose(
    CounterModel.provider(),
)(ConnectedCounter);



