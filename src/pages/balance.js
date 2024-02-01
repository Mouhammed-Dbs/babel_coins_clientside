import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Balance() {
  const router = useRouter();
  const [coins, setCoins] = useState([
    { name: "USDT", network: "TRC20", address: "afopnwqefpnqpfn" },
    { name: "LTC", network: "Litcoin", address: "tefwnwqefpnqpfn" },
  ]);
  return (
    <div className="container m-auto h-screen">
      <div className="flex">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="w-60 mt-10 mx-2 p-6 bg-neutral-100 dark:bg-default-100 text-center rounded-lg shadow-lg"
        >
          <div className="flex justify-between">
            <Image
              src={"/images/logo.svg"}
              width={35}
              height={35}
              alt=""
            ></Image>
            <div className="w-full">
              <h1 className="text-xl">{coin.name} {coin.network}</h1>
              <h1 className="font-bold text-xl">0.0$</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button
              onClick={() => router.push(`deposit/${coin.name}`)}
              className="text-primary border-1 border-primary rounded-full h-9 hover:bg-primary hover:text-white"
            >
              Deposit
            </Button>
            <Button className="text-primary border-1 border-primary rounded-full h-9 hover:bg-primary hover:text-white">
              withdrawal
            </Button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
