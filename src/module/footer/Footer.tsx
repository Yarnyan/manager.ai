import { Link } from 'react-router-dom'
type Props = {}

export default function Footer({}: Props) {
  return (
    <div className='w-full h-30px mt-6 mb-4'>
        <div className='flex justify-center items-center'>
            <Link to={'/privacy'} className='mr-4 text-[var(--mutedTextColor)] text-m font-normal hover:text-[var(--textColor)] duration-300 sm:text-center'>Privacy Policy</Link>
            <Link to={'/terms'} className='text-[var(--mutedTextColor)] text-m font-normal hover:text-[var(--textColor)] duration-300 sm:text-center'>Terms of service</Link>
        </div>
    </div>
  )
}