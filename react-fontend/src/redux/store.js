import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./user/useReducer";
import adminReducer from "./admin/adminReducer";
import userClassReducer from "./userClass/userClassReducer";
import adminClassReducer from "./adminClass/adminClassReducer";
import adminRegisterReducer from "./adminRegister/adminRegisterReducer";

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  userClass: userClassReducer,
  adminClass: adminClassReducer,
  adminRegister: adminRegisterReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
