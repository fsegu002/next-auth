import fetch from 'isomorphic-unfetch';
import isServer from './isServer';

const getAuth = req => {
  if (isServer()) {
    if (req.user) {
      return { Authorization: `JWT ${req.user.token}` };
    }
  } else {
    if (localStorage.getItem('user')) {
      return { Authorization: `JWT ${JSON.parse(localStorage.getItem('user')).user.jwt}` };
    }
  }
  return {};
};

const http = async ({ url, method, data, req = {}, options }) => {
  const extraHeaders = {
    ...options,
    ...getAuth(req)
  };

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  return { ok: response.ok, data: result };
};

module.exports = http;
