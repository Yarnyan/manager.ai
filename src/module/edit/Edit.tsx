import React, { useState, useRef } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {

};

type Inputs = {
    login: string;
    displayName: string;
    biography: string;
    photo: string;
};

const Edit = ({ }: Props) => {
    const [bioLength, setBioLength] = useState(0);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const schema = yup.object().shape({
        login: yup.string().required(),
        displayName: yup.string().required(),
        biography: yup.string().max(500).required(),
        photo: yup.string().required("Photo is required"),
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
        console.log(data, '1');
        localStorage.setItem('token', '123');
        reset();
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

    return (
        <div className='w-full h-full flex flex-col justify-center items-center mt-16 sm:mt-4'>
            <div className='max-w-[400px] w-full'>
                <div className='w-full'>
                    <h1 className='text-xl text-[var(--textColor)] font-normal text-center'>manager.ai</h1>
                    <p className='text-xl text-[var(--mutedTextColor)] font-[100] text-center mt-[12px]'>Edit manager</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4'>

                    <div className='w-full flex flex-col'>
                        <label className='text-[var(--textColor)] text-sm text-normal'>Name</label>
                        <input {...register("login", { required: true })} placeholder='Login' className='border-0 outline-0 mt-1 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded ' />
                        {errors.login && <p className='text-red-500 text-sm'>{errors.login.message}</p>}
                    </div>

                    <div className='w-full flex flex-col'>
                        <label className='text-[var(--textColor)] text-sm text-normal'>Display name</label>
                        <input {...register("displayName", { required: true })} placeholder='Display name' className='border-0 mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded' />
                        {errors.displayName && <p className='text-red-500 text-sm'>{errors.displayName.message}</p>}
                    </div>

                    <div className='w-full flex flex-col'>
                        <label className='text-[var(--textColor)] text-sm text-normal'>Biography</label>
                        <textarea {...register("biography", { required: true })} placeholder='Biography' className='border-0  mt-1 outline-0 p-[10px] h-[140px] text-[var(--textColor)] bg-[#303136] rounded resize-none' onChange={handleBioChange} />
                        <div className='flex justify-end mt-2'>
                            <p className='text-[var(--mutedTextColor)] text-sm'>{bioLength}/500</p>
                        </div>
                        {errors.biography && <p className='text-red-500 text-sm'>{errors.biography.message}</p>}
                    </div>

                    <div>
                        <label className='text-[var(--textColor)] text-sm text-normal'>Photo</label>
                        <input type='text' value={fileName} placeholder='Choose a file' className='border-0 mt-1 outline-0 p-[6px] h-[42px] text-[var(--textColor)] bg-[#303136] rounded w-full cursor-pointer' onClick={handleTextInputClick} readOnly />
                        <input {...register("photo", { required: true })} type='file' className='hidden' ref={fileInputRef} onChange={handleFileChange} />
                        {errors.photo && <p className='text-red-500 text-sm'>{errors.photo.message}</p>}
                    </div>

                    <div className='flex justify-center'>
                        <input type="submit" className='p-2.5 bg-[#F5F5F5] rounded-2xl text-l font-normal text-[#000000] hover:bg-[#d3d3d6] duration-300 w-max cursor-pointer' value={'Продолжить'} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
