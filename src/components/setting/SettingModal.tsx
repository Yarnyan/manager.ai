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
  onCloseSettingModal: () => void;
};

type Inputs = {
  login?: string;
  username?: string;
  email?: string;
  password?: string;
  onCloseSettingModal?: () => void
  // photo: string;
};

const SettingModal = forwardRef<HTMLDivElement, Props>(({ onCloseSettingModal }, ref) => {
  const [fileName, setFileName] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState('');
  const [updateUser] = useUserUpdateMutation();

  const user = useAppSelector((state) => state.user);

  const schema = yup.object().shape({
    login: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string()
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      const formData = new FormData();
      formData.append("login", data.login);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("username", data.username);
      const response = updateUser(formData)
    } catch (error) {
      if (isApiError(error)) {
        setError(error.data.message);
      } else {
        setError('Error signing in');
      }
    } finally {
      onCloseSettingModal();
    }
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setFileName(event.target.files[0].name);
  //   }
  // };

  // const handleTextInputClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  return (
    <Box ref={ref} sx={{ ...styleModal }} tabIndex={0}>
      <div className='w-full flex justify-end'>
        <IoMdClose size={24} className='cursor-pointer' onClick={onCloseSettingModal} />
      </div>
      <div className='w-full'>
        <h1 className='text-xl text-[var(--textColor)] font-normal text-center'>manager.ai</h1>
        <p className='text-xl text-[var(--mutedTextColor)] font-[100] text-center mt-[12px]'>Public profile</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4 sm:mt-2 sm:gap-2'>

        <div className='w-full flex flex-col'>
          <label className='text-[var(--textColor)] text-sm text-normal'>Login</label>
          <input {...register("login", { required: true })} defaultValue={user?.login} placeholder='Login' className='border-0 outline-0 mt-1 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded ' />
          {errors.login && <p className='text-red-500 text-sm'>{errors.login.message}</p>}
        </div>

        <div className='w-full flex flex-col'>
          <label className='text-[var(--textColor)] text-sm text-normal'>Username</label>
          <input {...register("username", { required: true })} defaultValue={user?.username} placeholder='Username' className='border-0 mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded' />
          {errors.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}
        </div>

        <div className='w-full flex flex-col'>
          <label className='text-[var(--textColor)] text-sm text-normal'>Email</label>
          <input {...register("email", { required: true })} defaultValue={user?.email} placeholder='Email' className='border-0  mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded resize-none' />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
        </div>

        <div className='w-full flex flex-col'>
          <label className='text-[var(--textColor)] text-sm text-normal'>Password</label>
          <input {...register("password")} defaultValue={''} placeholder='Password' className='border-0  mt-1 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded resize-none' />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
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
    </Box>
  );
});

export default SettingModal;
