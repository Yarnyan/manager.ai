import React, { useState, useEffect } from 'react'
import AvatarUser from '../../components/ui/Avatar';
import { CiSettings } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import Helpers from './components/Helpers';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useCopyToClipboard } from 'usehooks-ts'
import { useLazyGetUserQuery } from './api/user';
import { useAppDispatch } from '../../store/hooks';
import { addUser } from '../../store/features/user/userSlice';
import { useLazyGetUserBotsQuery } from './api/user';
import { Bot } from './entity/bot';
import Loader from '../../components/loader/Loader';
type Props = {
    settingModal: () => void
    telegramModal: () => void
}

export default function Profile({ settingModal, telegramModal }: Props) {
    const [activeButton, setActiveButton] = useState<'helpers' | 'tasks' | null>('helpers')
    const [copiedText, copy] = useCopyToClipboard()
    const dispatch = useAppDispatch()
    const [getUser, user] = useLazyGetUserQuery()
    const [getBots, {data: bots, isLoading}] = useLazyGetUserBotsQuery()


    const handleClick = (button: 'helpers' | 'tasks') => {
        setActiveButton(button)
    }

    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            getUser(null).then((response) => {
                if (response.data) {
                    dispatch(addUser(response.data?.detail));
                    localStorage.setItem('user',JSON.stringify(response.data.detail))
                }
            });
        } catch (error) {

        }
        return () => {

        };
    }, []);

    useEffect(() => {
        try {
            getBots(null)
        } catch (error) {

        }
        return () => {

        };
    }, []);

    if(isLoading) {
        return <Loader />
    }

    const handleClickSnackbar = () => {
        const currentUrl = window.location.href;
        copy(currentUrl);
        setOpen(true);
        console.log(copiedText);
    };

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <div className="flex flex-col justify-center w-full items-center mt-40 sm:mt-8">
            <AvatarUser width={100} height={100} />
            <h1 className='text-2xl font-normal text-[var(--textColor)] text-center mt-4'>{user.data?.detail?.username}</h1>
            <div className='flex mt-4'>
                <button className='flex items-center text-[#000000] duration-300 hover:bg-[#d3d3d6] bg-[#F5F5F5] rounded-2xl p-2' onClick={settingModal}>
                    <CiSettings fill='#000000' size={24} />
                    <p className='ml-1 font-normal text-l'>Settings</p>
                </button>
                <button className='ml-2 flex items-center text-[#000000] duration-300 hover:bg-[var(--hoverColor)] rounded-full p-2 border-[1px] border-[#26272b]' onClick={handleClickSnackbar}>
                    <CiShare2 fill='#fff' size={24} />
                </button>
            </div>
            <div className='mt-4 flex'>
                <button
                    className={`relative text-m font-normal text-[var(--mutedTextColor)] ${activeButton === 'helpers' ? 'after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-[var(--mutedTextColor)] after:left-0 after:bottom-[-2px]' : ''}`}
                    onClick={() => handleClick('helpers')}
                >
                    My assistants
                </button>
            </div>
            <div className='flex flex-col max-h-[calc(100vh-500px)] overflow-y-auto p-4 sm:max-h-[calc(100dvh-400px)] sm:w-full'>
                {bots && bots.length > 0 && bots.map((item:Bot) => {
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
                    )
                })}
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Profile link successfully copied
                </Alert>
            </Snackbar>
        </div>
    )
}
