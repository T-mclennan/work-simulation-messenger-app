
import { 
  GET_CONVERSATIONS, 
  SET_MESSAGE, 
  ADD_ONLINE_USER, 
  REMOVE_OFFLINE_USER, 
  SET_SEARCHED_USERS, 
  CLEAR_SEARCHED_USERS, 
  ADD_CONVERSATION,
  SET_CONVO_AS_SEEN,
  INCREMENT_UNSEEN_COUNT,
  SET_LAST_MESSAGE_READ,
  TURN_OFF_TYPING_NOTIFICATION,
  TURN_ON_TYPING_NOTIFICATION
} from './actionTypes'

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

export const setNewMessage = (message, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null },
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

export const setConversationAsSeen = (id) => {
  return {
    type: SET_CONVO_AS_SEEN,
    id,
  };
};

export const incrementUnseenCountOfConvo = (id) => {
  return {
    type: INCREMENT_UNSEEN_COUNT,
    id,
  };
};

export const setMessageReadInConvo = (messageId, convoId) => {
  return {
    type: SET_LAST_MESSAGE_READ,
    payload: { messageId, convoId }

export const newTypingNotification = (convoId, action) => {
  if (action === 'isTyping') return turnOnTypingNotification(convoId);
  if (action === 'stoppedTyping') return turnOffTypingNotification(convoId);
}

export const turnOnTypingNotification = (id) => {
  return {
    type: TURN_OFF_TYPING_NOTIFICATION,
    id
  }
}

export const turnOffTypingNotification = (id) => {
  return {
    type: TURN_ON_TYPING_NOTIFICATION,
    id
  }
}
