import { useRouter } from 'next/router'
 
export default function CoinDeposit() {
  const router = useRouter()
  return (
    <div className='h-screen'>
        <div className='m-auto mt-20 w-fit py-14 px-8 bg-neutral-100 dark:bg-default-100 rounded-md'>
            <h1 className='font-bold'>Coin:  {router.query.coin}</h1>
            <h1 className='font-bold'>Network:  {router.query.network}</h1>
            <h1 className='font-bold'>Address:  {router.query.address}</h1>
        </div>
    </div>

  )
}