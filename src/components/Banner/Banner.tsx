type Props = {
    img: string
    author: string
    name: string
    description: string
    likes?: number
}

export default function Banner({img, author, name, description}: Props) {
  return (
    <div className='min-h-36 p-4 bg-[var(--bgElements)] rounded-md flex hover:bg-[#414142] duration-300 cursor-pointer z-1'>
      <img width={90} height={114} alt='banner image' src={img} className='h-[114px] rounded-md'/>
      <div className='ml-4'>
        <p className='mb-[5px] text-md-medium leading-tight line-clamp-1 text-ellipsis break-anywhere overflow-hidden whitespace-normal'>{name}</p>
        <p className='text-muted-foreground font-normal text-xs truncate mb-[5px] text-[var(--mutedTextColor)]'>Автор: {author}</p>
        <p className='font-normal line-clamp-3 text-xs text-ellipsis overflow-hidden whitespace-normal break-anywhere'>{description}</p>
      </div>
    </div>
  )
}