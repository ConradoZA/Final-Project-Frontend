import undoable from 'redux-undo'

const checkerBoardReducer = (state = { tablePosition: [], alreadyMoved: false, whiteTurn: true, }, action) => {
    switch (action.type) {
        case 'SET_INITIAL_POSITION':

            return {
                ...state,
                tablePosition: action.payload
            }
        case 'PRINT_NEW_POSITION':
            return {
                ...state,
                tablePosition: action.payload,
                alreadyMoved: true
            }
            case 'SEND_NEW_POSITION':
                return {
                    ...state,
                    tablePosition: action.tablePosition,
                    alreadyMoved: false,
                    whiteTurn: action.newTurn
                }
        default:
            return state;
    }
};

const undoableCheckerBoardReducer = undoable(checkerBoardReducer);

export default undoableCheckerBoardReducer;