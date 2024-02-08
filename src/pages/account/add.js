import { useRouter } from "next/router";
// import { useContext } from "react";
// import { BalanceContext } from "../components/context/BalanceContext";
export default function Deposit(props) {
  //   const {coins} = useContext(BalanceContext)
  const router = useRouter();
  return (
    <div>
      {/* {coins.filter(coin => coin.currencyName === router.query.coin).map((coin) => ( */}
      <div
        //   key={coin.currencyName}
        className="m-auto mt-20 w-fit p-6 border-1 shadow-md border-primary bg-neutral-100 dark:bg-default-100 rounded-md"
      >
        <h1 className="font-bold py-2">
          Coin: &ensp;{router.query.currencyName}
        </h1>
        <h1 className="font-bold py-2">
          Network: &ensp;{router.query.network}
        </h1>
        <h1 className="font-bold py-2">
          Address: &emsp;<u>{router.query.address}</u>
        </h1>
      </div>
      {/* ))} */}
    </div>
  );
}
