import { Link } from 'react-router-dom';
import { RiMagicLine } from "react-icons/ri";
type Props = {}

export default function Create({}: Props) {
  return (
    <div className='mt-20'>
        <div className='flex items-center justify-center flex-col'>
            <h1 className='text-2xl font-normal text-[var(--textColor)]'>Create an assistant</h1>
            <p className='mt-4 text-center text-l text-[var(--mutedTextColor)] w-[480px] sm:w-auto'>Can't get along with the characters? Create your own! Customize parameters such as his voice, conversation start, tone and much more!</p>
            <Link to={'/create'} className='mt-4 min-w-[120px] text-m font-normal bg-[#F5F5F5] h-[40px] rounded-2xl text-[#000000] hover:bg-[#d3d3d6] duration-300 flex items-center justify-center p-4'>
                <RiMagicLine />
                Create
            </Link>
        </div>
    </div>
  )
}