import axios from 'axios';

const setBackgroundImage = (file) => {
  const fd = new FormData();

  fd.set('image', file);

  return axios
    .put('/admin/combiner/background-image', fd)
    .then(res => console.log(res))
    .catch(console.error);
};


export default {
  setBackgroundImage
};
