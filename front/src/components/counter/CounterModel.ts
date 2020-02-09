import {Model} from 'src/model/Model';

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