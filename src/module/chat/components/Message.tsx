import AvatarUser from '../../../components/ui/Avatar';

type Props = {
  text: string;
  name: string;
  isFromUser: boolean;
};

export default function Message({ text, name, isFromUser }: Props) {
  const bot = JSON.parse(localStorage.getItem('activePublicBot'));

  const renderMessage = () => {
    return text.split('\n').map((line, index) => (
      <p key={index} className='text-[var(--textColor)]'>
        {line}
      </p>
    ));
  };

  const alter = isFromUser ? 'You' : bot?.botname;

  return (
    <div className='max-w-[70%] mt-4'>
      <div className={`${isFromUser ? 'w-full flex justify-start items-center' : 'w-full flex justify-end items-center'}`}>
        <AvatarUser width={30} height={30} src={''} />
        <p className='text-[var(--textColor)] font-normal ml-2 mr-2 text-[14px]'>{name ? name : alter}</p>
      </div>
      <div className='w-full mt-2 bg-[#303136] p-4 rounded-lg'>
        {renderMessage()}
      </div>
    </div>
  );
}
