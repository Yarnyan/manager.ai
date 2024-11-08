import { Link } from 'react-router-dom'
import { useAppDispatch } from "../../store/hooks"
import { setActivePublicBot } from "../../store/features/bots/botsSlice"
import { formatText } from '../../helpers/text/formatText'
type Props = {
    id: number,
    img: string
    botname: string
    description: string
}

export default function LittleBanner({id, img, botname, description}: Props) {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(setActivePublicBot({ id, botname, description }))
    localStorage.setItem('activePublicBot', JSON.stringify({ id: id, botname: botname, description: description}))
  }
  return (
    <div className='w-[312px] h-[78px] p-3 gap-2 bg-[var(--bgElements)] rounded-md mx-1 mt-4 hover:bg-[#414142] duration-300 sm:min-w-[312px]' onClick={() => handleClick()}>
        <div className='flex items-center'>
              <img width={54} height={54} alt='banner image' src={img === '' ? "https://i.pinimg.com/236x/0f/13/dd/0f13ddce2a4b7d260a5a403b08df98d3.jpg" : img} className='h-[54px] rounded-md'/>
              <div className='ml-4'>
                <p className='line-clamp-1 text-ellipsis'>{botname}</p>
                <p className='line-clamp-1 text-ellipsis text-muted-foreground text-sm text-[var(--mutedTextColor)]'>{formatText(description, 23)}</p>
              </div>
        </div>
    </div>
  )
}