import { useState, forwardRef, useEffect } from 'react';
import { useLazyGetAccountsQuery, useAddBotWithAccountMutation } from '../../module/profile/api/bot';
import { isApiError } from '../../helpers/auth/apiError';
import { Box, CircularProgress } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
type Props = {};

type Inputs = {
    Code?: string;
};

const AutomaticConnection = forwardRef<HTMLDivElement, Props>(({ }, ref) => {

    const schema = yup.object().shape({
        Code: yup.string(),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const [activeId, setActiveId] = useState<number | null>(null);

    const [error, setError] = useState<string | null>(null);


    const bot = JSON.parse(localStorage.getItem('activePublicBot'));

    const [getAccounts, { isLoading, data: accounts }] = useLazyGetAccountsQuery()

    const [addBotWithAccount] = useAddBotWithAccountMutation();

    const [loading, setLoading] = useState<boolean>(false);

    const [OTPCodeIsOpen, setOTPCodeIsOpen] = useState(false);

    useEffect(() => {
        try {
            setLoading(true);
            getAccounts(null).unwrap();
        } catch (error) {
            if (isApiError(error)) {
                setError(error.data.message);
            } else {
                setError('Invalid error');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const handleUserClick = (id: number) => {
        setActiveId(id);
    };

    const selectAccount = async () => {
        try {
            if(OTPCodeIsOpen) {
                const formData = new FormData();
                formData.append('BotId', bot.id);
                formData.append('AccountId', activeId | );
                const response = await addBotWithAccount(formData).unwrap();
                if (response.error) {
                    if (isApiError(response.error)) {
                        setError(response.error.data?.message || 'Unknown error');
                    } else {
                        setError('Invalid error');
                    }
                    if (response.message !== "Bot created, code no need") {
                        setOTPCodeIsOpen(true);
                    }
                } else {

                }
            }
        } catch (error) {
            if (isApiError(error)) {
                setError(error.data?.message || 'Unknown error');
            } else {
                setError('Invalid error');
            }
        }
    };

    if (loading) {
        return (
            <Box className='flex justify-center items-center'>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <div className='mt-2'>
            <div className='max-h-[224px] overflow-y-auto rounded sm:max-h-[192px]'>
                {accounts && accounts?.detail.length > 0 && accounts?.detail.map((bot: any) => (
                    <div
                        key={bot.id}
                        className={`flex items-center justify-between py-2 px-4 cursor-pointer transition duration-300 
                            ${activeId === bot.id ? 'bg-[#4A4D52]' : 'bg-[#303136]'}`}
                        onClick={() => handleUserClick(bot.id)}
                    >
                        <p className='text-l text-[var(--textColor)]'>{bot.username}</p>
                    </div>
                ))}
            </div>
            {OTPCodeIsOpen && (
                <div className='mt-4'>
                    <div className='w-full flex flex-col'>
                        <label className='text-[var(--textColor)] text-sm text-normal'>Code</label>
                        <input {...register("Code", { required: true })} placeholder='Confirm code' className='border-0 mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded resize-none' />
                        {errors.Code && <p className='text-red-500 text-sm'>{errors.Code.message}</p>}
                    </div>
                </div>
            )}
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
            {error && <p className='text-red-500 text-l mt-[10px] text-center'>{error}</p>}
        </div>
    );
})

export default AutomaticConnection;