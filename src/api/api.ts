import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './customBaseQuery/customBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth(import.meta.env.VITE_API_URL + 'api'),
  tagTypes: ['Update', 'BotUpdate', 'Auth', 'Create'],
  endpoints: () => ({}),
});

export const { } = api;
