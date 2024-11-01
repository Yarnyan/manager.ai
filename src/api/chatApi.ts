import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './customBaseQuery/customBaseQuery';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth('http://82.115.223.149:9999/'),
  tagTypes: ['Update', 'BotUpdate', 'Auth', 'Create'],
  endpoints: () => ({}),
});

export const { } = chatApi;
