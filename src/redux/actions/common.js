import {
  RESET_STORE,
  TOGGLE_DRAWER,
  CLOSE_DRAWER,
  OPEN_DRAWER
} from '../types/common';

const resetStore = () => ({ type: RESET_STORE });

const openDrawer = () => ({ type: OPEN_DRAWER })

const closeDrawer = () => ({ type: CLOSE_DRAWER });

const toggleDrawer = () => ({ type: TOGGLE_DRAWER });

export {
  resetStore,
  openDrawer,
  closeDrawer,
  toggleDrawer
};
export default {
  resetStore,
  openDrawer,
  closeDrawer,
  toggleDrawer
};
