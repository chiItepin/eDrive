import ApiCore from './utilities/core';

const url = 'users';

// plural and single may be used for message logic if needed in the ApiCore class.

export const apiUsers = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: false,
  patch: true,
  delete: false,
  url: url,
});