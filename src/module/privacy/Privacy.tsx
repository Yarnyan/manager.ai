import { conditions } from './data/data'
type Props = {}

export default function Privacy({ }: Props) {
    return (
        <div>
            <h1 className='text-3xl text-center'>Privacy</h1>
            <div className='mt-4'>
                {conditions.map((condition, index) => (
                    <div key={index}>
                        <h2 className='font-bold text-xl mt-2'>{condition.title}</h2>
                        {condition.criteria.map((criteria) => (
                            <p key={index} className='font-normal text-x mt-2 text-[var(--mutedTextColor)]'>{criteria.id}. {criteria.description}</p>
                        )
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}