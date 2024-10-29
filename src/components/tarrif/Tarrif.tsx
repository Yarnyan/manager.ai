import { splitFormatText } from '../../helpers/split/split';
import { FaCheck } from "react-icons/fa";
type Props = {
    id: number;
    name: string;
    price: number;
    description: string;
    pros: string;
};

export default function Tarrif({ id, name, price, description, pros }: Props) {
    return (
        <div className='mt-4 tarrif-container flex flex-col justify-between px-4 pt-6 bg-[var(--sideBarColor)] rounded-2xl p-6 max-w-[300px]'>
            <div>
                <h1 className='text-3xl font-normal text-[var(--textColor)] text-center'>{name}</h1>
                <p className='mt-4 text-l text-[var(--mutedTextColor)] text-center'>{description}</p>
                <div className='mt-4 flex items-center justify-center flex-col'>
                    <p className='text-2xl font-normal text-[var(--textColor)] text-center'>{price} €</p>
                    <p className='text-l font-normal text-[var(--mutedTextColor)] text-center'>per month</p>
                </div>
                <div className='mt-4 flex items-center justify-center flex-col'>
                    <button className='min-w-[120px] text-m font-normal bg-[#F5F5F5] h-[40px] rounded-xl text-[#000000] hover:bg-[#d3d3d6] duration-300'>Get started</button>
                </div>
                <div className='mt-4 flex items-center justify-center flex-col'>
                    <p className='text-l text-[var(--textColor)]'>Everything in {name}, plus:</p>
                    <div className='mt-4'>
                        {splitFormatText(pros).map((item) => {
                            return (
                                <div className='flex items-center'>
                                    <FaCheck fill='#a2a2ac' size={14}/>
                                    <p className='ml-2 text-l text-[var(--mutedTextColor)]'>
                                        {item}
                                    </p>
                                </div>
                            )

                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
