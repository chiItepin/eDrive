import ApiCore from './utilities/core';

const url = 'files';

// plural and single may be used for message logic if needed in the ApiCore class.

export const apiFiles = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: true,
  patch: true,
  remove: true,
  url: url,
});