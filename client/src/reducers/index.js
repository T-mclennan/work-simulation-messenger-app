import { combineReducers } from 'redux';
import user from "../reducers/user";
import conversations from "../reducers/conversations";
import activeConversation from "../reducers/activeConversation";
import {CLEAR_ON_LOGOUT} from "../actions/actionTypes"

const appReducer = combineReducers({
  user,
  conversations,
  activeConversation
});
const rootReducer = (state, action) => {
  if (action.type === CLEAR_ON_LOGOUT) {
    // set state to initial state
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
