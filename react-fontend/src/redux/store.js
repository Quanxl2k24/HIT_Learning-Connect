import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./user/useReducer";
import adminReducer from "./admin/adminReducer";

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
