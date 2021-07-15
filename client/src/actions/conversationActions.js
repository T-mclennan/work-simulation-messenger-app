
import { 
  GET_CONVERSATIONS, 
  SET_MESSAGE, 
  ADD_ONLINE_USER, 
  REMOVE_OFFLINE_USER, 
  SET_SEARCHED_USERS, 
  CLEAR_SEARCHED_USERS, 
  ADD_CONVERSATION,
  SET_CONVO_AS_SEEN
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

export const setConversationAsSeen = (username) => {
  return {
    type: SET_CONVO_AS_SEEN,
    payload: { username }
  };
};
