import React from 'react';
import {createState} from '../../stateProvider';
import {ListItemContainer} from './components/listItem/ListItem';

export class List extends React.PureComponent {
    constructor(props) {
        super(props);

        this.stateContext = createState({ // инициализация внутреннго state
            status: 'init',
        }, props); // проброс props вторым аргументом обязателен
    }

    render() {
        const StateProvider = this.stateContext.Provider; // провайдер для дочерних компонентов

        return (
            <StateProvider>
                <div>
                    {this.props.name}
                    <ListItemContainer name={'Item 1'}/>
                    <ListItemContainer name={'Item 2'}/>
                </div>
            </StateProvider>
        );
    }
}