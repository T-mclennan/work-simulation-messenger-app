import {SET_ACTIVE_CHAT} from '../actions/actionTypes'

const activeConversationReducer = (state = "", action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      return action.username;
    }
    default:
      return state;
  }
};

export default activeConversationReducer;
