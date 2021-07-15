import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  updateConversationAsSeen
} from "./utils/reducerFunctions";

import { 
  GET_CONVERSATIONS, 
  SET_MESSAGE, 
  ADD_ONLINE_USER, 
  REMOVE_OFFLINE_USER, 
  SET_SEARCHED_USERS, 
  CLEAR_SEARCHED_USERS, 
  ADD_CONVERSATION,
  SET_CONVO_AS_SEEN
} from '../actions/actionTypes'

const conversationReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    case SET_CONVO_AS_SEEN:
      return updateConversationAsSeen(state, action.payload.username);
    default:
      return state;
  }
};

export default conversationReducer;
