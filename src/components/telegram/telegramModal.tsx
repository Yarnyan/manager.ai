import React, { useState, forwardRef, useRef } from 'react';
import { Box } from '@mui/material';
import { styleModal } from '../modal/modal';
import { IoMdClose } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from '../../store/hooks';
import { isApiError } from '../../helpers/auth/apiError';
import { useUserUpdateMutation } from '../../module/profile/api/user';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Props = {
    onClosetelegramModal: () => void;
};

type Inputs = {
    Phone?: string;
    Key?: string;
    Hash?: string;
    Code?: string;
    onClosetelegramModal?: () => void
};

const SettingModal = forwardRef<HTMLDivElement, Props>(({ onClosetelegramModal }, ref) => {
    const [fileName, setFileName] = useState('');

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [OTPCodeIsOpen, setOTPCodeIsOpen] = useState(false)


    const schema = yup.object().shape({
        Phone: yup.string().required(),
        Key: yup.string().required(),
        Hash: yup.string().required(),
        Code: yup.string()
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        try {
            const formData = new FormData();
            // formData.append("login", data.login);
            // formData.append("email", data.email);
            // formData.append("password", data.password);
            // formData.append("username", data.username);
            //   const response = updateUser(formData).unwrap();
            reset();
            setOpen(true);
        } catch (error) {
            if (isApiError(error)) {
                setError(error.data.message);
            } else {
                setError('Error signing in');
            }
        }
    };


    const handleClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Box ref={ref} sx={{ ...styleModal }} tabIndex={0}>
            <div className='w-full flex justify-end'>
                <IoMdClose size={24} className='cursor-pointer' onClick={onClosetelegramModal} />
            </div>
            <div className='w-full'>
                <h1 className='text-xl text-[var(--textColor)] font-normal text-center'>manager.ai</h1>
                <p className='text-xl text-[var(--mutedTextColor)] font-[100] text-center mt-[12px]'>Telegram connect</p>
            </div>
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
                    <input {...register("Hash", { required: true })} placeholder='Hash' className='border-0  mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded resize-none' />
                    {errors.Hash && <p className='text-red-500 text-sm'>{errors.Hash.message}</p>}
                </div>

                {OTPCodeIsOpen && (
                    <div className='w-full flex flex-col'>
                        <label className='text-[var(--textColor)] text-sm text-normal'>Code</label>
                        <input {...register("Code")} placeholder='Password' className='border-0  mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded resize-none' />
                        {errors.Code && <p className='text-red-500 text-sm'>{errors.Code.message}</p>}
                    </div>
                )}

                <div className='flex justify-center'>
                    <input type="submit" className='p-2.5 bg-[#F5F5F5] min-w-[120px] rounded-2xl text-l font-normal text-[#000000] hover:bg-[#d3d3d6] duration-300 w-max cursor-pointer' value={'Save'} />
                </div>
                {error && <p className='text-red-500 text-l mt-[10px] text-center'>{error}</p>}
            </form>
        </Box>
    );
});

export default SettingModal;
