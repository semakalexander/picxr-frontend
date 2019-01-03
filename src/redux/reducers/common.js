import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  TOGGLE_DRAWER,
  RESET_STORE
} from '../types/common';

const initialState = {
  isDrawerOpen: false
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        isDrawerOpen: true
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        isDrawerOpen: false
      };
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
