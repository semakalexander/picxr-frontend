import axios from 'axios';
import authActions from '../redux/actions/auth';


// TODO redux thunk, save user to store
const signIn = body =>
  axios
    .post('/users/sign-in', body)
    .then(res => {
      // authActions.setUser()
      return res.data
    });

const signUp = body =>
    axios
      .post('/users/', body)
      .then(res => {
        console.log(res);
        return res.data;
      });

export { signIn, signUp };
export default { signIn, signUp };
