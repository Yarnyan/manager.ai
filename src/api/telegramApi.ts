import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './customBaseQuery/customBaseQuery';

export const telegramApi = createApi({
  reducerPath: 'telegramApi',
  baseQuery: baseQueryWithReauth(import.meta.env.VITE_API_URL + 'api/telegram'),
  tagTypes: ['Update', 'BotUpdate', 'Auth', 'Create'],
  endpoints: () => ({}),
});

export const { } = telegramApi;
