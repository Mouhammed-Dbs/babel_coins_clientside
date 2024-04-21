import { Button } from "@nextui-org/react";
import MyCoinInput from "../utils/MyCoinInput";
export default function LimitTrade({ currencyName, symbol }) {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 py-4 bg-white dark:bg-default-50/50 rounded-md h-[440px]">
      <div>
        <h2 className="text-xl font-bold max-w-64 m-auto mt-2 pl-1">
          BUY {currencyName}
        </h2>
        <div className="grid grid-rows-3 gap-5 mt-4 w-fit m-auto">
          <MyCoinInput symbol={symbol} label={"I GET"} />
          <MyCoinInput symbol={"USD"} label={"PRICE PER " + symbol} />
          <MyCoinInput symbol={"USD"} label={"I GIVE"} />
        </div>
        <div className="flex gap-3 mt-5 m-auto w-fit text-sm">
          <p>FEE {"0.095%"}</p>
          <p className="text-red-400">{"(0.000001 BTC)"}</p>
        </div>
        <Button className="bg-green-500 text-white m-auto block mt-5 min-w-28">
          BUY
        </Button>
      </div>
      <div>
        <h2 className="text-xl font-bold max-w-64 m-auto mt-2 pl-1">
          SELL {currencyName}
        </h2>
        <div className="grid grid-rows-3 gap-5 mt-4 w-fit m-auto">
          <MyCoinInput symbol={symbol} label={"I GIVE"} />
          <MyCoinInput symbol={"USD"} label={"PRICE PER " + symbol} />
          <MyCoinInput symbol={"USD"} label={"I GET"} />
        </div>
        <div className="flex gap-3 mt-5 m-auto w-fit text-sm">
          <p>FEE {"0.095%"}</p>
          <p className="text-red-400">{"(0.000001 BTC)"}</p>
        </div>
        <Button className="bg-red-500 text-white m-auto block mt-5 min-w-28">
          SELL
        </Button>
      </div>
    </div>
  );
}
