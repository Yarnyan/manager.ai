import { useState, forwardRef } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isApiError } from '../../helpers/auth/apiError';
import { useAddTelegtamBotMutation, useAuthBotMutation } from '../../module/profile/api/bot';

type Props = {}

type Inputs = {
    Phone?: string;
    Key?: string;
    Hash?: string;
    Code?: string;
    onClosetelegramModal?: () => void;
};

const ManualСonnection = forwardRef<HTMLDivElement, Props>(({ }, ref) => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [OTPCodeIsOpen, setOTPCodeIsOpen] = useState(false);

    const [addBot, { isLoading: isAddBotLoading }] = useAddTelegtamBotMutation();
    const [authBot, { isLoading: isAuthBotLoading }] = useAuthBotMutation();

    const bot = JSON.parse(localStorage.getItem('activePublicBot') || '{}');

    const schema = yup.object().shape({
        Phone: yup.string().required(),
        Key: yup.string().required(),
        Hash: yup.string().required(),
        Code: yup.string(),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData();
            formData.append('BotId', bot.id || '');
            formData.append('PHONE', data.Phone || '');
            formData.append('API_ID', data.Key || '');
            formData.append('API_HASH', data.Hash || '');

            if (message !== "Bot created, code no need") {
                if (OTPCodeIsOpen) {
                    formData.append('Code', data.Code || '');
                }
            }

            if (!OTPCodeIsOpen) {
                const addBotResponse = await addBot(formData).unwrap();
                setMessage(addBotResponse.message);
                if (addBotResponse.message !== "Bot created, code no need") {
                    setOTPCodeIsOpen(true);
                } else {
                    reset();
                }
            } else {
                setMessage('');
                const authBotResponse = await authBot(formData).unwrap();
                setMessage('Success');
                reset();
            }
        } catch (error: any) {
            if (error.originalStatus === 400) {
                setError(error.data);
            } else if (isApiError(error)) {
                setError(error.data.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4 sm:mt-2 sm:gap-2'>
            <div className='w-full flex flex-col'>
                <label className='text-[var(--textColor)] text-sm text-normal'>Phone number</label>
                <input {...register("Phone", { required: true })} placeholder='Phone number' className='border-0 outline-0 mt-1 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded ' />
                {errors.Phone && <p className='text-red-500 text-sm'>{errors.Phone.message}</p>}
            </div>

            <div className='w-full flex flex-col'>
                <label className='text-[var(--textColor)] text-sm text-normal'>Api key</label>
                <input {...register("Key", { required: true })} placeholder='Key' className='border-0 mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded' />
                {errors.Key && <p className='text-red-500 text-sm'>{errors.Key.message}</p>}
            </div>

            <div className='w-full flex flex-col'>
                <label className='text-[var(--textColor)] text-sm text-normal'>Api hash</label>
                <input {...register("Hash", { required: true })} placeholder='Hash' className='border-0 mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded resize-none' />
                {errors.Hash && <p className='text-red-500 text-sm'>{errors.Hash.message}</p>}
            </div>

            {OTPCodeIsOpen && (
                <div className='w-full flex flex-col'>
                    <label className='text-[var(--textColor)] text-sm text-normal'>Code</label>
                    <input {...register("Code")} placeholder='Code' className='border-0 mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded resize-none' />
                    {errors.Code && <p className='text-red-500 text-sm'>{errors.Code.message}</p>}
                </div>
            )}

            <div className='flex justify-center'>
                <input type="submit" className='p-2.5 bg-[#F5F5F5] min-w-[120px] rounded-2xl text-l font-normal text-[#000000] hover:bg-[#d3d3d6] duration-300 w-max cursor-pointer' value={'Save'} />
            </div>
            {error && <p className='text-red-500 text-l mt-[0px] text-center'>{error}</p>}
            {message && <p className='text-green-500 text-l mt-[0px] text-center'>{message}</p>}
        </form>
    )
})

export default ManualСonnection;