import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_FAIL,
} from "../1. actions/types";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  msg: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };

    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      return {
        ...state,
        ...action.payload,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
}
