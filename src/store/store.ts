import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './features/user/userSlice'
import botSliceReducer from './features/bots/botsSlice'
import { api } from '../api/api'
import { chatApi } from '../api/chatApi'
export const makeStore = () => {
  return configureStore({
    reducer: {
        user: userSliceReducer,
        [api.reducerPath]: api.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        bots: botSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, chatApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']