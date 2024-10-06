import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styleModal } from '../modal/modal';
import { IoMdClose } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateBotMutation } from '../../module/banners/api/banners';
import { isApiError } from '../../helpers/auth/apiError';
type Props = {
  onCloseBuilderModal: () => void;
};

type Inputs = {
  [key: string]: string | undefined;
};

const BuilderModal = ({ onCloseBuilderModal }: Props) => {
  const [error, setError] = useState('');
  const [bot, setBot] = useState<any>(null);
  const [fields, setFields] = useState<Array<{ type: string, name: string, label: string, options?: string[] }>>([]);

  const [createBot] = useCreateBotMutation();

  const botLocal = JSON.parse(localStorage.getItem('activePublicBot') || '{}');

  useEffect(() => {
    const activeBot = JSON.parse(localStorage.getItem('activePublicBot') || '{}');
    setBot(activeBot);

    const pattern = /\{\$prompt_param_(input|select):([^:]+):"([^"]+)"(?::([^}]+))?\}/g;
    const matches = [...activeBot.prompt.matchAll(pattern)];

    const dynamicFields = matches.map(match => ({
      type: match[1],
      name: match[2],
      label: match[3],
      options: match[4] ? match[4].split('|') : undefined 
    }));

    setFields(dynamicFields);
  }, []);

  const schema = yup.object().shape(
    fields.reduce((acc, field) => {
      acc[field.name] = yup.string().required(`${field.label} is required`);
      return acc;
    }, {})
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let updatedPrompt = bot.prompt;

    fields.forEach((field) => {
      const fieldValue = data[field.name];
      const regex = new RegExp(`\\{\\$prompt_param_${field.type}:${field.name}:"[^"]+"(?::[^}]+)?\\}`, 'g');
      updatedPrompt = updatedPrompt.replace(regex, `${fieldValue}`);
    });

    console.log('Updated Prompt:', updatedPrompt);

    const formData = new FormData();

    formData.append("botName", botLocal.botname);
    formData.append("botDescription", botLocal.description);
    formData.append("botPrompt", updatedPrompt);
    


    try {
      const response = await createBot(formData).unwrap();
    } catch (error) {
      if (isApiError(error)) {
        setError(error.data.message);
      } else {
        setError('Error signing in');
      }
    }
  };

  return (
    <Box sx={{ ...styleModal }} tabIndex={0}>
      <div className='w-full flex justify-end'>
        <IoMdClose size={24} className='cursor-pointer' onClick={onCloseBuilderModal} />
      </div>
      <div className='w-full'>
        <h1 className='text-xl text-[var(--textColor)] font-normal text-center'>manager.ai</h1>
        <p className='text-xl text-[var(--mutedTextColor)] font-[100] text-center mt-[12px]'>Builder</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4'>
        {fields.map(field => (
          <div key={field.name}>
            {field.type === 'input' && (
              <input
                {...register(field.name)}
                placeholder={field.label}
                className='border-0 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded-r w-full'
              />
            )}
            {field.type === 'select' && (
              <select {...register(field.name)}className='border-0 outline-0 p-[10px] h-[40px] text-[var(--textColor)] bg-[#303136] rounded-r w-full'>
                <option value=''>{field.label}</option>
                {field.options?.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {errors[field.name] && <p className='text-red-500'>{errors[field.name]?.message}</p>}
          </div>
        ))}

        <div className='flex justify-center'>
          <input
            type="submit"
            className='p-2.5 min-w-[120px] bg-[#F5F5F5] rounded-2xl text-l font-normal text-[#000000] hover:bg-[#d3d3d6] duration-300 w-max cursor-pointer'
            value={'Create'}
          />
        </div>
      </form>

      {error && <p className='text-red-500 text-l mt-[10px] text-center'>{error}</p>}
    </Box>
  );
};

export default BuilderModal;
