import {useState} from 'react' 
import { forwardRef } from 'react';
import { Box } from '@mui/material';
import { styleModal } from '../modal/modal';
import { IoMdClose } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router';
import { useSignUpMutation } from './api/auth';
import { isApiError } from '../../helpers/auth/apiError';
type Props = {
  onCloseRegModal: () => void;
};

type Inputs = {
  login?: string;
  email?: string;
  password?: string;
};

const Registration = forwardRef<HTMLDivElement, Props>(({ onCloseRegModal }, ref) => {

  const [signUp] = useSignUpMutation();
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const schema = yup.object().shape({
    login: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
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

      const formData = new FormData();
      formData.append("login", data.login);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await signUp(formData).unwrap();
      
      reset();
      onCloseRegModal()
    } catch (error) {
      if (isApiError(error)) {
        setError(error.data.message);
      } else {
        setError('Error signing in');
      }
    }
  };
  

  return (
    <Box ref={ref} sx={{ ...styleModal }} tabIndex={0}>
      <div className='w-full flex justify-end'>
        <IoMdClose size={24} className='cursor-pointer' onClick={onCloseRegModal} />
      </div>
      <div className='w-full'>
        <h1 className='text-xl text-[var(--textColor)] font-normal text-center'>manager.ai</h1>
        <p className='text-xl text-[var(--mutedTextColor)] font-[100] text-center mt-[12px]'>Регистрация</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4'>
        <div className='flex items-center w-full'>
          <div className='rounded-l bg-[#303136] w-[40px] h-[40px] flex items-center justify-center'>
            <CiUser className='text-[var(--textColor)]' size={20} />
          </div>
          <input {...register("login", { required: true })} placeholder='Login' className='border-0 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded-r w-full' />
        </div>
        {errors.login && <p className='text-red-500 text-sm mt-[-10px]'>{errors.login.message}</p>}
        <div className='flex items-center w-full'>
          <div className='rounded-l bg-[#303136] w-[40px] h-[40px] rouded-l flex items-center justify-center'>
            <MdOutlineEmail className='text-[var(--textColor)]' size={20} />
          </div>
          <input {...register("email", { required: true })} placeholder='Email' className='border-0 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded-r w-full' />
        </div>
        {errors.email && <p className='text-red-500 text-sm mt-[-10px]'>{errors.email.message}</p>}
        <div className='flex items-center w-full'>
          <div className='rounded-l bg-[#303136] w-[40px] h-[40px] rouded-l flex items-center justify-center'>
            <RiLockPasswordLine className='text-[var(--textColor)]' size={20} />
          </div>
          <input {...register("password", { required: true })} type='password' placeholder='Password' className='border-0 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded-r w-full' />
        </div>
        {errors.password && <p className='text-red-500 text-sm mt-[-10px]'>{errors.password.message}</p>}
        <div className='flex justify-center'>
          <input type="submit" className='p-2.5 min-w-[120px] bg-[#F5F5F5] rounded-2xl text-l font-normal text-[#000000] hover:bg-[#d3d3d6] duration-300 w-max cursor-pointer' value={'Continue'} />
        </div>
        {error && <p className='text-red-500 text-l mt-[-10px] text-center'>{error}</p>}
      </form>
    </Box>
  );
});

export default Registration;
