const initialUser = {
    firstName: 'Foo',
    lastName: 'Bar',
    balance: 0,
};

function user(state = initialUser, action) {
    switch (action.type) {
        case 'CHANGE_FIRST_NAME':
            return {
                ...state,
                firstName: action.firstName,
            };

        case 'CHANGE_LAST_NAME':
            return {
                ...state,
                lastName: action.lastName,
            };

        case 'ADD_MONEY':
            return {
                ...state,
                balance: state.balance + action.toAdd,
            };

        case 'SPEND_MONEY':
            const newBalance = state.balance - action.toSpend;

            return {
                ...state,
                balance: newBalance < 0 ? 0 : newBalance,
            };

        default:
            return state;
    }
}

export default user;