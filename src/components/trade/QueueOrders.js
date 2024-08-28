import { Button } from "@nextui-org/react";
import Image from "next/image";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import { useState } from "react";

export default function QueueOrders({
  pairSelected,
  pendingBuyOrders,
  pendingSellOrders,
  globalPrice,
}) {
  const [showOrders, setShowOrdes] = useState("all");
  const [numSellOrders, setNumSellOrders] = useState(35);

  const calculateAmountPrice = (amount, price) => {
    return Math.round(amount * price * 10000) / 10000;
  };

  return (
    <>
      {/* Tabs */}
      <div className="flex bg-white/85 dark:bg-default-200/50 rounded-md w-[93%] m-auto mt-1">
        <Button
          className={`w-1/3 p-1 border-1 ltr:rounded-l-md rtl:rounded-r-md hover:border-sky-500 ${
            showOrders === "buy" ? "border-sky-500" : ""
          }`}
          onClick={() => setShowOrdes("buy")}
        >
          <Image
            className="w-6 h-6 m-auto"
            src="/images/icons/trade-icon.svg"
            alt="alt"
            width={20}
            height={20}
          />
        </Button>
        <Button
          className={`w-1/3 p-1 border-1 hover:border-sky-500 ${
            showOrders === "all" ? "border-sky-500" : ""
          }`}
          onClick={() => setShowOrdes("all")}
        >
          <Image
            className="w-6 h-6 m-auto"
            src="/images/icons/trade-all-icon.svg"
            alt="alt"
            width={20}
            height={20}
          />
        </Button>
        <Button
          className={`w-1/3 p-1 border-1 ltr:rounded-r-md rtl:rounded-l-md hover:border-sky-500 ${
            showOrders === "sell" ? "border-sky-500" : ""
          }`}
          onClick={() => setShowOrdes("sell")}
        >
          <Image
            className="w-6 h-6 m-auto"
            src="/images/icons/trade-red-icon.svg"
            alt="alt"
            width={20}
            height={20}
          />
        </Button>
      </div>
      {/* Queue Orders */}
      <div className="p-2 h-full]">
        <div className="flex justify-between text-[11px] gap-2 mb-1">
          <span>PRICE({pairSelected.split("/")[1]})</span>
          <span>AMOUNT({pairSelected.split("/")[0]})</span>
          <span>VALUE({pairSelected.split("/")[1]})</span>
        </div>
        <ul
          className={`${showOrders === "buy" ? "hidden" : ""} ${
            showOrders === "sell"
              ? numSellOrders >= 35
                ? "h-[764px]"
                : "h-fit"
              : "h-[382px]"
          } flex flex-col-reverse bg-white/85 dark:bg-default-200/50 rounded-sm w-full overflow-scroll no-scrollbar py-1`}
        >
          {pendingSellOrders.map((pendingOrder) => (
            <li
              key={pendingOrder._id}
              className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer"
            >
              <span className="w-1/3 text-red-500">{pendingOrder.price}</span>
              <span className="w-1/3 text-center">{pendingOrder.amount}</span>
              <span className="w-1/3 text-end text-red-500">
                {calculateAmountPrice(pendingOrder.amount, pendingOrder.price)}
              </span>
            </li>
          ))}
        </ul>
        <div className="h-9 bg-white/85 dark:bg-default-200/50 flex border-y-1">
          <p className="text-[12px] self-center px-1">
            {globalPrice
              ? globalPrice[pairSelected.split("/")[0].toUpperCase()][
                  pairSelected.split("/")[1].toUpperCase()
                ].rate
              : 0}
          </p>
          <span className="self-center flex">
            <HiOutlineArrowNarrowUp className={`text-red-500 hidden`} />
            <HiOutlineArrowNarrowDown className={`text-green-500`} />
            <p className="self-center text-[9px]">1.47</p>
          </span>
        </div>
        <ul
          className={`${showOrders === "sell" ? "hidden" : ""} ${
            showOrders === "buy" ? "h-[764px]" : "h-[382px]"
          } bg-white/85 dark:bg-default-200/50 rounded-sm w-full h-[332px] overflow-scroll no-scrollbar py-1`}
          // style={{ height: heightWindow - 100 + "px" }}
        >
          {pendingBuyOrders.map((pendingOrder) => (
            <li
              key={pendingOrder._id}
              className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer"
            >
              <span className="w-1/3 text-green-500">{pendingOrder.price}</span>
              <span className="w-1/3 text-center">{pendingOrder.amount}</span>
              <span className="w-1/3 text-end text-green-500">
                {calculateAmountPrice(pendingOrder.amount, pendingOrder.price)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
