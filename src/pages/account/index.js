import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MyLoading from "@/components/MyLoading";
import { getBalanceCoins } from "../../../public/global_functions/coins";

export default function Balance() {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    getBalanceCoins()
      .then((result) => {
        if (!result.error) setCoins(result.data);
        setPageLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPageLoading(false);
      });
  }, [coins]);

  if (pageLoading)
    return (
      <MyLoading
        msg="Loading.."
        color="primary"
        className={`text-black dark:text-white mt-24`}
      />
    );

  return (
    <div className="container h-screen m-auto no-scrollbar overflow-y-scroll">
      <div className="w-full md:w-[520px] lg:w-[790px] m-auto mt-4 pb-3">
        <div className="w-fit ml-4 md:ml-0 bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50 dark:bg-default-50">
            BALANCE
          </h1>
        </div>
        <p className="text-xs opacity-75 mt-1 ml-4 md:ml-0">
          Available accounts
        </p>
      </div>

      <div className="w-fit pb-44 ml-10 md:m-auto md:w-full text-center">
        <div className="w-full">
          <div className="w-fit m-auto my-4 bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to--default-300 dark:bg-default-50 pb-[2px]">
            <h1 className="w-fit text-xl font-bold bg-slate-50 dark:bg-default-50">
              All Accounts
            </h1>
          </div>
        </div>

        <div className="w-fit m-auto pt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {coins.map((coin) => (
            <div
              key={coin.network + "_" + coin.symbol}
              className="relative w-64 h-min mt-2 mr-2 p-4 bg-white dark:bg-default-100 text-center rounded-md shadow-md"
            >
              <div className="absolute shadow-inner overflow-hidden bg-slate-50 dark:bg-default-50 rounded-full w-14 h-14 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="absolute w-full h-1/2 top-1/2 bg-white dark:bg-default-100"></div>
              </div>
              <div className="absolute bg-white dark:bg-default-100 rounded-full w-12 h-12 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Image
                  className="p-1"
                  src={`/images/coins/${coin.symbol}.png`}
                  width={50}
                  height={50}
                  alt=""
                ></Image>
              </div>

              <div className="w-full mt-3">
                <h1 className="text-lg">{coin.currencyName}</h1>
                <h1 className="text-sm">{coin.network}</h1>
                <h1 className="font-bold text-lg">
                  {coin.validDepositeBalance}
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-1 mb-2">
                <Button
                  onClick={() =>
                    router.push({
                      pathname: "/account/add",
                      query: { curr: coin.symbol },
                    })
                  }
                  className="text-primary text-xs mr-2 px-2 border-1 border-primary rounded-full h-7 hover:bg-primary hover:text-white"
                >
                  Deposit
                </Button>
                <Button className="text-primary text-xs ml-2 px-2 border-1 border-primary rounded-full h-7 hover:bg-primary hover:text-white">
                  Withdrawal
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
