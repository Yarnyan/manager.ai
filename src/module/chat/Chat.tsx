import { useEffect, useRef, useState } from 'react';
import AvatarUser from '../../components/ui/Avatar';
import Message from './components/Message';
import { IoMdSend } from "react-icons/io";
import Loader from '../../components/loader/Loader';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useLazyGetChatsQuery, useSendMessageMutation, useLazyGetAllMessageQuery } from './api/chatApi';
import { isApiError } from '../../helpers/auth/apiError';
import { useLocation } from 'react-router';

export default function Chat() {
  const chatRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([]);
  const connectionRef = useRef<HubConnection | null>(null);
  const [m, setM] = useState('');

  const [getChats] = useLazyGetChatsQuery();
  const [getMessages, { isLoading }] = useLazyGetAllMessageQuery();
  const [sendMessage] = useSendMessageMutation();
  const location = useLocation()
  const token = localStorage.getItem('token');
  const bot = JSON.parse(localStorage.getItem('activePublicBot'));
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    try {
      getChats(null).then((res) => {
        const chatsData = res?.data || [];
        const matchedChat = chatsData.find(chat => chat.botId === bot?.id);
        if (matchedChat) {
          getMessages(matchedChat.id).then((data) => {
            setMessages(data?.data?.detail || []);
          }).catch((error) => {
            console.error(error);
          });
        }
      });
    } catch (error) {
      console.log(isApiError(error));
    }
  }, [location]);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('http://127.0.0.1:8443/chat/hub', {
        accessTokenFactory: () => Promise.resolve(token || '')
      })
      .configureLogging(LogLevel.Information)
      .build();

    connection.start()
      .then(() => console.log('Connection started'))
    // .catch(error => console.log('Error establishing connection', error));

    connection.on('ReceiveMessage', (message: string, chatId: number, isFromUser: boolean) => {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        {
          text: message,
          chatId: chatId,
          isFromUser: isFromUser,
          name: isFromUser ? 'You' : bot?.botname,
        }
      ]);
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
    formData.append("botId", String(bot?.id));

    const newMessage = {
      text: message,
      name: 'You',
      isFromUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      if (m) {
        sendMessage(formData).unwrap();
        setM('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage(m);
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='flex-1 w-full flex flex-col items-center overflow-y-auto p-2' ref={chatRef}>
        <>
          <div className='flex flex-col items-center p-4'>
            <AvatarUser width={70} height={70} />
            <p className='text-s text-[var(--mutedTextColor)] font-normal mt-4 sm:text-center'>{bot?.botname}</p>
            <p className='text-[14px] text-[var(--mutedTextColor)] font-normal'>Author: @Root</p>
          </div>
          <div className='flex flex-col w-full mt-4 max-w-3xl'>
            {messages.length > 0 && messages.map((item, index) => (
              <div key={index} className={`${item.isFromUser ? 'w-full flex justify-start' : 'w-full flex justify-end'}`}>
                <Message isFromUser={item.isFromUser} name={item.name} text={item.text} />
              </div>
            ))}
          </div>
        </>
      </div>
      <div className='w-full p-4 fixed bottom-0'>
        <div className='flex items-center justify-center'>
          <input
            placeholder='Message'
            className='w-[40%] border-0 outline-0 p-[10px] h-[50px] text-[var(--textColor)] bg-[#303136] rounded-l sm:w-[80%]'
            onChange={(e) => setM(e.target.value)}
            value={m}
            onKeyDown={handleKeyDown}
          />
          <div className='bg-[#303136] rounded-r cursor-pointer w-[40px] h-[50px] flex items-center justify-center' onClick={() => handleSendMessage(m)}>
            <IoMdSend fill='#F5F5F5' size={20} />
          </div>
        </div>
        <p className='text-[var(--mutedTextColor)] text-[14px] mt-2 sm:text-center sm:mt-1 sm:hidden'>
          Remember: everything the manager says will be seen by everyone.
        </p>
      </div>
    </div>

  );
}
