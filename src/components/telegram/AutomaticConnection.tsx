import { useState, forwardRef } from 'react';
type Props = {};

const AutomaticConnection = forwardRef<HTMLDivElement, Props>(({ }, ref) => {
    const [activeId, setActiveId] = useState<number | null>(null);

    const data = [
        {
            id: 1,
            username: '@Bot_Alpha',
        },
        {
            id: 2,
            username: '@Bot_Beta',
        },
        {
            id: 3,
            username: '@Bot_Gamma',
        },
        {
            id: 4,
            username: '@Bot_Delta',
        },
        {
            id: 5,
            username: '@Bot_Epsilon',
        },
        {
            id: 6,
            username: '@Bot_Zeta',
        },
        {
            id: 7,
            username: '@Bot_Eta',
        },
        {
            id: 8,
            username: '@Bot_Theta',
        },
        {
            id: 9,
            username: '@Bot_Iota',
        },
        {
            id: 10,
            username: '@Bot_Kappa',
        },
        {
            id: 11,
            username: '@Bot_Lambda',
        },
        {
            id: 12,
            username: '@Bot_Mu',
        },
    ];

    const handleUserClick = (id: number) => {
        setActiveId(id);
    };

    return (
        <div className='mt-4'>
            <div className='max-h-[224px] overflow-y-auto rounded sm:max-h-[192px]'> 
                {data.map((bot) => (
                    <div 
                        key={bot.id} 
                        className={`flex items-center justify-between py-2 px-4 cursor-pointer transition duration-300 
                            ${activeId === bot.id ? 'bg-[#4A4D52]' : 'bg-[#303136]'}`} 
                        onClick={() => handleUserClick(bot.id)}
                    >
                        <p className='text-l text-[var(--textColor)]'>{bot.username}</p>
                    </div>
                ))}
            </div>
            <div className='flex justify-center mt-4'>
                <input type="submit" className='p-2.5 bg-[#F5F5F5] min-w-[120px] rounded-2xl text-l font-normal text-[#000000] hover:bg-[#d3d3d6] duration-300 w-max cursor-pointer' value={'Connect'} />
            </div>
        </div>
    );
})

export default AutomaticConnection;