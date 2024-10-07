import { createApi } from '@reduxjs/toolkit/query/react';
import { apiUrl } from './routes/routes';
import { baseQueryWithReauth } from './customBaseQuery/customBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth(apiUrl),
  tagTypes: ['Update', 'BotUpdate', 'Auth', 'Create'],
  endpoints: () => ({}),
});

export const { } = api;
