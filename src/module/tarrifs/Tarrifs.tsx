import { useEffect } from 'react'
import { isApiError } from '../../helpers/auth/apiError'
import Tarrif from '../../components/tarrif/Tarrif'
import { ITarrif } from './entity/entity'
import { useLazyGetSubsQuery } from './api/subs'
type Props = {}

export default function Tarrifs({ }: Props) {
  const [getSubs, subs] = useLazyGetSubsQuery()

  useEffect(() => {
    try {
      getSubs(null)
    } catch (error) {

    }
    return () => {

    };
  }, []);

  return (
    <div className="w-full sm:justify-center">
      <div className='flex mt-4 align-center justify-between w-full flex-wrap sm:items-center sm:justify-center'>
        {subs.data?.map((tarrif: ITarrif) => {
          return (
            <Tarrif id={tarrif.id} name={tarrif.name} price={tarrif.price} description={tarrif.description} key={tarrif.id} />
          )
        })}
      </div>
    </div>
  )
}
