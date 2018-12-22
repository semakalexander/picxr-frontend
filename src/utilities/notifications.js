import { toast } from 'react-toastify';

const standart = (message, ...options) => toast(message, options);

const success = (message, ...options) => toast.success(message, options);

const error = (message, ...options) => toast.error(message, options);

const warning = (message, ...options) => toast.warning(message, options);

const info = (message, ...options) => toast.info(message, options);

export { standart, success, error, warning, info };
export default { standart, success, error, warning, info };
