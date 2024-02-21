import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Balance() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);

  const getCoins = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.BASE_API_URL}/users/all-accounts/${localStorage.getItem(
          "babel-coins-user-id"
        )}`
      );
      const result = res.data;
      if (!result.error) {
        setCoins(result.data);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getCoins();
  }, []);
  return (
    <div className="container h-screen m-auto no-scrollbar overflow-y-scroll pb-20">
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

      <div className="w-fit h-screen pb-[300px] ml-10 md:m-auto md:w-full text-center">
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
              key={coin.currencyName}
              className="relative w-64 h-min mt-2 mr-2 p-4 bg-white dark:bg-default-100 text-center rounded-md shadow-md"
            >
              <div className="absolute shadow-inner overflow-hidden bg-slate-50 dark:bg-default-50 rounded-full w-14 h-14 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="absolute w-full h-1/2 top-1/2 bg-white dark:bg-default-100"></div>
              </div>
              <div className="absolute bg-white dark:bg-default-100 rounded-full w-12 h-12 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Image
                  className="p-1"
                  src={`/images/coins/${coin.currencyName}.png`}
                  width={50}
                  height={50}
                  alt=""
                ></Image>
              </div>

              <div className="w-full mt-3">
                <h1 className="text-lg">{coin.currencyName}</h1>
                <h1 className="text-xs">{coin.network}</h1>
                <h1 className="font-bold text-lg">{coin.balance}</h1>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-1 mb-2">
                <Button
                  onClick={() =>
                    router.push({
                      pathname: "/account/add",
                      query: { ...coin },
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
