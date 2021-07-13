import { combineReducers } from 'redux';
import userReducer from "../reducers/user";
import conversationsReducer from "../reducers/conversations";
import activeConversationReducer from "../reducers/activeConversation";
import {CLEAR_ON_LOGOUT} from "../actions/actionTypes"

const appReducer = combineReducers({
  userReducer,
  conversationsReducer,
  activeConversationReducer
});
const rootReducer = (state, action) => {
  if (action.type === CLEAR_ON_LOGOUT) {
    // set state to initial state
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
