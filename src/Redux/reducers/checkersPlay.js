const initialState = {
	turn: 0,
	past: [[]],
	present: [[]],
	whitePCaptured: 0,
	blackPCaptured: 0,
	captureTimer: 0,
};

const allInfoCheckersReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		//ToDo: hacer
		case "SET_PLAY":
			return {
				...state,
				past: action.past,
				present: action.present,
				turn: action.turn,
				whitePCaptured: action.whitePCaptured,
				blackPCaptured: action.blackPCaptured,
				captureTimer: action.captureTimer,
			};

		default:
			return state;
	}
};
export default allInfoCheckersReducer;
