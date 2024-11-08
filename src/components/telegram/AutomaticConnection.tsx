import { useState, forwardRef, useEffect } from 'react';
import { useLazyGetAccountsQuery, useAddBotWithAccountMutation } from '../../module/profile/api/bot';
import { isApiError } from '../../helpers/auth/apiError';
import { IAccount } from './entity/entity';
type Props = {};

const AutomaticConnection = forwardRef<HTMLDivElement, Props>(({ }, ref) => {

    const [activeId, setActiveId] = useState<number | null>(null);

    const [error, setError] = useState<string | null>(null);

    const [getAccounts, accounts] = useLazyGetAccountsQuery()
    const [addBotWithAccount] = useAddBotWithAccountMutation();

    useEffect(() => {
        try {
            getAccounts(null);
        } catch (error) {
            if (isApiError(error)) {
                setError(error.data.message);
            } else {
                setError('Invalid error');
            }
        }
    }, []);

    const handleUserClick = (id: number) => {
        setActiveId(id);
    };

    const selectAccount = async () => {
        console.log('Selected account:', activeId);
        const formData = new FormData();
        formData.append('BotId', String(activeId));
        try {
            await addBotWithAccount(formData);
        } catch (error) {
            if (isApiError(error)) {
                setError(error.data.message);
            } else {
                setError('Invalid error');
            }
        }
    }

    return (
        <div className='mt-2'>
            <div className='max-h-[224px] overflow-y-auto rounded sm:max-h-[192px]'>
                {accounts?.data?.detail.lenght > 0 ? accounts?.data?.detail.map((bot: IAccount) => (
                    <div
                        key={bot.id}
                        className={`flex items-center justify-between py-2 px-4 cursor-pointer transition duration-300 
                            ${activeId === bot.id ? 'bg-[#4A4D52]' : 'bg-[#303136]'}`}
                        onClick={() => handleUserClick(bot.id)}
                    >
                        <p className='text-l text-[var(--textColor)]'>{bot.Username}</p>
                    </div>
                )) : <p className='text-l text-[var(--textColor)] text-center'>Oops, no accounts yet</p>}
            </div>
            <div className='flex justify-center mt-4'>
                <button
                    disabled={activeId === null}
                    onClick={() => selectAccount()}
                    className={`p-2.5 min-w-[120px] rounded-2xl text-l font-normal 
    ${activeId === null ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-[#F5F5F5] text-[#000000] hover:bg-[#d3d3d6]'} 
    duration-300 w-max cursor-pointer`}
                >
                    Connect
                </button>
            </div>
        </div>
    );
})

export default AutomaticConnection;