import { useState, useEffect, useRef } from 'react';
import { BiMenuAltLeft } from "react-icons/bi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from 'react-router-dom';
import { RiMagicLine } from "react-icons/ri";
import SidebarBanner from '../../components/sidebarBanner/SidebarBanner';
import { useLocation } from 'react-router-dom';
import { useLazyGetChatsQuery } from '../chat/api/chatApi';
import { useLazyGetUserBotsQuery } from '../profile/api/user';
import { useLazyGetPublicBotsQuery } from '../banners/api/banners';
import { FaRegStar } from "react-icons/fa6";

type Props = {}

export default function SideBar({ }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [token, setToken] = useState<boolean | null>(null);

  const [getUserBots, botsResult] = useLazyGetUserBotsQuery();
  const [getChats, chatsResult] = useLazyGetChatsQuery();
  const [getPublicBots, publicBots] = useLazyGetPublicBotsQuery();

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(true);
    } else {
      setToken(false);
    }

    try {
      if (token) {
        getChats(null).then(() => {
          getUserBots(null);
          getPublicBots(null);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  const filteredBots = [
    ...(botsResult.data || []),
    ...(publicBots.data || [])
  ].filter((bot: any) =>
    chatsResult.data?.some((chat: any) => chat.botId === bot.id) &&
    bot.botname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (token === null) {
    return null;
  }

  return (
    <aside className='relative z-50'>
      <div className='w-full h-full flex'>
        <div ref={sidebarRef} className={`sm:h-[100dvh] fixed z-50 top-0 left-0 h-full transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-[var(--sideBarColor)] shadow-lg z-20 border-r-[1px] border-[var(--borderColor)] px-4 pt-6`}>
          <div className="flex justify-between items-center">
            <Link to={'/'} className='text-xl font-normal text-[var(--textColor)] mt-2' onClick={toggleSidebar}>manager.ai</Link>
            <button onClick={toggleSidebar} className={`rounded-full hover:bg-[var(--hoverColor)] p-1`} >
              <MdKeyboardArrowLeft className='h-[28px] w-[28px] fill-[var(--iconColor)]' />
            </button>
          </div>
          <Link to={'/create'} onClick={toggleSidebar} className='mt-4 text-s font-normal bg-[#26272b] h-[40px] rounded-2xl text-[var(--textColor)] hover:bg-[var(--hoverColor)] duration-300 flex items-center p-4 justify-center'>
            <RiMagicLine size={20} />
            <p className='ml-1'>Create</p>
          </Link>
          <Link to={"/tarrifs"} onClick={toggleSidebar} className='mt-2 text-s font-normal h-[40px] rounded-lg text-[var(--textColor)] bg-[#2E3036] hover:bg-[#4A4F54] duration-300 flex items-center p-4 justify-center border border-[var(--borderColor)]'>
            <FaRegStar size={20} />
            <p className='ml-1'>Tariffs</p>
          </Link>
          <div>
            <input
              type='text'
              placeholder='Search for chat rooms'
              className='border-0 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded mt-3 w-full'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <h1 className='mt-4 text-m font-normal text-[var(--mutedTextColor)]'>Your chats</h1>
          <div className='mt-2 max-h-[calc(100vh-240px)] overflow-y-auto'>
            {filteredBots?.map((bot: any) => (
              <SidebarBanner id={bot.id} key={bot.id} image={''} botname={bot.botname} closeBanner={toggleSidebar} description={bot.description} />
            ))}
          </div>
        </div>
        <div className='m-5 z-10 ml-1'>
          {token ? (
            <button
              className={`rounded-full hover:bg-[var(--hoverColor)] p-1 ${isOpen ? 'hidden' : 'block'}`}
              onClick={toggleSidebar}
            >
              <BiMenuAltLeft className='h-[32px] w-[32px] fill-[var(--iconColor)]' />
            </button>
          ) : (
            <Link className='text-xl font-normal text-[var(--textColor)] mt-2 ml-4 sm:ml-0' to={'/'} >Manager.ai</Link>
          )}
        </div>
      </div>
    </aside>
  );
}
