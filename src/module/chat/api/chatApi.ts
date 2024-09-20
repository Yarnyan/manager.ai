import { api } from "../../../api/api"
import { IMessage } from "../entity/entity"
const chatApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllMessage: build.query<any, unknown>({
            query: () => (
                {
                    url: '/todos/2',
                }),
        }),
        sendMessage: build.mutation<IMessage, any>({
            query: (data) => ({
                url: 'bot',
                method: 'POST',
                body: data
            }),
        })
    }),
    overrideExisting: false,
})

export const { useLazyGetAllMessageQuery, useSendMessageMutation } = chatApi