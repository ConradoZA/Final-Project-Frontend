import { combineReducers } from "redux";
import user from "./user";
import allCheckersGame from "./allCheckersGame";
import checkerBoardLocal from "./checkerBoardLocal";
import checkersGame from "./checkersGame";
import checkersPlay from "./checkersPlay";

const reducer = combineReducers({
    user,
    allCheckersGame,
    checkerBoardLocal,
    checkersGame,
    checkersPlay
})
export default reducer;