import AvatarContainer from '../../components/ui/AvatarBurger';
import { useState, useEffect } from 'react'
import Typewriter from 'typewriter-effect';
import { useLocation } from 'react-router-dom';
type Props = {
    openRegModal?: () => void,
    openLogModal?: () => void
}

export default function Header({ openRegModal, openLogModal }: Props) {

    const [token, setToken] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(true);
        } else {
            setToken(false);
        }
    }, [location]);

    if (token === null) {
        return null;
    }

    return (
        <div className='flex justify-between items-center'>
            <div>
                <h1 className="text-xl font-normal text-[var(--mutedTextColor)] sm:hidden">
                    <Typewriter
                        options={{
                            strings: ['Welcome to manager AI'], 
                            autoStart: true,
                            loop: false,
                            delay: 75,
                            deleteSpeed: 10000000000,
                            cursor: '',
                        }}
                    />
                </h1>
            </div>
            <div>
                {token ? (
                    <div className='mr-1'>
                        <AvatarContainer />
                    </div>
                ) : (
                    <div>
                        <button className='p-2 bg-[#F5F5F5] rounded-2xl text-l font-normal text-[#000000] hover:bg-[#d3d3d6] duration-300' onClick={openRegModal}>
                            Registration
                        </button>
                        <button className='ml-2 text-l font-normal hover:text-[var(--mutedTextColor)] duration-300' onClick={openLogModal}>
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}