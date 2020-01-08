export function setFirstName(firstName) {
    return {
        type: 'CHANGE_FIRST_NAME',
        firstName,
    };
}

export function setLastName(lastName) {
    return {
        type: 'CHANGE_LAST_NAME',
        lastName,
    };
}

export function addMoney(toAdd) {
    return {
        type: 'ADD_MONEY',
        toAdd,
    };
}

export function spendMoney(toSpend) {
    return {
        type: 'SPEND_MONEY',
        toSpend,
    };
}