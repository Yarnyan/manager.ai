import { Link } from "react-router-dom"
import { useAppDispatch } from "../../store/hooks"
import { setActivePublicBot } from "../../store/features/bots/botsSlice"
import { useMediaQuery } from "usehooks-ts";
import { formatText } from "../../helpers/formatText";
type Props = {
    id?: number
    img?: string
    botname?: string
    description?: string
}

export default function Banner({id, img, botname, description}: Props) {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(setActivePublicBot({ id, botname, description }))
    localStorage.setItem('activePublicBot', JSON.stringify({ id: id, botname: botname, description: description}))
  }

  const mobile = useMediaQuery('(min-width: 768px)')

  return (
    <div className='min-h-36 p-4 bg-[var(--bgElements)] rounded-md flex hover:bg-[#414142] duration-300 z-1' onClick={() => handleClick()}>
      <img width={90} height={114} alt='banner image' src={img === '' ? "https://img.freepik.com/premium-photo/anime-art-style-nature-environment-background-image_492154-963.jpg" : img} className='h-[114px] rounded-md'/>
      <div className='ml-4'>
        <p className='mb-[5px] text-md-medium leading-tight line-clamp-1 text-ellipsis break-anywhere overflow-hidden whitespace-normal'>{botname}</p>
        <p className='text-muted-foreground font-normal text-xs truncate mb-[5px] text-[var(--mutedTextColor)]'>Автор: @root</p>
        <p className='font-normal line-clamp-3 text-xs overflow-hidden whitespace-normal break-all leading-loose'>{formatText(description, 100)}</p>
      </div>
    </div>
  )
}