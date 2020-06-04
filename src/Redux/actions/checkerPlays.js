import store from "../store";

export const sendNewTablePosition =(tablePosition)=>{
	store.dispatch({
		type:'PRINT_NEW_POSITION',
		payload:tablePosition
	})
}