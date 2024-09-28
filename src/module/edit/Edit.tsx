import React, { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from '../../store/hooks';
import { useUpdateBotMutation } from '../profile/api/user';
import { isApiError } from '../../helpers/auth/apiError';
import { useLazyGetBotDataQuery } from '../profile/api/user';
type Props = {

};

type Inputs = {
    botName?: string;
    prompt?: string;
    description?: string;
    // photo: string;
};

const Edit = ({ }: Props) => {
    const [bioLength, setBioLength] = useState(0);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [updateBot] = useUpdateBotMutation()
    const [getBot, botData] = useLazyGetBotDataQuery()
    const [error, setError] = useState('');
    const bot = useAppSelector((state) => state.bots.activeBot)

    const schema = yup.object().shape({
        botName: yup.string(),
        prompt: yup.string(),
        description: yup.string(),
        // photo: yup.string().required("Photo is required"),
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
        try {
            console.log(data)
            const formData = new FormData();
            formData.append("botname", data.botName);
            formData.append("prompt", data.prompt);
            formData.append("description", data.description);
            formData.append("BotId", String(bot.id));

            await updateBot(formData);
            reset();
        } catch (error) {
            if (isApiError(error)) {
                setError(error.data.message);
            } else {
                setError('Error signing in');
            }
        }
    };

    useEffect(() => {
        if (botData?.data) {
            reset({
                botName: botData.data.botname,
                prompt: botData.data.prompt,
                description: botData.data.description,
            });
        }
    }, [botData, reset]);
    

    useEffect(() => {
        try {
            getBot(bot.id);
        } catch (error) {
            if (isApiError(error)) {
                setError(error.data.message);
            } else {
                setError('Error signing in');
            }
        }
    }, []);

    // const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setBioLength(event.target.value.length);
    // };

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files.length > 0) {
    //         setFileName(event.target.files[0].name);
    //     }
    // };

    // const handleTextInputClick = () => {
    //     if (fileInputRef.current) {
    //         fileInputRef.current.click();
    //     }
    // };

    return (
        <div className='w-full h-full flex flex-col justify-center items-center mt-8 sm:mt-4'>
            <div className='max-w-[400px] w-full'>
                <div className='w-full'>
                    <h1 className='text-xl text-[var(--textColor)] font-normal text-center'>manager.ai</h1>
                    <p className='text-xl text-[var(--mutedTextColor)] font-[100] text-center mt-[8px]'>Edit manager</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-2'>

                    <div className='w-full flex flex-col'>
                        <label className='text-[var(--textColor)] text-sm text-normal'>Name</label>
                        <input {...register("botName", { required: true })} placeholder='Name' defaultValue={botData?.data?.botname} className='border-0 outline-0 mt-1 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded ' />
                        {errors.botName && <p className='text-red-500 text-sm'>{errors.botName.message}</p>}
                    </div>

                    <div className='w-full flex flex-col'>
                        <label className='text-[var(--textColor)] text-sm text-normal'>Prompt</label>
                        <input {...register("prompt", { required: true })} defaultValue={botData?.data?.prompt} placeholder='Prompt' className='border-0 mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded' />
                        {errors.prompt && <p className='text-red-500 text-sm'>{errors.prompt.message}</p>}
                    </div>

                    <div className='w-full flex flex-col'>
                        <label className='text-[var(--textColor)] text-sm text-normal'>Desciprition</label>
                        <textarea {...register("description", { required: true })} defaultValue={botData?.data?.description} placeholder='Desciprition' className='border-0  mt-1 outline-0 p-[10px] h-[140px] text-[var(--textColor)] bg-[#303136] rounded resize-none' />
                        {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
                    </div>

                    {/* <div>
                        <label className='text-[var(--textColor)] text-sm text-normal'>Photo</label>
                        <input type='text' value={fileName} placeholder='Choose a file' className='border-0 mt-1 outline-0 p-[6px] h-[42px] text-[var(--textColor)] bg-[#303136] rounded w-full cursor-pointer' onClick={handleTextInputClick} readOnly />
                        <input {...register("photo", { required: true })} type='file' className='hidden' ref={fileInputRef} onChange={handleFileChange} />
                        {errors.photo && <p className='text-red-500 text-sm'>{errors.photo.message}</p>}
                    </div> */}

                    <div className='flex justify-center'>
                        <input type="submit" className='p-2.5 bg-[#F5F5F5] min-w-[120px] rounded-2xl text-l font-normal text-[#000000] hover:bg-[#d3d3d6] duration-300 w-max cursor-pointer' value={'Save'} />
                    </div>
                    {error && <p className='text-red-500 text-l mt-[10px] text-center'>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Edit;
