import {
  SET_USER,
  RESET
} from '../types/auth';

import { RESET_STORE } from '../types/common';

const initialState = {
  user: null
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    case RESET:
    case RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
