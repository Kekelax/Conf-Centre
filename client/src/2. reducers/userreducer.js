import {
  GET_USERS,
  USERS_LOADING,
  USERS_CLEAR,
  EDIT_USER,
} from "../1. actions/types";

const initialState = {
  users: [],
  loading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case EDIT_USER:
      let updatedUser = action.payload;
      let newUsers = state.users;

      //Finds the index of the updated user in the array and updates it
      let updtIndex = newUsers
        .map((userData) => userData._id)
        .indexOf(updatedUser);
      newUsers[updtIndex] = {
        presenter: updatedUser.presenter,
        date: updatedUser.date,
      };

      return {
        ...state,
        events: newUsers,
      };

    case USERS_CLEAR:
      return {
        ...state,
        users: [],
        loading: false,
      };

    default:
      return state;
  }
}
