const initial = {
    count: 0,
};

export function common(state = initial, action) {
    switch (action.type) {
        case 'INCREASE_COUNT':
            const nextCount = state.count + 1;

            return {
                ...state,
                count: nextCount,
            };

        case 'RESET_COUNT':
            return {
                ...state,
                count: 0,
            };

        default:
            return state;
    }
}