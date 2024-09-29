import { MdOutlineEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaTelegramPlane } from "react-icons/fa";
import { formatText } from "../../../helpers/text/formatText";
import { useAppDispatch } from "../../../store/hooks";
import { addActiveBot } from "../../../store/features/bots/botsSlice";
import { useNavigate } from "react-router-dom";
import { setActivePublicBot } from "../../../store/features/bots/botsSlice";
import { useMediaQuery } from "usehooks-ts";
type Props = {
    image: string
    botname: string
    description: string
    id: number
    prompt: string
    type: any
    telegramModal: () => void
}

export default function Helpers({ image, botname, description, id, prompt, type, telegramModal }: Props) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const ha = () => {
        dispatch(setActivePublicBot({ id, botname, description }))
        navigate(`/chat/${botname}`)
        localStorage.setItem('activePublicBot', JSON.stringify({ id: id, botname: botname, description: description}))
    }

    const handleClick = () => {
        dispatch(addActiveBot({ botname, description, id, prompt, type }));
        navigate(`/manager/${botname}`)
    }

    const mobile = useMediaQuery('(min-width: 768px)')
    const to = !mobile ? 24 : 100
    
    return (
        <div className='mt-4 flex p-2 hover:bg-[#414142] rounded duration-300 w-[400px] justify-between sm:w-[100%] cursor-pointer'>
            <div className='flex w-full' onClick={() => ha()}>
                <img alt='helpers' src={image === '' ? "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" : image} width={60} height={60} className='rounded-md h-[60px]' />
                <div className='ml-4 w-full'>
                    <p className='text-[var(--textColor)] text-xl font-normal'>{botname}</p>
                    <p className='text-sm text-[var(--mutedTextColor)] break-all'>{(formatText(description, to))}</p>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center ml-2'>
                <button onClick={() => handleClick()}>
                    <MdOutlineEdit size={20} fill='var(--mutedTextColor)' className='cursor-pointer' />
                </button>
                <button onClick={telegramModal}>
                    <FaTelegramPlane size={20} fill='var(--mutedTextColor)' className='cursor-pointer mt-4' />
                </button>
            </div>
        </div>
    )
}