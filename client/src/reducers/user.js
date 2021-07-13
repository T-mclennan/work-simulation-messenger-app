
import { GET_USER, SET_FETCHING_STATUS } from '../actions/actionTypes'


const userReducer = (state = { isFetching: true }, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetching: action.isFetching
      };
    default:
      return state;
  }
};

export default userReducer;
