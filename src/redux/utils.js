const bindActionCreators = config =>
  dispatch =>
    Object
      .keys(config)
      .reduce((o, key) => ({
        ...o,
        [key]: (...params) => dispatch(config[key](...params))
      }), { dispatch });

export {
  bindActionCreators
};

export default {
  bindActionCreators
};
