import React, {createRef} from 'react';
import {connect} from 'react-redux';
import {resetCount} from '../../actions/common';
import {createStateRef} from '../../stateProvider';
import {ListWithState} from '../list/List';

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.list1 = createStateRef(); // ссылка на state компонента
        this.list2 = createStateRef();
        this.onReset = this.onReset.bind(this);
        this.onChangeList1 = this.onChangeList1.bind(this);

        this.list1.subscribe(() => {
            console.log('subscribe', this.list1.getState().status);
        })
    }

    render() {
        return (
            <div>
                {this.props.name} (count: {this.props.count}) <button onClick={this.onReset}>reset</button>
                <ListWithState
                    name={'LIST 1'}
                    storeRef={this.list1} // проброс ссылки компоненту, который имеет внтуренний state
                    onChangeState={this.onChangeList1} // проборос колбека на изменение внутренного стейта
                    storeName={'list1'} // имя сторы для devTools
                />
                <ListWithState
                    name={'LIST 2'}
                    storeRef={this.list2}
                    status={'init2'}
                />
            </div>
        );
    }

    componentDidMount() {
        console.log(this.list1.getState());
        console.log(this.list2.getState());
    }

    onChangeList1() {
        console.log('onChangeList1', this.list1.getState().status);
    }

    onReset() {
        console.log(this.list1.getState()); // получение внтуреннего state компонента
        console.log(this.list2.getState());

        this.list1.setState({ // изменение внтуреннего state компонента
            status: 'init1',
        });

        this.list2.setState({
            status: 'init2',
        });

        this.props.resetCount();

        console.log(this.list1.getState());
        console.log(this.list2.getState());
    }
}

export const AppContainer = connect(
    (state) => {
        return {
            count: state.common.count,
        };
    },
    (dispatch) => {
        return {
            resetCount: () => dispatch(resetCount()),
        };
    },
)(App);