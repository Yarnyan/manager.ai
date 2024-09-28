
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { banners } from './data/data';
import Banner from '../../components/Banner/Banner';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useMediaQuery } from 'usehooks-ts';
import { useAppSelector } from '../../store/hooks';
import React, { useEffect } from 'react';
type Props = {}


const navigation = {
  nextEl: '.swiper-bannersRec-button-next',
  prevEl: '.swiper-bannersRec-button-prev',
  clickable: true,
}
export default function BannerRec({ }: Props) {
  const mobile = useMediaQuery('(min-width: 768px)')

  const bots = useAppSelector((state) => state.bots.allBots);

  return (
    <div className='mt-16 sm:mt-8 z-1'>
      <h1 className='text-xl font-normal text-[var(--textColor)]'>Recommended</h1>
      <div className='mt-4 w-full relative z-1'>
        <Swiper
          slidesPerView={mobile ? 3 : 1}
          spaceBetween={30}
          navigation={navigation}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {bots.slice(4, 100000).map((banner) => {
            return (
              <SwiperSlide key={banner.id} className='swiper-slide-banners h-full pr-2 last:pr-0 z-1'>
                <Banner id={banner.id} img={''} botname={banner.botname} description={banner.description} />
              </SwiperSlide>
            )
          })
          }
        </Swiper>
        <div className='flex absolute items-center justify-end z-10 w-full mt-2'>
          <div className='swiper-bannersRec-button-prev'><IoIosArrowBack /></div>
          <div className='swiper-bannersRec-button-next'><IoIosArrowForward /></div>
        </div>
      </div>
    </div>
  )
}