import * as React from 'react';
import {compose} from 'src/compose';
import {CounterModel} from './CounterModel';

export function Counter(props: IProps) {
    const {count, setCount, title} = props;

    return (
        <div>
            {title || 'Счёт'}: {count}
            <button onClick={() => setCount(0)}>Сбросить</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    );
}

export function Parent(props: IProps) {
    const [parentCount, setParentCount] = React.useState(123);
    const [title, setTitle] = React.useState('Заголовок');

    return (
        <div>
            With parent
            <button onClick={() => setParentCount(parentCount + 1)}>прибавить</button>
            <button onClick={() => setTitle(title + ' еще')}>изменить title</button>
            <div>Счетчик родителя {parentCount}</div>
            <div>Title родителя {title}</div>
            <ConnectedCounter count={parentCount} title={title}/>
        </div>
    );
}

export const ProvidedParent = compose(
    CounterModel.provide(),
)(Parent);

interface IProps {
    count: number;
    setCount: (count: number) => void;
    title?: string;
}

export const ConnectedCounter = compose(
    CounterModel.connect((model) => ({
        setCount: model.setCount,
        count: model.state.count,
    })),
)(Counter);

export const ProvidedCounter = compose(
    CounterModel.provide(),
)(ConnectedCounter);



