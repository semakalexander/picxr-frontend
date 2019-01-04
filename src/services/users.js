import axios from 'axios';

import { stringifyQuery } from './utils';

const getUserById = id => axios.get(`/users/${id}`);

const getAllUsers = ({ page = 0, perPage = 10, sortOrder = 'asc', sortBy = ''} = {}) =>
  axios
    .get(stringifyQuery('/users', { page, perPage, sortOrder, sortBy }))
    .then(res => res.data);

const remove = id => axios.delete(`/users/${id}`);

export {
  getUserById,
  getAllUsers,
  remove
};
export default {
  getUserById,
  getAllUsers,
  remove
};
