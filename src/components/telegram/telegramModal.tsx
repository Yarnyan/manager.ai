import { useState, forwardRef, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { styleModal } from '../modal/modal';
import { IoMdClose } from "react-icons/io";
import { useLazyGetStatusQuery } from '../../module/profile/api/bot';
import AutomaticConnection from './automaticConnection';
import ManualСonnection from './manualСonnection';

type Props = {
    onClosetelegramModal: () => void;
};

type Inputs = {
    Phone?: string;
    Key?: string;
    Hash?: string;
    Code?: string;
    onClosetelegramModal?: () => void;
};

const SettingModal = forwardRef<HTMLDivElement, Props>(({ onClosetelegramModal }, ref) => {
    const [statusBot, setStatusBot] = useState(null);

    const [getStatus, { isLoading: isGetStatusLoading }] = useLazyGetStatusQuery();

    const [connectionType, setConnectionType] = useState('automatic');

    const bot = JSON.parse(localStorage.getItem('activePublicBot') || '{}');

    useEffect(() => {
        getStatus(bot.id).then((res) => {
            setStatusBot(res.data.detail);
        });
    }, [getStatus, bot.id]);

    const isLoading = isGetStatusLoading;

    const handleConnection = () => {
        if (connectionType === 'automatic') {
            return <AutomaticConnection />
        } else {
            return <ManualСonnection />
        }
    }

    return (
        <Box ref={ref} sx={{ ...styleModal }} tabIndex={0}>
            <div className='w-full flex justify-end'>
                <IoMdClose size={24} className='cursor-pointer' onClick={onClosetelegramModal} />
            </div>
            <div className='w-full'>
                <h1 className='text-xl text-[var(--textColor)] font-normal text-center'>manager.ai</h1>
                <p className='text-xl text-[var(--mutedTextColor)] font-[100] text-center mt-[12px]'>Telegram connect</p>
            </div>
            <div className='w-full flex justify-center items-center'>
                <button onClick={() => setConnectionType('automatic')} className={`px-2 py-2 transition-all duration-300 ${connectionType === 'automatic' ? 'text-white' : 'text-gray-600 hover:text-white'}`}>
                    Automatic
                </button>

                <button onClick={() => setConnectionType('manual')} className={`px-2 py-2 rounded-lg transition-all duration-300 ${connectionType === 'manual' ? 'text-white' : 'text-gray-600 hover:text-white'}`}>
                    Manual
                </button>
            </div>
            {isLoading ? (
                <div className='flex justify-center items-center'>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    {statusBot === false ? (
                        handleConnection()
                    ) : (
                        <p className='text-xl text-green-500 font-[100] text-center mt-[12px]'>The bot is connected</p>
                    )}
                </>
            )}
        </Box>
    );
});

export default SettingModal;
