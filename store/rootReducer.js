import { combineReducers } from "redux";
import cart from "./cart/reducers";

const rootReducer = combineReducers({
  cart,
});

export default rootReducer;
