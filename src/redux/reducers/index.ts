import { combineReducers } from "redux";
import { activeBudgetReducer } from "./active-budget";
import { authReducer } from "./auth";
import { loadingReducer } from "./loader";
import { messageReducer } from './message'

const RootReducer = combineReducers({
    auth: authReducer,
    loader: loadingReducer,
    snackbar: messageReducer,
    activeBudget: activeBudgetReducer
});

export default RootReducer