import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './customBaseQuery/customBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth('http://82.115.223.149:9999/' + 'api'),
  tagTypes: ['Update', 'BotUpdate', 'Auth', 'Create'],
  endpoints: () => ({}),
});

export const { } = api;
