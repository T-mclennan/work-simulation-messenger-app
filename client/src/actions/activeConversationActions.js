import {SET_ACTIVE_CHAT} from './actionTypes'

export const setActiveChat = (username) => {
  return {
    type: SET_ACTIVE_CHAT,
    username
  };
};