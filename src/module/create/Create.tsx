import { Link } from 'react-router-dom';
import { RiMagicLine } from "react-icons/ri";
type Props = {}

export default function Create({}: Props) {
  return (
    <div className='mt-20'>
        <div className='flex items-center justify-center flex-col'>
            <h1 className='text-2xl font-normal text-[var(--textColor)]'>Создать помощника</h1>
            <p className='mt-4 text-center text-l text-[var(--mutedTextColor)] w-[480px] sm:w-auto'>Не находите общего языка с персонажами? Создайте своего! Настройте такие параметры, как его голос, начало разговора, тон и многое другое!</p>
            <Link to={'/create'} className='mt-4 text-m font-normal bg-[#F5F5F5] h-[40px] rounded-2xl text-[#000000] hover:bg-[#d3d3d6] duration-300 flex items-center p-4'>
                <RiMagicLine />
                Создать помощника
            </Link>
        </div>
    </div>
  )
}