import { combineReducers } from "redux";
import user from "./user";
import checkerBoardLocal from "./checkerBoardLocal";
import checkerGame from "./checkerGame";
import checkerPlay from "./checkerPlay";

const reducer = combineReducers({
    user,
    checkerBoardLocal,
    checkerGame,
    checkerPlay
})
export default reducer;