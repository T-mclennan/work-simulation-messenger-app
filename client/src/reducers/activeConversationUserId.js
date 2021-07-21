import {SET_ACTIVE_CHAT} from '../actions/actionTypes'

const activeConversationReducer = (state = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      return action.userId;
    }
    default:
      return state;
  }
};

export default activeConversationReducer;
