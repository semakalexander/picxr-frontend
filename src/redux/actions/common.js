import {
  RESET_STORE,
  OPEN_LEFT_SIDEBAR,
  OPEN_RIGHT_SIDEBAR,
  CLOSE_LEFT_SIDEBAR,
  CLOSE_RIGHT_SIDEBAR,
  TOGGLE_LEFT_SIDEBAR,
  TOGGLE_RIGHT_SIDEBAR
} from '../types/common';

const resetStore = () => ({ type: RESET_STORE });

const openLeftSidebar = () => ({ type: OPEN_LEFT_SIDEBAR });

const openRightSidebar = () => ({ type: OPEN_RIGHT_SIDEBAR });

const closeLeftSidebar = () => ({ type: CLOSE_LEFT_SIDEBAR });

const closeRightSidebar = () => ({ type: CLOSE_RIGHT_SIDEBAR });

const toggleLeftSidebar = () => ({ type: TOGGLE_LEFT_SIDEBAR });

const toggleRightSidebar = () => ({ type: TOGGLE_RIGHT_SIDEBAR });

export {
  resetStore,
  openLeftSidebar,
  openRightSidebar,
  closeLeftSidebar,
  closeRightSidebar,
  toggleLeftSidebar,
  toggleRightSidebar
};
export default {
  resetStore,
  openLeftSidebar,
  openRightSidebar,
  closeLeftSidebar,
  closeRightSidebar,
  toggleLeftSidebar,
  toggleRightSidebar
};
