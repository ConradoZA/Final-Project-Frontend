import store from "../store"

export const setTablePosition =(tablePosition)=>{
	store.dispatch({
		type:'SET_TABLE_POSITION',
		payload:tablePosition
	})
}
export const printNewTablePosition =(tablePosition)=>{
	store.dispatch({
		type:'PRINT_NEW_POSITION',
		payload:tablePosition
	})
}