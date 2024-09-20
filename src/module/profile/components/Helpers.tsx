import { MdOutlineEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaTelegramPlane } from "react-icons/fa";
type Props = {
    image: string
    name: string
    description: string
    greeting: string
    Slogan: string
}

export default function Helpers({ image, name, description }: Props) {
    return (
        <div className='mt-4 flex p-2 hover:bg-[#414142] rounded duration-300 w-[400px] justify-between sm:w-auto'>
            <div className='flex'>
                <img alt='helpers' src={image} width={60} height={60} className='rounded-md h-[60px]' />
                <div className='ml-4'>
                    <p className='text-[var(--textColor)] text-xl font-normal'>{name}</p>
                    <p className='text-sm text-[var(--mutedTextColor)]'>{description}</p>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center ml-2'>
                <Link to={`/manager/${'Loli'}`}>
                    <MdOutlineEdit size={20} fill='var(--mutedTextColor)' className='cursor-pointer' />
                </Link>
                <button>
                    <FaTelegramPlane size={20} fill='var(--mutedTextColor)' className='cursor-pointer mt-4' />
                </button>
            </div>
        </div>
    )
}