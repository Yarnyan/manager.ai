import { api } from "../../../api/api"

const bannersApi = api.injectEndpoints({
    endpoints: (build) => ({
        createBot: build.mutation<any, any>({
            query: (data) => ({
                url: '/Bot/createBot',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Create']
        }),
        getPublicBots: build.query<any, any>({
            query: () => ({
                url: '/Bot/getPublicBots',
            }),
            providesTags: ['Auth']
        }),
    }),
    overrideExisting: false,
})

export const { useCreateBotMutation, useLazyGetPublicBotsQuery } = bannersApi