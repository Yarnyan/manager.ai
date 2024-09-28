import { api } from "../../../api/api"
import { IMessage } from "../entity/entity"
const chatApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllMessage: build.query<any, unknown>({
            query: () => (
                {
                    url: '/Chat/getChats',
                }),
        }),
        sendMessage: build.mutation<IMessage, any>({
            query: (data) => ({
                url: '/Chat/sendMessage',
                method: 'POST',
                body: data
            }),
        }),
        getChats: build.query<any, any>({
            query: () => ({
                url: '/Chat/getChats',
            }),
        })
    }),
    overrideExisting: false,
})

export const { useGetAllMessageQuery, useSendMessageMutation, useLazyGetChatsQuery } = chatApi