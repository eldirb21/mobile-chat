import {combineReducers} from "redux";
import loginReducer from "./Login";
import event from "./Events";

export default combineReducers({
    loginReducer,event
})
