import {SET_ACTIVE_CHAT} from './actionTypes'

export const setActiveChat = (userId) => {
  return {
    type: SET_ACTIVE_CHAT,
    userId
  };
};