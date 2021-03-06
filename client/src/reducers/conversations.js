import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  updateConversationAsSeen,
  processConversations,
  incrementUnseenCount,
  setLastMessageRead,
  turnOffTypingForConvo,
  turnOnTypingForConvo
} from "./utils/reducerFunctions";

import { 
  GET_CONVERSATIONS, 
  SET_MESSAGE, 
  ADD_ONLINE_USER, 
  REMOVE_OFFLINE_USER, 
  SET_SEARCHED_USERS, 
  CLEAR_SEARCHED_USERS, 
  ADD_CONVERSATION,
  SET_CONVO_AS_SEEN,
  SET_LAST_MESSAGE_READ,
  INCREMENT_UNSEEN_COUNT, 
  TURN_OFF_TYPING_NOTIFICATION,
  TURN_ON_TYPING_NOTIFICATION,
} from '../actions/actionTypes'

const conversationReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return processConversations(action.conversations);
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
      return updateConversationAsSeen(state, action.id);
    case INCREMENT_UNSEEN_COUNT:
      return incrementUnseenCount(state, action.id)
    case SET_LAST_MESSAGE_READ:
        return setLastMessageRead(state, action.payload)
    case TURN_ON_TYPING_NOTIFICATION:
      return turnOffTypingForConvo(state, action.id);
    case TURN_OFF_TYPING_NOTIFICATION:
      return turnOnTypingForConvo(state, action.id);

    default:
      return state;
  }
};

export default conversationReducer;
