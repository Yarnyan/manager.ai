import {Link} from 'react-router-dom'
type Props = {
    image: string
    name: string
    closeBanner: () => void
}

export default function SidebarBanner({image, name, closeBanner}: Props) {
  return (
    <Link className='mt-2 flex items-center p-2 hover:bg-[var(--hoverColor)] rounded' to={`/chat/${name}`} onClick={closeBanner}>
        <img src={image} width={40} height={40} className='rounded-full h-[40px]' />
        <p className='ml-2 text-[var(--textColor)] text-m font-normal'>{name}</p>
    </Link>
  )
}