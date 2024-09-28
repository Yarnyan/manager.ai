import { Link } from 'react-router-dom'
type Props = {
    img: string
    name: string
    description: string
}

export default function LittleBanner({img, name, description}: Props) {
  return (
    <Link to={`/chat/${name}`} className='w-[312px] h-[78px] p-3 gap-2 bg-[var(--bgElements)] rounded-md mx-1 mt-4 hover:bg-[#414142] duration-300 sm:min-w-[312px]'>
        <div className='flex items-center'>
              <img width={54} height={54} alt='banner image' src={img === '' ? "https://i.pinimg.com/236x/0f/13/dd/0f13ddce2a4b7d260a5a403b08df98d3.jpg" : img} className='h-[54px] rounded-md'/>
              <div className='ml-4'>
                <p className='line-clamp-1 text-ellipsis'>{name}</p>
                <p className='line-clamp-1 text-ellipsis text-muted-foreground text-sm text-[var(--mutedTextColor)]'>{description}</p>
              </div>
        </div>
    </Link>
  )
}