import React, { useState, useEffect } from 'react';
import AvatarUser from '../../components/ui/Avatar';
import { CiSettings } from "react-icons/ci";
import Helpers from './components/Helpers';
import { useLazyGetUserQuery } from './api/user';
import { useAppDispatch } from '../../store/hooks';
import { addUser } from '../../store/features/user/userSlice';
import { Bot } from './entity/bot';
import Create from '../create/Create';
import { useLazyGetChatsQuery } from '../chat/api/chatApi';
import { useLazyGetUserBotsQuery } from './api/user';
import { useLazyGetPublicBotsQuery } from '../banners/api/banners';
import { useLazyGetSubQuery } from './api/user';
import Loader from '../../components/loader/Loader';

type Props = {
    settingModal: () => void;
    telegramModal: () => void;
}

export default function Profile({ settingModal, telegramModal }: Props) {
    const [activeButton, setActiveButton] = useState<'helpers' | 'tasks' | null>('helpers');

    const [loading, setLoading] = useState<boolean>(false);
    
    const dispatch = useAppDispatch();

    const [getUser, { data: user }] = useLazyGetUserQuery();
    const [getBots, { data: bots }] = useLazyGetUserBotsQuery();
    const [getChats, chatsResult] = useLazyGetChatsQuery();
    const [getPublicBots, publicBots] = useLazyGetPublicBotsQuery();
    const [getSubscribed, subscribedUser] = useLazyGetSubQuery();

    const handleClick = (button: 'helpers' | 'tasks') => {
        setActiveButton(button);
    }

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
    
        const fetchData = async () => {
            try {
                const userResponse = await getUser(null);
                if (userResponse.data) {
                    dispatch(addUser(userResponse.data?.detail));
                    localStorage.setItem('user', JSON.stringify(userResponse.data.detail));
                }
                await getChats(null);
                await getPublicBots(null);
                await getBots(null);
                await getSubscribed(null);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); 
            }
        };
    
        fetchData();
    }, []);
    

    const filteredBots = [
        ...(bots || []),
        ...(publicBots.data || [])
    ].filter((bot: any) =>
        chatsResult.data?.some((chat: any) => chat.botId === bot.id)
    );

    if (loading) {
        return <Loader />
    }

    return (
        <div className="flex flex-col justify-center w-full items-center mt-32 sm:mt-8">
            <AvatarUser width={100} height={100} />
            <h1 className='text-2xl font-normal text-[var(--textColor)] text-center mt-4'>{user?.detail?.username}</h1>
            <h1 className='text-l font-normal text-[var(--mutedTextColor)] text-center mt-2'>Your status: <span className='text-[var(--textColor)]'>{subscribedUser.data?.subscription.name}</span></h1>
            <h1 className='text-[14px] font-normal text-[var(--mutedTextColor)] text-center'>Your tokens: <span className='text-[var(--textColor)]'>{subscribedUser.data?.subscription.tokens}</span></h1>
            <div className='flex mt-4'>
                <button className='flex items-center text-[#000000] duration-300 hover:bg-[#d3d3d6] bg-[#F5F5F5] rounded-2xl p-2' onClick={settingModal}>
                    <CiSettings fill='#000000' size={24} />
                    <p className='ml-1 font-normal text-l'>Settings</p>
                </button>
            </div>
            {bots && bots.length > 0 && (
                <div className='mt-4 flex'>
                    <div
                        className={`relative text-m font-normal text-[var(--mutedTextColor)] ${activeButton === 'helpers' ? 'after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-[var(--mutedTextColor)] after:left-0 after:bottom-[-2px]' : ''}`}
                        onClick={() => handleClick('helpers')}
                    >
                        My assistants
                    </div>
                </div>
            )}
            <div className={`flex flex-col max-h-[calc(100vh-500px)] p-4 ${bots && bots.length > 0 ? 'sm:max-h-[calc(100dvh-400px)] overflow-y-auto' : ''} sm:w-full`}>
                {filteredBots && filteredBots.length > 0 ? (
                    filteredBots.map((item: Bot) => {
                        return (
                            <Helpers
                                key={item.id}
                                image={''}
                                botname={item.botname}
                                description={item.description}
                                prompt={item.prompt}
                                id={item.id}
                                type={item.type}
                                telegramModal={telegramModal}
                            />
                        );
                    })
                ) : (
                    <Create profile={true} />
                )}
            </div>
        </div>
    );
}