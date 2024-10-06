import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import Banner from '../../components/Banner/Banner';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useMediaQuery } from 'usehooks-ts';
import { useLazyGetPublicBotsQuery } from './api/banners';
import { useEffect } from 'react';
import { Bot } from '../profile/entity/bot';
import { useAppDispatch } from '../../store/hooks';
import { setAllBots } from '../../store/features/bots/botsSlice';
import Loader from '../../components/loader/Loader';
type Props = {
  openBuilderModal: () => void
}

const navigation = {
  nextEl: '.swiper-banners-button-next',
  prevEl: '.swiper-banners-button-prev',
  clickable: true,
}

export default function Banners({openBuilderModal}: Props) {
  const [getPublicBots, {data: bots, isLoading}] = useLazyGetPublicBotsQuery();
  
  const dispatch = useAppDispatch();
  const mobile = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    try {
      getPublicBots(null).then((res) => {
        dispatch(setAllBots(res.data || []));
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  if(isLoading) {
    return <Loader />
  }

  return (
    <div className='mt-4'>
      <h1 className='text-xl font-normal text-[var(--textColor)]'>For you</h1>
      <div className='mt-4 w-full relative'>
        {bots && bots.length > 0 && (
          <div>
            <Swiper
              slidesPerView={mobile ? 3 : 1}
              spaceBetween={30}
              navigation={navigation}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {bots.slice(0, 3).map((banner: Bot) => (
                <SwiperSlide key={banner.id} className='swiper-slide-banners pr-2 last:pr-0'>
                  <Banner id={banner.id} img={''} botname={banner.botname} description={banner.description} prompt={banner.prompt} openBuilderModal={openBuilderModal} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='flex absolute items-center justify-end z-10 w-full mt-2'>
              <div className='swiper-banners-button-prev'><IoIosArrowBack /></div>
              <div className='swiper-banners-button-next'><IoIosArrowForward /></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
