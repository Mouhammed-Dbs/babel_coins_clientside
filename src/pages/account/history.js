import Image from "next/image";
import { useState } from "react";
import { CiLock, CiUnlock } from "react-icons/ci";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { RiErrorWarningFill } from "react-icons/ri";

export default function History() {
  const [items, setItems] = useState([
    "TRANSACTIONS",
    "USD",
    "RUB",
    "EUR",
    "BTC",
    "ETH",
    "BCH",
    "LTC",
    "DASH",
    "USDT",
    "XRP",
    "DOGE",
    "TRX",
    "BNB",
    "MATIC",
    "DAI",
    "DOT",
    "USDC",
    "LINK",
    "SAND",
    "MANA",
    "AAVE",
    "SUSHI",
    "CAKE",
    "1INCH",
    "GALA",
    "LDO",
    "GMT",
    "UNI",
    "CRV",
    "BAL",
    "GRT",
    "APE",
  ]);
  const [itemSelected, setItemSelected] = useState("TRANSACTIONS");
  return (
    <div className="h-screen container m-auto no-scrollbar overflow-y-scroll pb-[150px]">
      <div className="w-full md:w-[720px] lg:w-[950px] m-auto mt-4 pb-3">
        <div className="w-fit ml-4 md:ml-0 bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50 dark:bg-default-50">
            HISTORY
          </h1>
        </div>
      </div>
      <div className="pb-4 ml-4 mt-6 md:m-auto md:mt-10 w-11/12 md:w-[720px] lg:w-[950px] md:text-center backdrop-blur-xs bg-white dark:bg-default-100 rounded-lg shadow-md">
        <ul className="flex flex-wrap w-full bg-gray-200 dark:bg-gray-600 rounded-t-lg py-1">
          {items.map((item) => (
            <li
              key={item}
              className={`p-2 px-2 mx-2 text-gray-500 cursor-pointer ${
                itemSelected === item
                  ? "bg-white dark:text-primary dark:bg-gray-400 rounded-lg text-primary px-3"
                  : "dark:text-gray-300"
              }`}
              onClick={() => {
                setItemSelected(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mx-1 md:mx-4">
          <div className="flex md:px-2 py-2 mt-3 font-bold text-gray-700 dark:text-gray-300">
            <h3 className="w-3/12 text-xs md:text-sm text-start pl-2 md:pl-4">
              DATE
            </h3>
            <h3 className="w-2/12 text-xs md:text-sm">CREDIT</h3>
            <h3 className="w-2/12 text-xs md:text-sm">DEBIT</h3>
            <h3 className="w-1/12 text-xs md:text-sm">PS</h3>
            <h3 className="w-3/12 text-xs md:text-sm">ID</h3>
            <h3 className="w-1/12 text-xs md:text-sm">STATUS</h3>
          </div>
          <ul className="w-full">
            <ItemTransaction
              date="16 Jan 2024 23:52"
              credit="--"
              debit="-5 TRX"
              ps="TRX"
              id="2009936051"
              status={true}
            />
            <ItemTransaction
              date="16 Jan 2024 23:52"
              credit="+15 USDT"
              debit="--"
              ps="USDT"
              id="2009936051"
              status={false}
            />
          </ul>
          <div className="w-full rounded-full bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 my-3 flex place-content-center">
            <PiDotsThreeOutlineFill className="text-gray-400 h-6 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
function ItemTransaction({ date, credit, debit, ps, id, status }) {
  return (
    <li className="flex p-3 border-b-2 py-3 font-bold">
      <div className="flex w-3/12">
        <p className="w-full text-xs opacity-70 self-center md:pl-4 text-left">
          {date}
        </p>
      </div>
      <div className="flex w-2/12">
        <p className="w-full text-xs opacity-70 self-center px-1 md:px-4 text-green-600">
          {credit}
        </p>
      </div>
      <div className="flex w-2/12">
        <p className="w-full text-xs opacity-70 self-center px-1 md:px-4 text-red-600">
          {debit}
        </p>
      </div>
      <div className="flex w-1/12 place-content-center">
        <Image
          alt=""
          width={20}
          height={20}
          src={`/images/coins/${ps}.png`}
          className="w-5 h-5 md:h-8 md:w-8"
        />
      </div>
      <div className="flex w-3/12">
        <p className="w-full text-xs opacity-70 self-center px-1 md:px-4">
          {id}
        </p>
      </div>
      <div className="flex w-1/12 overflow-hidden place-content-center">
        {status ? (
          <IoCheckmarkDoneCircle className="w-5 h-5 md:h-8 md:w-8 self-center text-green-600" />
        ) : (
          <RiErrorWarningFill className="w-5 h-5 md:h-8 md:w-8 self-center text-red-600" />
        )}
      </div>
    </li>
  );
}
