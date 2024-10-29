import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customBaseQuery = (baseUrl) => fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set("ngrok-skip-browser-warning", "*");
    headers.set('Accept', '*/*');
    headers.set('Access-Control-Allow-Origin', '*');
    return headers;
  },
});

export const baseQueryWithReauth = (baseUrl) => async (args, api, extraOptions) => {
  let result = await customBaseQuery(baseUrl)(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // localStorage.clear()
    // window.location.href = '/' 
  }

  return result;
};
