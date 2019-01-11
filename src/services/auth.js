import axios from 'axios';

import Cookies from 'js-cookie';

import authActions from '../redux/actions/auth';

const getCurrentUser = () => {
  const token = Cookies.get('token');
  axios.defaults.headers.common.Authorization = token;

  return axios
    .get('/users/current')
    .then(res => res.data);
};

const signIn = body => dispatch =>
  axios
    .post('/users/sign-in', body)
    .then(res => {
      dispatch(authActions.setUser(res.data.user));
      setToken(res.data.token);
      return res;
    });

const signUp = body => dispatch =>
    axios
      .post('/users/', body)
      .then(res => {
        dispatch(authActions.setUser(res.data));
        return res;
      });
  
const signOut = () => dispatch => {
  Cookies.remove('token');
  delete axios.defaults.headers.common.Authorization;
  dispatch(authActions.setUser(null));
};

const setToken = token => {
  Cookies.set('token', token);
  axios.defaults.headers.common.Authorization = token;
}

export {
  signIn,
  signUp,
  signOut,
  getCurrentUser
};

export default {
  signIn,
  signUp,
  signOut,
  getCurrentUser
};

