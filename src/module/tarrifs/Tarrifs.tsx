import { useEffect } from 'react'
import { isApiError } from '../../helpers/auth/apiError'
import Tarrif from '../../components/tarrif/Tarrif'
import { ITarrif } from './entity/entity'
import { useLazyGetSubsQuery } from './api/subs'
type Props = {}

export default function Tarrifs({ }: Props) {
  const [getSubs, subs] = useLazyGetSubsQuery()
  const data: ITarrif[] = [
    {
      id: 1,
      name: "Entry",
      price: 20.00,
      description: "For businesses starting their content management",
      pros: "5 Users included; Up to 30 user seats; 1 Space included; Activity Log; Custom Roles; Replace Assets; Translatable Slugs; Webhook Secrets; 500GB Traffic/month included",
    },
    {
      id: 2,
      name: "Entry",
      price: 45.00,
      description: "For businesses starting their content management",
      pros: "5 Users included; Up to 30 user seats; 1 Space included; Activity Log; Custom Roles; Replace Assets; Translatable Slugs; Webhook Secrets; 500GB Traffic/month included",
    },
    {
      id: 3,
      name: "Entry",
      price: 67.50,
      description: "For businesses starting their content management",
      pros: "5 Users included; Up to 30 user seats; 1 Space included; Activity Log; Custom Roles; Replace Assets; Translatable Slugs; Webhook Secrets; 500GB Traffic/month included; 5 Users included; Up to 30 user seats; 1 Space included; Activity Log; Custom Roles; Replace Assets; Translatable Slugs; Webhook Secrets; 500GB Traffic/month included",
    },
    {
      id: 4,
      name: "Entry",
      price: 100.00,
      description: "For businesses starting their content management",
      pros: "5 Users included; Up to 30 user seats; 1 Space included; Activity Log; Custom Roles; Replace Assets; Translatable Slugs; Webhook Secrets; 500GB Traffic/month included; 5 Users included; Up to 30 user seats; 1 Space included; Activity Log; Custom Roles; Replace Assets; Translatable Slugs; Webhook Secrets; 500GB Traffic/month included",
    },
  ]

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
      <div className='flex mt-4 align-center w-full flex-wrap sm:items-center sm:justify-center'>
        {subs.data?.map((tarrif: any) => {
          return (
            <Tarrif id={tarrif.id} name={tarrif.name} price={tarrif.price} description={tarrif.description} key={tarrif.id} />
          )
        })}
      </div>
    </div>
  )
}