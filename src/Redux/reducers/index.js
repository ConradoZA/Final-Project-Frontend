import { combineReducers } from "redux";
import user from "./user";
import checkerBoard from "./checkerBoard";

const reducer = combineReducers({
    user,
    checkerBoard,
})
export default reducer;