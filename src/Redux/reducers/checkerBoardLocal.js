// import undoable from 'redux-undo'

const initialState = {
    tablePosition: [[]],
}

const checkerBoardLocalReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'SET_TABLE_POSITION':
        // case 'PRINT_NEW_POSITION':
        // case 'SEND_NEW_POSITION':
            return {
                ...state,
                tablePosition: action.payload
            }
        default:
            return state;
    }
};

// const undoableCheckerBoardLocalReducer = undoable(checkerBoardLocalReducer);
// export default undoableCheckerBoardLocalReducer;
export default checkerBoardLocalReducer;