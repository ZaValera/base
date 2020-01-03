import {connect} from 'react-redux';
import {toggleTodo, VisibilityFilters} from '../actions';
import TodoList from '../components/TodoList';

function getVisibleTodos (todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

function mapStateToProps(state) {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTodo: id => dispatch(toggleTodo(id)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);