import { bannersTry } from './data/data'
import LittleBanner from '../../components/littleBanner/LittleBanner'
type Props = {}

export default function BannersTry({ }: Props) {
    return (
        <div className='mt-16 w-full'>
            <h1 className='text-xl font-normal text-[var(--textColor\)]'>Попробуйте эти</h1>
            <div className='mt-2 w-full flex flex-wrap sm:flex-nowrap sm:overflow-x-auto sm:pb-2'>
                {bannersTry.map((banner) => {
                    return (
                        <LittleBanner key={banner.id} img={banner.img} name={banner.name} description={banner.description} />
                    )
                })}
            </div>
        </div>
    )
}