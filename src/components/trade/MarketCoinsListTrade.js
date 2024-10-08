import { Button, Divider } from "@nextui-org/react";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp, FaStar } from "react-icons/fa6";
import SortUpDown from "../utils/SortUpDown";
import { useState } from "react";

export default function MarketCoinsListTrade({ onItemClick, getSpecificPair }) {
  const [sortByPair, setSortByPair] = useState(0);
  const [sortByLastPrice, setSortByLastPrice] = useState(0);
  const [sortByChange, setSortByChange] = useState(0);

  return (
    <div className="px-2 h-full">
      <div className="bg-white/85 dark:bg-default-200/50 rounded-sm w-full h-[290px]">
        {/* <div className="flex flex-wrap gap-2 text-[9px] p-1 cursor-pointer">
          <span className="text-primary font-bold">USDT</span>
          <span>MATIC</span>
          <span>ETH</span>
        </div>
        <Divider /> */}
        <div className="flex gap-3 text-[9px] p-1 font-bold text-gray-600 dark:text-gray-400">
          <span
            className="flex min-w-24 cursor-pointer select-none"
            onClick={() => {
              setSortByPair((sortByPair + 1) % 3);
            }}
          >
            PAIR <SortUpDown sort={sortByPair} />
          </span>
          <span
            className="flex cursor-pointer select-none"
            onClick={() => {
              setSortByLastPrice((sortByLastPrice + 1) % 3);
            }}
          >
            LAST PRICE
            <SortUpDown sort={sortByLastPrice} />
          </span>
          <span
            className="flex justify-end ml-6 cursor-pointer select-none"
            onClick={() => {
              setSortByChange((sortByChange + 1) % 3);
            }}
          >
            CHANGE
            <SortUpDown sort={sortByChange} />
          </span>
        </div>
        <Divider />
        <ul className="h-[180px] overflow-scroll no-scrollbar">
          <ItemPair
            firstCurrencyName="ETHER"
            secondCurrencyName="USDT"
            change={-20}
            lastPrice={
              getSpecificPair("ETHER", "USDT")
                ? getSpecificPair("ETHER", "USDT")
                : ""
            }
            onClick={onItemClick}
          />
          <ItemPair
            firstCurrencyName="BNB"
            secondCurrencyName="USDT"
            change={-20}
            lastPrice={
              getSpecificPair("BNB", "USDT")
                ? getSpecificPair("BNB", "USDT")
                : ""
            }
            onClick={onItemClick}
          />
          <ItemPair
            firstCurrencyName="TRX"
            secondCurrencyName="USDT"
            change={-20}
            lastPrice={
              getSpecificPair("TRX", "USDT")
                ? getSpecificPair("TRX", "USDT")
                : ""
            }
            onClick={onItemClick}
          />
          <ItemPair
            firstCurrencyName="MATIC"
            secondCurrencyName="USDT"
            change={-20}
            lastPrice={
              getSpecificPair("MATIC", "USDT")
                ? getSpecificPair("MATIC", "USDT")
                : ""
            }
            onClick={onItemClick}
          />
        </ul>
      </div>
    </div>
  );
}

function ItemPair({
  firstCurrencyName,
  secondCurrencyName,
  lastPrice,
  change,
  onClick,
}) {
  return (
    <li
      className="flex gap-3 text-[10px] p-1 cursor-pointer hover:bg-slate-200"
      onClick={() => onClick(firstCurrencyName, secondCurrencyName)}
    >
      <span className="flex min-w-24">
        <FaStar className="text-gray-600 self-center mx-1" />
        <p className="self-center">
          {firstCurrencyName} /{secondCurrencyName}
        </p>
      </span>
      <p className="min-w-24 pl-1">{lastPrice}</p>
      <p
        className={`w-full text-end pr-3 ${
          change < 0 ? "text-red-500" : "text-green-500"
        }`}
      >
        {change < 0 ? change : "+" + change}%
      </p>
    </li>
  );
}
