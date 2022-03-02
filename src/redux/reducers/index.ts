import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { loadingReducer } from "./loader";

const RootReducer = combineReducers({
    auth: authReducer,
    loader: loadingReducer
});

export default RootReducer