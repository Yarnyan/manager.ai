import { useAppDispatch } from '../../store/hooks'
import { setActivePublicBot } from '../../store/features/bots/botsSlice'
import { useNavigate } from 'react-router-dom'
import AvatarContainer from '../ui/AvatarBurger'
import { formatText } from '../../helpers/text/formatText'
type Props = {
    id: number
    image?: string
    botname?: string
    closeBanner?: () => void
    description: string
}

export default function SidebarBanner({id, image, botname, closeBanner, description}: Props) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(setActivePublicBot({ id, botname, description }))
    navigate(`/chat/${botname}`)
    closeBanner()
    localStorage.setItem('activePublicBot', JSON.stringify({ id: id, botname: botname, description: description}))
  }
  return (
    <div className='mt-2 flex items-center p-2 hover:bg-[var(--hoverColor)] rounded cursor-pointer' onClick={() => handleClick()}>
        <AvatarContainer src={image} />
        <div className='ml-2'>
          <p className='text-[var(--textColor)] text-m font-normal'>{formatText(botname, 20)}</p>
          <p className='text-[var(--mutedTextColor)] text-s font-normal'>{formatText(description, 20)} </p>
        </div>
    </div>
  )
}