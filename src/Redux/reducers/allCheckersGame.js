const initialState = {
all:[],
}

const allInfoCheckersReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		//ToDo: hacer
		case 'ALL_GAMES':
			return{
				...state,
				all:action.payload
			}

		default:
			return state;
	}
};
export default allInfoCheckersReducer;