import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './customBaseQuery/customBaseQuery';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth(import.meta.env.VITE_API_URL),
  tagTypes: ['Update', 'BotUpdate', 'Auth', 'Create'],
  endpoints: () => ({}),
});

export const { } = chatApi;
