const stringifyQuery = (api, queryConfig) => { // or (config)
  if (!queryConfig) {
    queryConfig = api;
    api = '';
  }
  
  return Object
    .keys(queryConfig)
    .reduce((url, key) => queryConfig[key] === undefined ? url : `${url}&${key}=${queryConfig[key]}`, `${api}?`);
};

export {
  stringifyQuery
};

export default {
  stringifyQuery
};
