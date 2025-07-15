import { SET_USER, CLEAR_USER, SET_LOADING, SET_ERROR } from "./userType";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, profile: action.payload };
    case CLEAR_USER:
      return { ...state, profile: null };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
