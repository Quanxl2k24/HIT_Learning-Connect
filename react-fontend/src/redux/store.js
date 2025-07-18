import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./user/useReducer";
import adminReducer from "./admin/adminReducer";
import userClassReducer from "./userClass/userClassReducer";

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  userClass: userClassReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
