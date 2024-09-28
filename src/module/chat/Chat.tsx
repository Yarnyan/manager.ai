import { useEffect, useRef, useState } from 'react';
import AvatarUser from '../../components/ui/Avatar';
import Message from './components/Message';
import { useGetAllMessageQuery } from './api/chatApi';
import { IoMdSend } from "react-icons/io";
import Loader from '../../components/loader/Loader';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { IMessage } from './entity/entity';
import { useAppSelector } from '../../store/hooks';
import { useLazyGetChatsQuery, useSendMessageMutation } from './api/chatApi';


export default function Chat() {
  const chatRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const connectionRef = useRef<HubConnection | null>(null);

  const [m, setM] = useState('');

  const { data, isLoading } = useGetAllMessageQuery(null);
  const [getChats, chats] = useLazyGetChatsQuery();
  const [sendMessage] = useSendMessageMutation();

  const bot = useAppSelector((state) => state.bots.activePublicBot);
  console.log(bot)

  const token = localStorage.getItem('token');

  useEffect(() => {
    try {
      getChats(null).then((res) => {
        console.log(res)
      })
    } catch (error) {

    }
  }, []);

    useEffect(() => {
      const connection = new HubConnectionBuilder()
          .withUrl('/chat/hub', {
              accessTokenFactory: () => Promise.resolve(token || '')
          })
          .configureLogging(LogLevel.Information)
          .build();

      connection.start()
          .then(() => console.log('Connection started'))
          .catch(error => console.log('Error establishing connection', error));

      connection.on('Receive', (message: string, userId: number, chatId: number, timeSpan: string) => {
          setMessages((prevMessages: any) => {
              return [
                  ...prevMessages,
                  {
                      text: message,
                      fromId: userId,
                  }
              ];
          });
      });

      connectionRef.current = connection;

      return () => {
          connection.stop().then(() => console.log('Connection stopped'));
      };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading) {
    return <Loader />;
  }

  const handleSendMessage = (message: string) => {
    const formData = new FormData();
    formData.append("message", message);
    formData.append("id", String(bot?.id))

    try {
      if(m) {
        const response = sendMessage(formData).unwrap();
        setM('')
      }
    } catch (error) {

    }
  }

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='mt-4 w-full flex flex-col items-center'>
        <div className='w-full'>
          <div className='mt-4 w-full flex flex-col items-center overflow-y-auto h-[calc(100vh-190px)] sm:h-[calc(100dvh-190px)] p-2' ref={chatRef}>
            <>
              <div className='flex flex-col items-center p-4'>
                <AvatarUser width={70} height={70} />
                <p className='text-s text-[var(--mutedTextColor)] font-normal mt-4 sm:text-center'>{bot?.description}</p>
                <p className='text-[14px] text-[var(--mutedTextColor)] font-normal'>Author: @Root</p>
              </div>
              <div className='flex flex-col w-full mt-4 max-w-3xl'>
                {messages && messages.length > 0 && (
                  messages.map((item: IMessage, index: number) => (
                    <div key={index} className={`${item.user_id === 2 ? 'w-full flex justify-end' : 'w-full flex justify-start'}`}>
                      <Message text={item.text} name={item.name} user_id={item.user_id} img={item.image} />
                    </div>
                  ))
                )}
              </div>
            </>
          </div>
          <div className='h-[60px] mt-4 flex items-center justify-center flex-col'>
            <div className='w-full flex items-center justify-center'>
              <input placeholder='Message' className='w-[40%] border-0 mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded-l sm:w-[80%]' onChange={(e) => setM(e.target.value)} value={m} />
              <div className='bg-[#303136] bg-[#303136] mt-1 rounded-r cursor-pointer w-[40px] h-[40px] flex items-center justify-center' onClick={() => handleSendMessage(m)}>
                <IoMdSend className='' fill='#F5F5F5' size={20} />
              </div>
            </div>
            <p className='text-[var(--mutedTextColor)] text-[14px] mt-2 sm:text-center sm:mt-1 sm:hidden'>Помните: все что говорит manager будет видно всем</p>
          </div>
        </div>
      </div>
    </div>
  );
}
