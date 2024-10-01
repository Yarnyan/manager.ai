
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from './routes/routes';
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: apiUrl,
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