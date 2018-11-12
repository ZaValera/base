import React from 'react';
import {connect} from 'react-redux';
import {resetCount} from '../../actions/common';
import {createRef} from '../../stateProvider';
import {List} from '../list/List';

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.list1 = createRef(); // ссылка на state компонента
        this.list2 = createRef();

        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <div>
                {this.props.name} (count: {this.props.count}) <button onClick={this.onClick}>reset</button>
                <List name={'LIST 1'} storeRef={this.list1} storeName={'list1'}/>{/* имя сторы для devTools */}
                <List name={'LIST 2'} storeRef={this.list2}/>{/* проброс ссылки компоненту, который имеет внтуренний state */}
            </div>
        );
    }

    onClick() {
        console.log(this.list1.getState()); // получение внтуреннего state компонента
        console.log(this.list2.getState());

        this.list1.setState({ // изменение внтуреннего state компонента
            status: 'init',
        });

        this.list2.setState({
            status: 'init',
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