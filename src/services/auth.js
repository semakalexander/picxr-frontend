import axios from 'axios';
import authActions from '../redux/actions/auth';


const signIn = body => dispatch =>
  axios
    .post('/users/sign-in', body)
    .then(res => {
      dispatch(authActions.setUser(res.data));
      return res;
    });

const signUp = body => dispatch =>
    axios
      .post('/users/', body)
      .then(res => {
        dispatch(authActions.setUser(res.data));
        return res;
      });

export { signIn, signUp };
export default { signIn, signUp };
