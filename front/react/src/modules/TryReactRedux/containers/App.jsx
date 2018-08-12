import React from 'react';
import {connect} from 'react-redux';
import myConnect from '../connect';
import {addMoney} from '../actions/user';
import App from '../components/App';

function mapStateToProps(state, ownProps) {
    return {
        userName: `${state.user.firstName} ${state.user.lastName}`,
        balance: state.user.balance,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClick: () => dispatch(addMoney(100)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);