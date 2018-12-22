import {
  TOGGLE_DRAWER,
  RESET_STORE
} from '../types/common';

const initialState = {
  isDrawerOpen: false
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen
      };
    case RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
