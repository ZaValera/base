import {Model} from 'src/research/model/Model';

export class CounterModel extends Model<IState> {
    static defaultState = {
        count: 666,
    };

    setCount = (count: number) => {
        this.setState({count});
    }
}

interface IState {
    count: number;
}