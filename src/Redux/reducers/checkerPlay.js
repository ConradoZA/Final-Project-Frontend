const initialState = {
	turn: 0,
	past: [[]],
	present: [[]],
	whitePCaptured: 0,
	blackPCaptured: 0,
	captureTimer: 0,
}

const allInfoCheckersReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		//ToDo: hacer

		default:
			return state;
	}
};
export default allInfoCheckersReducer;