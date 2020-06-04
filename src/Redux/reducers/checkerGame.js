const initialState = {
	playerOne: "",
	playerTwo: "",
	initiated:false,
	winner: "",
	drawOffered:false,

}

const allInfoCheckersReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		//ToDo: hacer

		default:
			return state;
	}
};
export default allInfoCheckersReducer;