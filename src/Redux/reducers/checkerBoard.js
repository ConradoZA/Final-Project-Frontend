// import undoable from 'redux-undo'
const initialState = {
    playerOne: "",
    playerTwo: "",
    turn: 0,
    past: [[[]]],
    present: [[]],
    future: [[]],
    whitePCaptured: 0,
    blackPCaptured: 0,
    winner: "",
}

const checkerBoardReducer = (state = initialState, action) => {
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