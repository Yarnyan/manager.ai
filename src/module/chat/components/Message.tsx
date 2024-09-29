import { useEffect } from 'react';
import AvatarUser from '../../../components/ui/Avatar';
import Typewriter from 'typewriter-effect';

type Props = {
  text: string;
  name: string;
  isFromUser: boolean;
};

export default function Message({ text, name, isFromUser }: Props) {
  const bot = JSON.parse(localStorage.getItem('activePublicBot'));

  const renderMessage = () => {
    if (name === bot?.botname) {
      return (
        <Typewriter
          options={{
            strings: [text],
            autoStart: true,
            loop: false,
            delay: 30,
            deleteSpeed: 10000000000,
            cursor: '',
          }}
        />
      );
    } else {
      return <p className='text-[var(--textColor)] font-[100]'>{text}</p>;
    }
  };

  const alter = isFromUser ? 'You' : bot?.botname;

  return (
    <div className='max-w-[70%] mt-4'>
      <div className={`${isFromUser ? 'w-full flex justify-start items-center flex' : 'w-full flex justify-start items-center flex-row-reverse'}`}>
        <AvatarUser width={30} height={30} src={''} />
        <p className='text-[var(--textColor)] font-normal ml-2 mr-2 text-[14px]'>{name ? name : alter}</p>
      </div>
      <div className='w-full mt-2 bg-[#303136] p-4 rounded-lg'>
        {renderMessage()}
      </div>
    </div>
  );
}
