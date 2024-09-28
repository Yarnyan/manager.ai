import React, { useEffect } from 'react';
import LittleBanner from '../../components/littleBanner/LittleBanner';
import { useAppSelector } from '../../store/hooks';

type Props = {}

export default function BannersTry({ }: Props) {
    const bots = useAppSelector((state) => state.bots.allBots);

    useEffect(() => {
        console.log(bots); 
    }, [bots]); 

    return (
        <div className='mt-16 sm:mt-8 w-full'>
            <h1 className='text-xl font-normal text-[var(--textColor)]'>Try these</h1>
            <div className='mt-2 w-full flex flex-wrap sm:flex-nowrap sm:overflow-x-auto sm:pb-2'>
                {bots.slice(3, 4).map((banner) => (
                    <LittleBanner key={banner.id} img={''} name={banner.botname} description={banner.description} />
                ))}
            </div>
        </div>
    );
}
