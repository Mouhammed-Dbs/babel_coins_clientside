export default function Fees() {
  // edit this when edit Number of rows
  // grid-rows-10

  return (
    <div className="mx-auto bg-slate-50 dark:bg-default-50">
      <div className="section1 w-full text-left h-80">
        <div className="flex w-2/5 h-full text-xl ml-12 font-bold">
          <h1 className="self-center leading-8">
            {`At Babelcoins, we believe in transparency and fairness. Our fee
            structure is designed to be clear and straightforward, ensuring that
            you know exactly what you're paying for. We offer competitive fees
            for all transactions, including trading, deposits, and withdrawals.`}
          </h1>
        </div>
      </div>
      <div className="section2 py-8 lg:py-16 md:py-12">
        <div className="w-fit m-auto">
          <div className="w-min grid grid-flow-col gap-12 auto-cols-max mb-4">
            <h1 className="min-w-28 md:min-w-56 font-bold text-2xl self-end pl-2">
              Fees
            </h1>
            <h1 className="md:min-w-56 font-bold text-sm self-end pl-2">
              Currencies
            </h1>
          </div>
          <div className="w-fit grid grid-flow-col auto-cols-max md:gap-12 gap-1 h-max p-4 md:font-bold text-xs backdrop-blur-xs bg-slate-300/10 dark:bg-black/25 rounded-md shadow-md">
            <div className="grid grid-rows-6 md:gap-5 gap-4">
              <p className="md:min-w-56 pl-2">Account opening</p>
              <p className="pl-2">Monthly service</p>
              <p className="pl-2">Monthly service</p>
              <p className="pl-2">Traging operations</p>
              <p className="pl-2">Currency comesion</p>
              <p className="pl-2">API</p>
            </div>
            <div className="grid grid-rows-6 md:gap-5 gap-4">
              <p className="md:min-w-56 pl-1">-</p>
              <p className="pl-2">-</p>
              <p className="pl-2">USD/EUR/RUB</p>
              <p className="pl-2">USD/EUR/RUB/BTC</p>
              <p className="pl-2">USD/EUR</p>
              <p className="pl-2">USD/EUR/RUB/LTC</p>
            </div>
            <div className="grid grid-rows-6 md:gap-5 gap-4">
              <p className="pl-2">100%</p>
              <p className="pl-2">0%</p>
              <p className="pl-2">0%</p>
              <p className="pl-2">0%</p>
              <p className="pl-2">0%</p>
              <p className="pl-2">0%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section3 py-8 lg:py-16 md:py-12">
        <div className="w-fit m-auto">
          <div className="w-min grid grid-flow-col md:gap-12 gap-3 auto-cols-max mb-4">
            <h1 className="min-w-24 md:min-w-40 font-bold md:text-2xl self-end pl-2">
              ADD Fees
            </h1>
            <h1 className="md:min-w-40 font-bold md:text-sm text-xs self-end pl-2">
              Currencies
            </h1>
            <h1 className="md:min-w-40 font-bold md:text-sm text-xs self-end pl-2">
              Personal
            </h1>
            <h1 className="font-bold md:text-sm text-xs self-end pl-2">
              Business
            </h1>
          </div>
          <div className="w-fit grid grid-flow-col auto-cols-max md:gap-12 gap-2 h-max p-4 md:font-bold text-xs md:text-sm backdrop-blur-xs bg-slate-300/10 dark:bg-black/25 rounded-md shadow-md">
            <div className="max-w-max md:max-w-min md:min-w-40 grid grid-rows-10 gap-4">
              <p className="w-20 md:w-fit pl-2 break-words">Account opening</p>
              <p className="w-20 md:w-fit pl-2 break-words">Bitcoin</p>
              <p className="w-20 md:w-fit pl-2 break-words">Tether</p>
              <p className="w-20 md:w-fit pl-2 break-words">Ethereum</p>
              <p className="w-20 md:w-fit pl-2 break-words">Bitcoin</p>
              <p className="w-20 md:w-fit pl-2 break-words">Tether</p>
              <p className="w-20 md:w-fit pl-2 break-words">Ethereum</p>
              <p className="w-20 md:w-fit pl-2 break-words">Bitcoin</p>
              <p className="w-20 md:w-fit pl-2 break-words">Tether</p>
              <p className="w-20 md:w-fit pl-2 break-words">Ethereum</p>
            </div>
            <div className="max-w-max md:max-w-min md:min-w-40 grid grid-rows-10 gap-4">
              <p className="w-20 md:w-fit pl-4 break-words">BTC</p>
              <p className="w-20 md:w-fit pl-4 break-words">USDT</p>
              <p className="w-20 md:w-fit pl-4 break-words">ETH</p>
              <p className="w-20 md:w-fit pl-4 break-words">BTC</p>
              <p className="w-20 md:w-fit pl-4 break-words">USDT</p>
              <p className="w-20 md:w-fit pl-4 break-words">ETH</p>
              <p className="w-20 md:w-fit pl-4 break-words">BTC</p>
              <p className="w-20 md:w-fit pl-4 break-words">USDT</p>
              <p className="w-20 md:w-fit pl-4 break-words">ETH</p>
              <p className="w-20 md:w-fit pl-4 break-words">ETH</p>
            </div>
            <div className="max-w-max md:max-w-min md:min-w-40 grid grid-rows-10 gap-4">
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">100000000%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">10000%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
            </div>
            <div className="max-w-max md:max-w-min md:min-w-40 grid grid-rows-10 gap-4">
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">100%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">10%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="section4 py-8 lg:py-16 md:py-12">
        <div className="w-fit m-auto">
          <div className="w-min grid grid-flow-col md:gap-12 gap-3 auto-cols-max mb-4">
            <h1 className="min-w-24 md:min-w-40 font-bold md:text-2xl self-end pl-2">
              Withdrawals
            </h1>
            <h1 className="md:min-w-40 font-bold md:text-sm text-xs self-end pl-2">
              Currencies
            </h1>
            <h1 className="md:min-w-40 font-bold md:text-sm text-xs self-end pl-2">
              Personal
            </h1>
            <h1 className="font-bold md:text-sm text-xs self-end pl-2">
              Business
            </h1>
          </div>
          <div className="w-fit grid grid-flow-col auto-cols-max md:gap-12 gap-2 h-max p-4 md:font-bold text-xs md:text-sm backdrop-blur-xs bg-slate-300/10 dark:bg-black/25 rounded-md shadow-md">
            <div className="max-w-max md:max-w-min md:min-w-40 grid grid-rows-10 gap-4">
              <p className="w-20 md:w-fit pl-2 break-words">Account opening</p>
              <p className="w-20 md:w-fit pl-2 break-words">Bitcoin</p>
              <p className="w-20 md:w-fit pl-2 break-words">Tether</p>
              <p className="w-20 md:w-fit pl-2 break-words">Ethereum</p>
              <p className="w-20 md:w-fit pl-2 break-words">Bitcoin</p>
              <p className="w-20 md:w-fit pl-2 break-words">Tether</p>
              <p className="w-20 md:w-fit pl-2 break-words">Ethereum</p>
              <p className="w-20 md:w-fit pl-2 break-words">Bitcoin</p>
              <p className="w-20 md:w-fit pl-2 break-words">Tether</p>
              <p className="w-20 md:w-fit pl-2 break-words">Ethereum</p>
            </div>
            <div className="max-w-max md:max-w-min md:min-w-40 grid grid-rows-10 gap-4">
              <p className="w-20 md:w-fit pl-4 break-words">BTC</p>
              <p className="w-20 md:w-fit pl-4 break-words">USDT</p>
              <p className="w-20 md:w-fit pl-4 break-words">ETH</p>
              <p className="w-20 md:w-fit pl-4 break-words">BTC</p>
              <p className="w-20 md:w-fit pl-4 break-words">USDT</p>
              <p className="w-20 md:w-fit pl-4 break-words">ETH</p>
              <p className="w-20 md:w-fit pl-4 break-words">BTC</p>
              <p className="w-20 md:w-fit pl-4 break-words">USDT</p>
              <p className="w-20 md:w-fit pl-4 break-words">ETH</p>
              <p className="w-20 md:w-fit pl-4 break-words">ETH</p>
            </div>
            <div className="max-w-max md:max-w-min md:min-w-40 grid grid-rows-10 gap-4">
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">100000000%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">10000%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
              <p className="w-20 md:w-fit pl-4 break-words">0%</p>
            </div>
            <div className="max-w-max md:max-w-min md:min-w-40 grid grid-rows-10 gap-4">
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">100%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">10%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
              <p className="w-20 md:w-fit pl-2 break-words">0%</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="section4 py-8 lg:py-16 md:py-12">
        <div className="w-fit m-auto">
          <div className="w-min grid grid-flow-col gap-12 auto-cols-max mb-4">
            <h1 className="min-w-48 font-bold text-2xl self-end pl-2">
              Withdrawals
            </h1>
            <h1 className="min-w-48 font-bold text-sm self-end pl-2">
              Currencies
            </h1>
            <h1 className="min-w-48 font-bold text-sm self-end pl-2">
              Personal
            </h1>
            <h1 className="font-bold text-sm self-end pl-2">Business</h1>
          </div>
          <div className="w-fit grid grid-flow-col auto-cols-max gap-12 h-max p-4 font-bold text-sm backdrop-blur-xs bg-slate-300/10 dark:bg-black/25 rounded-md shadow-md">
            <div className="grid grid-rows-6 gap-4">
              <p className="min-w-48 pl-2">Account opening</p>
              <p className="pl-2">Bitcoin</p>
              <p className="pl-2">Tether</p>
              <p className="pl-2">Ethereum</p>
              <p className="pl-2">Bitcoin</p>
              <p className="pl-2">Tether</p>
              <p className="pl-2">Ethereum</p>
              <p className="pl-2">Bitcoin</p>
              <p className="pl-2">Tether</p>
              <p className="pl-2">Ethereum</p>
            </div>
            <div className="grid grid-rows-6 gap-4">
              <p className="min-w-48 pl-2">BTC</p>
              <p className="pl-2">USDT</p>
              <p className="pl-2">ETH</p>
              <p className="pl-2">BTC</p>
              <p className="pl-2">USDT</p>
              <p className="pl-2">ETH</p>
              <p className="pl-2">BTC</p>
              <p className="pl-2">USDT</p>
              <p className="pl-2">ETH</p>
            </div>
            <div className="grid grid-rows-6 gap-4">
              <p className="min-w-48 pl-2">0%</p>
              <p className="pl-2">0%</p>
              <p className="pl-2">0%</p>
              <p className="pl-2">0%</p>
              <p className="pl-2">0%</p>
              <p className="pl-2">0%</p>
            </div>
            <div className="grid grid-rows-6 gap-4">
              <p className="min-w-16 pl-2">0%</p>
              <p className="pl-2">0%</p>
              <p className="pl-2">0%</p>
              <p className="pl-2">0%</p>
              <p className="pl-2">0%</p>
              <p className="pl-2">0%</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
