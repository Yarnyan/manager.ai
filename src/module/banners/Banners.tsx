
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { banners } from './data/data';
import Banner from '../../components/Banner/Banner';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useMediaQuery } from 'usehooks-ts'
type Props = {}


const navigation = {
  nextEl: '.swiper-banners-button-next',
  prevEl: '.swiper-banners-button-prev',
  clickable: true,
}
export default function Banners({ }: Props) {
  const mobile = useMediaQuery('(min-width: 768px)')
  return (
    <div className='mt-4'>
      <h1 className='text-xl font-normal text-[var(--textColor)]'>Для вас</h1>
      <div className='mt-4 w-full relative'>
        <Swiper
          slidesPerView={mobile ? 3 : 1}
          spaceBetween={30}
          navigation={navigation}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        
          // autoplay={{ delay: 4000, disableOnInteraction: false }}
        >
          {banners.map((banner) => {
            return (
              <SwiperSlide key={banner.id} className='swiper-slide-banners pr-2 last:pr-0 '>
                <Banner img={banner.img} author={banner.author} name={banner.name} description={banner.description} />
              </SwiperSlide>
            )
          })
          }
        </Swiper>
        <div className='flex absolute items-center justify-end z-10 w-full mt-2'>
          <div className='swiper-banners-button-prev'><IoIosArrowBack /></div>
          <div className='swiper-banners-button-next'><IoIosArrowForward /></div>
        </div>
      </div>
    </div>
  )
}