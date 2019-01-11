import {
  OPEN_LEFT_SIDEBAR,
  CLOSE_LEFT_SIDEBAR,
  TOGGLE_LEFT_SIDEBAR,
  OPEN_RIGHT_SIDEBAR,
  CLOSE_RIGHT_SIDEBAR,
  TOGGLE_RIGHT_SIDEBAR,
  RESET_STORE
} from '../types/common';

const initialState = {
  isLeftSidebarOpen: false,
  isRightSidebarOpen: false
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_LEFT_SIDEBAR:
      return {
        ...state,
        isLeftSidebarOpen: true
      };
    case OPEN_RIGHT_SIDEBAR:
      return {
        ...state,
        isRightSidebarOpen: true
      };
    case CLOSE_LEFT_SIDEBAR:
      return {
        ...state,
        isLeftSidebarOpen: false
      };
    case CLOSE_RIGHT_SIDEBAR:
      return {
        ...state,
        isRightSidebarOpen: false
      };
    case TOGGLE_LEFT_SIDEBAR:
      return {
        ...state,
        isLeftSidebarOpen: !state.isLeftSidebarOpen
      };
    case TOGGLE_RIGHT_SIDEBAR:
      return {
        ...state,
        isRightSidebarOpen: !state.isRightSidebarOpen
      };
    case RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
