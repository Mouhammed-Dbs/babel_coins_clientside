import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import { MyCoins } from "@/components/context/BalanceContext";

// export const BalanceContext = createContext();

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
    // <MyCoins>
    <div className="m-auto">
      <div className="w-full text-center">
        <h1 className="w-fit m-auto my-4 text-xl font-bold border-b-1 border-black dark:border-white">
          All Accounts
        </h1>
        <div className="w-fit no-scrollbar m-auto mb-14 pt-7 pb-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center overflow-y-scroll h-screen">
          {coins.map((coin) => (
            <div
              key={coin.currencyName}
              className="relative w-64 h-min mt-2 mr-2 p-4 bg-neutral-100 dark:bg-default-100 text-center rounded-md shadow-lg"
            >
              <div className="absolute bg-neutral-100 rounded-full w-12 h-12 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Image
                  className="p-1"
                  src={`/images/coins/${coin.currencyName}.png`}
                  width={50}
                  height={50}
                  alt=""
                ></Image>
              </div>

              <div className="w-full mt-2">
                <h1 className="text-lg">{coin.currencyName}</h1>
                <h1 className="text-xs">{coin.network}</h1>
                <h1 className="font-bold text-lg">{coin.balance}</h1>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-1">
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
    // </MyCoins>
  );
}
