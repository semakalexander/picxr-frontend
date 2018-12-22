import { RESET_STORE, TOGGLE_DRAWER } from '../types/common';

const resetStore = () => ({ type: RESET_STORE });

const toggleDrawer = () => ({ type: TOGGLE_DRAWER });

export { resetStore, toggleDrawer };
export default { resetStore, toggleDrawer };
