import { Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function QueueOrders({
  pairSelected,
  pendingBuyOrders,
  pendingSellOrders,
  getSpecificPair,
}) {
  const [showOrders, setShowOrdes] = useState("all");
  const [numSellOrders, setNumSellOrders] = useState(35);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [priceForPair, setPriceForPair] = useState();

  useEffect(() => {
    setPriceForPair(
      getSpecificPair(
        pairSelected.firstCurrencyName,
        pairSelected.secondCurrencyName
      )
        ? getSpecificPair(
            pairSelected.firstCurrencyName,
            pairSelected.secondCurrencyName
          )
        : 0
    );
  }, [pairSelected, getSpecificPair]);

  const calculateAmountPrice = (amount, price) => {
    return Math.round(amount * price * 10000) / 10000;
  };

  const showTooltip = (order, type, event) => {
    const { clientX, clientY } = event;
    let content = "";

    if (type === "sell") {
      content = `
        I GET: ${order.restAmount} ${pairSelected?.firstCurrencyName} <br />
        AVG PRICE: ${order.price} <br />
        I GIVE: ${calculateAmountPrice(order.restAmount, order.price)} ${
        pairSelected?.secondCurrencyName
      }
      `;
    } else if (type === "buy") {
      content = `
        I GIVE: ${order.amount} ${pairSelected?.firstCurrencyName}<br />
        AVG PRICE: ${order.price} USD <br />
        I GET: ${calculateAmountPrice(order.restAmount, order.price)} ${
        pairSelected?.secondCurrencyName
      }
      `;
    }

    setTooltipContent(content);
    setTooltipPosition({ top: clientY + 10, left: clientX + 10 });
  };

  const hideTooltip = () => {
    setTooltipContent("");
  };

  return (
    <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-full shadow-md">
      {/* Header */}
      <div className="text-sm flex justify-between p-2">
        <h1 className="font-bold self-end">
          {pairSelected.firstCurrencyName}/{pairSelected.secondCurrencyName}
        </h1>
        <span className="text-xs self-end text-gray-500">{priceForPair}</span>
        <span className="text-xs self-end text-green-500">+5.1%</span>
      </div>
      <Divider />
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
      <div className="p-2 h-full">
        <div className="flex justify-between text-[11px] gap-2 mb-1">
          <span>PRICE({pairSelected.secondCurrencyName})</span>
          <span>AMOUNT({pairSelected.firstCurrencyName})</span>
          <span>VALUE({pairSelected.secondCurrencyName})</span>
        </div>
        <ul
          className={`${showOrders === "buy" ? "hidden" : ""} ${
            showOrders === "sell"
              ? "h-[400px] md:h-[814px]"
              : "h-[200px] md:h-[407px]"
          } flex flex-col-reverse bg-white/85 dark:bg-default-200/50 rounded-sm w-full overflow-scroll no-scrollbar py-1 relative`}
        >
          {pendingSellOrders.map((pendingOrder) => (
            <li
              key={pendingOrder._id}
              className="relative flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer group"
              onMouseEnter={(e) => showTooltip(pendingOrder, "sell", e)}
              onMouseLeave={hideTooltip}
            >
              <span className="w-1/3 text-red-500">{pendingOrder.price}</span>
              <span className="w-1/3 text-center">
                {pendingOrder.restAmount}
              </span>
              <span className="w-1/3 text-end text-red-500">
                {calculateAmountPrice(
                  pendingOrder.restAmount,
                  pendingOrder.price
                )}
              </span>
            </li>
          ))}
        </ul>
        <div className="h-9 bg-white/85 dark:bg-default-200/50 flex border-y-1">
          <p className="text-[12px] self-center px-1">{priceForPair}</p>
          <span className="self-center flex">
            <HiOutlineArrowNarrowUp className={`text-red-500 hidden`} />
            <HiOutlineArrowNarrowDown className={`text-green-500`} />
            <p className="self-center text-[9px]">1.47</p>
          </span>
        </div>
        <ul
          className={`${showOrders === "sell" ? "hidden" : ""} ${
            showOrders === "buy"
              ? "h-[400px] md:h-[814px]"
              : "h-[200px] md:h-[407px]"
          } bg-white/85 dark:bg-default-200/50 rounded-sm w-full overflow-scroll no-scrollbar py-1 relative`}
        >
          {pendingBuyOrders.map((pendingOrder) => (
            <li
              key={pendingOrder._id}
              className="relative flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer group"
              onMouseEnter={(e) => showTooltip(pendingOrder, "buy", e)}
              onMouseLeave={hideTooltip}
            >
              <span className="w-1/3 text-green-500">{pendingOrder.price}</span>
              <span className="w-1/3 text-center">
                {pendingOrder.restAmount}
              </span>
              <span className="w-1/3 text-end text-green-500">
                {calculateAmountPrice(
                  pendingOrder.restAmount,
                  pendingOrder.price
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* Render Tooltip */}
      {tooltipContent &&
        ReactDOM.createPortal(
          <div
            className="fixed rounded-md px-4 py-2 bg-indigo-100 text-indigo-800 text-sm z-50"
            style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
            dangerouslySetInnerHTML={{ __html: tooltipContent }} // Allow HTML in tooltip
          ></div>,
          document.body
        )}
    </div>
  );
}
