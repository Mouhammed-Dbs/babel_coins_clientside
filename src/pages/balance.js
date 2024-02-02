import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
    <div className="container m-auto h-screen">
      <div className="flex">
        {coins.map((coin) => (
          <div
            key={coin.currencyName}
            className="w-64 mt-10 mx-2 p-6 bg-neutral-100 dark:bg-default-100 text-center rounded-lg shadow-lg"
          >
            <div className="flex justify-between">
              <Image
                className="rounded-full w-12 h-12 self-center"
                src={"https://payeer.com/static/trade/icons/tether.png"}
                width={50}
                height={50}
                alt=""
              ></Image>
              <div className="w-full">
                  <h1 className="text-xl">{coin.currencyName}</h1>
                  <h1 className="text-sm">{coin.network}</h1>
                <h1 className="font-bold text-xl">{coin.balance}</h1>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button
                onClick={() => router.push(`deposit`)}
                className="text-primary px-2 border-1 border-primary rounded-full h-9 hover:bg-primary hover:text-white"
              >
                Deposit
              </Button>
              <Button className="text-primary px-2 border-1 border-primary rounded-full h-9 hover:bg-primary hover:text-white">
                Withdrawal
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
