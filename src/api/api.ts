
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://127.0.0.1:8444/api',
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        headers.set("ngrok-skip-browser-warning", "*");
        return headers;
      },
    }),
    tagTypes: ['Update', 'BotUpdate', 'Auth', 'Create'],
    endpoints: () => ({}),
  });

export const { } = api