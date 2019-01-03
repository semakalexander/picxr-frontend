import axios from 'axios';

import { stringifyQuery } from './utils';

const getUserById = id => axios.get(`/users/${id}`);

const getAllUsers = ({ page = 0, perPage = 10, sortOrder = 'asc', sortBy = ''} = {}) =>
  axios
    .get(stringifyQuery('/users', { page, perPage, sortOrder, sortBy }))
    .then(res => res.data);

export { getUserById, getAllUsers };
export default { getUserById, getAllUsers };
