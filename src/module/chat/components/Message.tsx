import AvatarUser from '../../../components/ui/Avatar'
type Props = {
    text: string
    name: string
    user_id: number
    img: string
}

export default function Message({name, user_id, img}: Props) {

  return (
    <div className='max-w-[70%] mt-4 w-full'>
        <div className={`${user_id === 2 ? 'w-full flex justify-start items-center flex-row-reverse' : 'w-full flex justify-start items-center flex'}`}>
         <AvatarUser width={30} height={30} src={img} />
         <p className='text-[var(--textColor)] font-normal ml-2 mr-2 text-[14px]'>{name}</p>
        </div>
        <div className='w-full mt-2 bg-[#303136] p-4 rounded-lg'>
            <p className='text-[var(--textColor)] font-[100]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates eaque dignissimos omnis hic inventore quos perspiciatis eveniet quia impedit cum laboriosam, iusto corrupti rerum aliquam quaerat dolores ducimus maxime earum?</p>
        </div>
    </div>
  )
}