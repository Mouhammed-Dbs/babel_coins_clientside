import { Button } from "@nextui-org/react";
import MyCoinInput from "../utils/MyCoinInput";
import { addLimitOrder } from "../../../public/global_functions/trade";
import { useState } from "react";
export default function TriggerTrade({ firstSymbol, secondSymbol }) {
  const [buyLoading, setBuyLoading] = useState(false);
  const [sellLoading, setSellLoading] = useState(false);
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const [buyPriceLimit, setBuyPriceLimit] = useState(0);
  const [sellPriceLimit, setSellPriceLimit] = useState(0);
  const [buyStopPrice, setBuyStopPrice] = useState(0);
  const [sellStopPrice, setSellStopPrice] = useState(0);

  const addMyLimitOrder = async (
    firstSymbol,
    secondSymbol,
    amount,
    price,
    orderType,
    orderAction,
    stopPrice
  ) => {
    try {
      if (orderAction === "buy") setBuyLoading(true);
      else setSellLoading(true);
      const res = await addLimitOrder(
        firstSymbol,
        secondSymbol,
        amount,
        price,
        orderType,
        orderAction,
        stopPrice
      );
      if (!res.error) {
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (orderAction === "buy") setBuyLoading(false);
      else setSellLoading(false);
    }
  };

  const handleBuyOrder = async () => {
    await addMyLimitOrder(
      firstSymbol,
      secondSymbol,
      buyAmount,
      buyPriceLimit,
      "stop-limit",
      "buy",
      buyStopPrice
    );
  };

  const handleSellOrder = async () => {
    await addMyLimitOrder(
      firstSymbol,
      secondSymbol,
      sellAmount,
      sellPriceLimit,
      "stop-limit",
      "sell",
      sellStopPrice
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 px-4 py-4 bg-white dark:bg-default-50/50 rounded-md h-[440px]">
      <div>
        <h2 className="text-xl font-bold max-w-64 m-auto mt-2 pl-1">
          BUY {firstSymbol}
        </h2>
        <div className="grid grid-rows-3 gap-2 mt-2 w-fit m-auto">
          <MyCoinInput
            onChange={(e) => setBuyAmount(Number(e.target.value))}
            symbol={firstSymbol}
            label={"I GET"}
          />
          <MyCoinInput
            onChange={(e) => setBuyPriceLimit(Number(e.target.value))}
            symbol={secondSymbol}
            label={"PRICE PER " + firstSymbol}
          />
          <MyCoinInput
            onChange={(e) => setBuyStopPrice(Number(e.target.value))}
            symbol={secondSymbol}
            label={"STOP PRICE"}
          />
          <MyCoinInput symbol={secondSymbol} label={"I GIVE"} />
        </div>
        <div className="flex gap-3 mt-5 m-auto w-fit text-sm">
          <p>FEE {"0.095%"}</p>
          <p className="text-red-400">{"(0.000001 BTC)"}</p>
        </div>
        <Button
          onClick={handleBuyOrder}
          className="bg-green-500 text-white m-auto block mt-5 min-w-28"
        >
          BUY
        </Button>
      </div>
      <div>
        <h2 className="text-xl font-bold max-w-64 m-auto mt-2 pl-1">
          SELL {firstSymbol}
        </h2>
        <div className="grid grid-rows-3 gap-2 mt-2 w-fit m-auto">
          <MyCoinInput
            onChange={(e) => setSellAmount(Number(e.target.value))}
            symbol={firstSymbol}
            label={"I GIVE"}
          />
          <MyCoinInput
            onChange={(e) => setSellPriceLimit(Number(e.target.value))}
            symbol={secondSymbol}
            label={"PRICE PER " + firstSymbol}
          />
          <MyCoinInput
            onChange={(e) => setSellStopPrice(Number(e.target.value))}
            symbol={secondSymbol}
            label={"STOP PRICE"}
          />
          <MyCoinInput symbol={secondSymbol} label={"I GET"} />
        </div>
        <div className="flex gap-3 mt-5 m-auto w-fit text-sm">
          <p>FEE {"0.095%"}</p>
          <p className="text-red-400">{"(0.000001 BTC)"}</p>
        </div>
        <Button
          onClick={handleSellOrder}
          className="bg-red-500 text-white m-auto block mt-5 min-w-28"
        >
          SELL
        </Button>
      </div>
    </div>
  );
}
