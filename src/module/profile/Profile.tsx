import React, { useState } from 'react'
import AvatarUser from '../../components/ui/Avatar';
import { CiSettings } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { helpers } from './data/data';
import Helpers from './components/Helpers';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useCopyToClipboard } from 'usehooks-ts'

type Props = {
    settingModal: () => void
}

export default function Profile({ settingModal }: Props) {
    const [activeButton, setActiveButton] = useState<'helpers' | 'tasks' | null>('helpers')
    const [copiedText, copy] = useCopyToClipboard()
    const handleClick = (button: 'helpers' | 'tasks') => {
        setActiveButton(button)
    }

    const [open, setOpen] = React.useState(false);

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
        <div className="flex flex-col justify-center w-full items-center mt-40 sm:mt-16">
            <AvatarUser width={100} height={100} />
            <h1 className='text-2xl font-normal text-[var(--textColor)] text-center mt-4'>yarnyan</h1>
            <div className='flex mt-4'>
                <button className='flex items-center text-[#000000] duration-300 hover:bg-[#d3d3d6] bg-[#F5F5F5] rounded-2xl p-2' onClick={settingModal}>
                    <CiSettings fill='#000000' size={24} />
                    <p className='ml-1 font-normal text-l'>Настройки</p>
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
                    Мои помощники
                </button>
                {/* <button
                    className={`ml-4 relative text-m font-normal text-[var(--mutedTextColor)] ${activeButton === 'tasks' ? 'after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-[var(--mutedTextColor)] after:left-0 after:bottom-[-2px]' : ''}`}
                    onClick={() => handleClick('tasks')}
                >
                    Мои задачи
                </button> */}
            </div>
            <div className='flex mt-4 flex-col max-h-[calc(100vh-500px)] overflow-y-scroll p-4 sm:max-h-[calc(100dvh-400px)]'>
                {helpers.map((item) => {
                    return (
                        <Helpers
                            key={item.id}
                            image={item.img}
                            name={item.name}
                            description={item.description}
                            greeting={item.greeting}
                            Slogan={item.Slogan}
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
