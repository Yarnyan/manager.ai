import { api } from "../../../api/api"

const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<any, any>({
            query: () => ({
                url: '/User/getInfo',
                method: 'GET',
            }),
            providesTags: ['Update'],
        }),
        userUpdate: build.mutation<any, any>({
            query: (data) => ({
                url: '/User/update',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Update'],
        }),
        getUserBots: build.query<any, any>({
            query: () => ({
                url: '/Bot/getPrivateBots',
                method: 'GET',
            }),
            providesTags: ['BotUpdate'],
        }),
        updateBot: build.mutation<any, any>({
            query: (data) => ({
                url: '/Bot/updateBot',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['BotUpdate'],
        }),
        getBotData: build.query<any, any>({
            query: (id) => ({
                url: `/Bot/getBot?botId=${id}`,
                method: 'GET',
            }),
            providesTags: ['BotUpdate'],
        }),
        getSub: build.query<any, any>({
            query: (id) => ({
                url: `/Subscription/getSub`,
                method: 'GET',
            }),
        }), 
    }),
    overrideExisting: false,
})

export const { useLazyGetUserQuery, useUserUpdateMutation, useLazyGetUserBotsQuery, useUpdateBotMutation, useLazyGetBotDataQuery, useLazyGetSubQuery } = userApi