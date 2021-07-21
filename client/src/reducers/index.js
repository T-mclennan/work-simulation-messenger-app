import { combineReducers } from 'redux';
import user from "../reducers/user";
import conversations from "../reducers/conversations";
import activeConversationUserId from "./activeConversationUserId";
import {CLEAR_ON_LOGOUT} from "../actions/actionTypes"

const appReducer = combineReducers({
  user,
  conversations,
  activeConversationUserId
});
const rootReducer = (state, action) => {
  if (action.type === CLEAR_ON_LOGOUT) {
    // set state to initial state
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
