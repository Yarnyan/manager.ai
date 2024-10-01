
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://127.0.0.1:8443/',
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        headers.set("ngrok-skip-browser-warning", "*");
        headers.set('Accept', '*/*');
        headers.set('Access-Control-Allow-Origin', '*',)
        return headers;
      },
    }),
    tagTypes: ['Update', 'BotUpdate', 'Auth', 'Create'],
    endpoints: () => ({}),
  });

export const { } = chatApi