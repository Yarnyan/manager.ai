import { useEffect, useRef, useState, startTransition } from 'react';
import AvatarUser from '../../components/ui/Avatar';
import { chatData } from './data/data';
import Message from './components/Message';
import { useLazyGetAllMessageQuery } from './api/chatApi';
import { IoMdSend } from "react-icons/io";
import Loader from '../../components/loader/Loader';

export default function Chat() {
  const chatRef = useRef<HTMLDivElement>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [getAllMessage, { data, isLoading }] = useLazyGetAllMessageQuery();

  useEffect(() => {
    startTransition(() => {
      setTransitioning(true);
      getAllMessage(null).finally(() => setTransitioning(false));
    });
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [data, isLoading, transitioning]);

  if (isLoading || transitioning) {
    return <Loader />;
  }

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='mt-8 w-full flex flex-col items-center'>
        <div className='w-full'>
          <div className='mt-4 w-full flex flex-col items-center overflow-y-auto h-[calc(100vh-160px)] sm:h-[calc(100dvh-160px)] p-2' ref={chatRef}>
            <>
              <div className='flex flex-col items-center p-4'>
                <AvatarUser width={70} height={70} />
                <p className='text-s text-[var(--mutedTextColor)] font-normal mt-4 sm:text-center'>A School Bully who loves to humiliate students.</p>
                <p className='text-[14px] text-[var(--mutedTextColor)] font-normal'>Author: @Simona</p>
              </div>
              <div className='flex flex-col w-full mt-4 max-w-3xl'>
                {chatData.map((item, index) => (
                  <div key={index} className={`${item.user_id === 2 ? 'w-full flex justify-end' : 'w-full flex justify-start'}`}>
                    <Message text={item.text} name={item.name} user_id={item.user_id} img={item.image} />
                  </div>
                ))}
              </div>
            </>
          </div>
          <div className='h-[60px] mt-4 flex items-center justify-center flex-col'>
            <div className='w-full flex items-center justify-center'>
              <input placeholder='Message' className='w-[40%] border-0 mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded-l sm:w-[80%]' />
              <div className='bg-[#303136] bg-[#303136] mt-1 rounded-r cursor-pointer w-[40px] h-[40px] flex items-center justify-center'>
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
