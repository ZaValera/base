import {connect} from 'react-redux';
import {setVisibilityFilter} from '../actions';
import Link from '../components/Link';

function mapStateToProps(state, ownProps) {
    return {
        active: ownProps.filter === state.visibilityFilter,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);