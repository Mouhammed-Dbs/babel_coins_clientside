import { Button } from "@nextui-org/react";
import MyCoinInput from "../utils/MyCoinInput";
import { addMarketOrder } from "../../../public/global_functions/trade";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function MarketTrade({ firstSymbol, secondSymbol }) {
  const [buyLoading, setBuyLoading] = useState(false);
  const [sellLoading, setSellLoading] = useState(false);
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const [showBuy, setShowBuy] = useState(true); // للتحكم في إظهار قسم الشراء أو البيع

  const addMyMarketOrder = async (
    firstSymbol,
    secondSymbol,
    amount,
    action
  ) => {
    try {
      if (action === "buy") setBuyLoading(true);
      else setSellLoading(true);
      const res = await addMarketOrder(
        firstSymbol,
        secondSymbol,
        amount,
        action
      );
      if (!res.error) {
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (action === "buy") setBuyLoading(false);
      else setSellLoading(false);
    }
  };

  const handleBuyOrder = async () => {
    await addMyMarketOrder(firstSymbol, secondSymbol, buyAmount, "buy");
  };

  const handleSellOrder = async () => {
    await addMyMarketOrder(firstSymbol, secondSymbol, sellAmount, "sell");
  };

  return (
    <div className="p-4 bg-white dark:bg-default-50/50 rounded-md h-[500px]">
      {/* Toggle button visible only on mobile */}
      <div className="mb-4 lg:hidden flex justify-center">
        <Button
          auto
          onClick={() => setShowBuy(!showBuy)}
          className="border-2 border-primary text-primary w-full"
        >
          {showBuy ? (
            <span className="flex items-center">
              Switch <FiArrowRight className="mx-1" />{" "}
              <span className="text-red-500 font-bold">SELL</span>
            </span>
          ) : (
            <span className="flex items-center">
              Switch <FiArrowRight className="mx-1" />{" "}
              <span className="text-green-500 font-bold">BUY</span>
            </span>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Section for Buy */}
        <div className={`${showBuy ? "" : "hidden"} lg:block`}>
          <h2 className="text-lg lg:text-xl font-bold max-w-64 m-auto mt-2 pl-1">
            BUY {firstSymbol}
          </h2>
          <div className="grid grid-rows-3 gap-5 mt-4 w-fit m-auto">
            <MyCoinInput
              onChange={(e) => setBuyAmount(Number(e.target.value))}
              symbol={firstSymbol}
              label={"I GET"}
            />
            <MyCoinInput
              symbol={secondSymbol}
              label={"PRICE PER " + firstSymbol}
              readOnly={true}
            />
            <MyCoinInput symbol={secondSymbol} label={"I GIVE"} />
          </div>
          <div className="flex gap-3 mt-5 m-auto w-fit text-sm">
            <p>FEE {"0.095%"}</p>
            <p className="text-red-400">{"(0.000001 BTC)"}</p>
          </div>
          <Button
            isDisabled={buyLoading}
            onClick={handleBuyOrder}
            className="bg-green-500 text-white m-auto block mt-5 min-w-28"
          >
            {buyLoading ? "BUYING.." : "BUY"}
          </Button>
        </div>

        {/* Section for Sell */}
        <div className={`${!showBuy ? "" : "hidden"} lg:block`}>
          <h2 className="text-lg lg:text-xl font-bold max-w-64 m-auto mt-2 pl-1">
            SELL {firstSymbol}
          </h2>
          <div className="grid grid-rows-3 gap-5 mt-4 w-fit m-auto">
            <MyCoinInput
              onChange={(e) => setSellAmount(Number(e.target.value))}
              symbol={firstSymbol}
              label={"I GIVE"}
            />
            <MyCoinInput
              symbol={secondSymbol}
              label={"PRICE PER " + firstSymbol}
              readOnly={true}
            />
            <MyCoinInput symbol={secondSymbol} label={"I GET"} />
          </div>
          <div className="flex gap-3 mt-5 m-auto w-fit text-sm">
            <p>FEE {"0.095%"}</p>
            <p className="text-red-400">{"(0.000001 BTC)"}</p>
          </div>
          <Button
            isDisabled={sellLoading}
            onClick={handleSellOrder}
            className="bg-red-500 text-white m-auto block mt-5 min-w-28"
          >
            {sellLoading ? "SELLING.." : "SELL"}
          </Button>
        </div>
      </div>
    </div>
  );
}
