import {
  SET_USER,
  RESET
} from '../types/auth';

const setUser = user => ({ type: SET_USER, user });

const reset = () => ({ type: RESET });

export { setUser, reset };
export default { setUser, reset };
