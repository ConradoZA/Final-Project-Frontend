import store from "../store"

export const setInitialPosition =(tablePosition)=>{
	store.dispatch({
		type:'SET_INITIAL_POSITION',
		payload:tablePosition
	})
}
export const printNewTablePosition =(tablePosition)=>{
	store.dispatch({
		type:'PRINT_NEW_POSITION',
		payload:tablePosition
	})
}