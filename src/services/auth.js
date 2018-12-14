import axios from 'axios';

const signIn = body =>
  axios
    .post('/users/sign-in', body)
    .then(res => {
      console.log(res);
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
