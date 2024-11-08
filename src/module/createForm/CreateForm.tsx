import React, { useState, useRef } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateBotMutation } from '../banners/api/banners';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { isApiError } from '../../helpers/auth/apiError';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router';

type Inputs = {
    botName?: string;
    botDescription?: string;
    BotPrompt?: string;
};

const CreateForm = ({ }) => {
    const [bioLength, setBioLength] = useState(0);
    const [fileName, setFileName] = useState('');
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const [createBot] = useCreateBotMutation();

    const schema = yup.object().shape({
        botName: yup.string().required(),
        botDescription: yup.string().required(),
        BotPrompt: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("botName", data.botName);
            formData.append("botDescription", data.botDescription);
            formData.append("botPrompt", data.BotPrompt);

            const response = await createBot(formData).unwrap();

            reset();
            setOpen(true);
            navigate('/profile')
        } catch (error) {
            if (isApiError(error)) {
                setError(error.data.message);
            } else {
                setError('Invalid error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBioLength(event.target.value.length);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        }
    };

    const handleTextInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className='max-w-2xl self-center w-full flex flex-col mt-16 sm:mt-8'>
            <div className=''>
                <h1 className='text-xl text-[var(--textColor)] font-normal text-center'>manager.ai</h1>
                <p className='text-xl text-[var(--mutedTextColor)] font-[100] text-center mt-[12px]'>Create bot</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4 sm:mt-2 sm:gap-2'>

                <div className='w-full flex flex-col'>
                    <label className='text-[var(--textColor)] text-sm text-normal'>Name</label>
                    <input {...register("botName", { required: true })} placeholder='Name' className='border-0 outline-0 mt-1 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded ' />
                    {errors.botName && <p className='text-red-500 text-sm'>{errors.botName.message}</p>}
                </div>

                <div className='w-full flex flex-col'>
                    <label className='text-[var(--textColor)] text-sm text-normal'>Description</label>
                    <input {...register("botDescription", { required: true })} placeholder='Description' className='border-0 mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded' />
                    {errors.botDescription && <p className='text-red-500 text-sm'>{errors.botDescription.message}</p>}
                </div>

                <div className='w-full flex flex-col'>
                    <label className='text-[var(--textColor)] text-sm text-normal'>Prompt</label>
                    <textarea {...register("BotPrompt", { required: true })} placeholder='Prompt' className='border-0  mt-1 outline-0 p-[10px] h-[140px] text-[var(--textColor)] bg-[#303136] rounded resize-none' onChange={handleBioChange} />
                    {errors.BotPrompt && <p className='text-red-500 text-sm'>{errors.BotPrompt.message}</p>}
                </div>
                <div className='flex justify-center'>
                    <button type="submit" className='p-2.5 bg-[#F5F5F5] rounded-2xl text-l font-normal text-[#000000] hover:bg-[#d3d3d6] duration-300 w-max cursor-pointer flex justify-center items-center min-w-[120px]' disabled={loading}>
                        {loading ? <CircularProgress size={30} sx={{color: 'black'}} /> : 'Create manager'}
                    </button>
                </div>
                {error && <p className='text-red-500 text-l text-center'>{error}</p>}
            </form>
            {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Bot successfully created
                </Alert>
            </Snackbar> */}
        </div>
    );
};

export default CreateForm;
