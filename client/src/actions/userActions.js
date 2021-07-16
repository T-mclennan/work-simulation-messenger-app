import { GET_USER, SET_FETCHING_STATUS } from './actionTypes'

export const gotUser = (user) => {
  return {
    type: GET_USER,
    user
  };
};

export const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching
});