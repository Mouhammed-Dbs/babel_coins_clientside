import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export default function Templates() {
  const [data, setData] = useState([
    {
      network: "TRON",
      symbol: "USDT",
      currencyName: "USDT",
      accounts: [
        { name: "Ali", address: "TKHQbDCENpkFqYjkACMnrQDzEonKqRG" },
        { name: "Ahmad", address: "TKHQbDCENpkFqjkACCNVMnrQDzEonKqRG" },
        { name: "Mouhammed", address: "TKHQbDCENpkFqYjkACNVMrQDzEonKqRG" },
        { name: "Monir", address: "TKHQbDCENpkFqjkACCNVMnrQDzEonKqRG" },
      ],
    },
    {
      network: "POLYGON",
      symbol: "USDT",
      currencyName: "USDT",
      accounts: [
        { name: "Ali", address: "TKHQbDCENpkFqYjekACMnrQDzEonKqRG" },
        { name: "Ahmad", address: "TKHQbDCENepkFqjkACCNVMnrQDzEonKqRG" },
        { name: "Mouhammed", address: "TKHQbDCeENpkFqYjkACNVMrQDzEonKqRG" },
        { name: "Monir", address: "TKHQbDCENpkFqjkACCNVMnrQDzEeonKqRG" },
      ],
    },
    {
      network: "Tron",
      symbol: "TRX",
      currencyName: "TRX",
      accounts: [
        { name: "Ali", address: "TKHQbDeCENpkFqYjkACMnrQDzEonKqRG" },
        { name: "Ahmad", address: "TKHQbDCENpkFqjekACCNVMnrQDzEonKqRG" },
        { name: "Mouhammed", address: "TKHQbDCENpkFqYjkACNVMrQDqzEonKqRG" },
        { name: "Monir", address: "TKHQbeDCENpkFqjkACCNVMnrQDzEonKqRG" },
      ],
    },
    {
      currencyName: "MATIC",
      network: "POLYGON",
      symbol: "MATIC",
      accounts: [
        { name: "Ali", address: "TKHQbDCEwNpkFqYjkACMnrQDzEonKqRG" },
        { name: "Ahmad", address: "TKHQbDCENwpkFqjkACCNVMnrQDzEonKqRG" },
        { name: "Mouhammed", address: "TKHQbDCENpkFqYjkACNVMrQt4DzEonKqRG" },
        { name: "Monir", address: "TKHQbDCENpkFqjkACCNV34MnrQDzEonKqRG" },
      ],
    },
    {
      currencyName: "BABELCOINS",
      network: "Account",
      symbol: "",
      accounts: [
        { name: "Alaa", address: "B1" },
        { name: "Alaa", address: "B2" },
        { name: "Alaa", address: "B3" },
        { name: "Alaa", address: "B4" },
        { name: "Alaa", address: "B5" },
      ],
    },
  ]);
  return (
    <div
      className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white/55 dark:bg-default-100/55 backdrop-blur-md shadow-md`}
    >
      {/* Title */}
      <div className="w-full border-b">
        <h1 className="text-sm mb-3 font-bold">TEMPLATES</h1>
      </div>

      {/* Content */}
      <div className="mt-10">
        {data.map((item) => (
          <TemplateItem
            key={item.currencyName + "_" + item.network}
            title={item.currencyName}
            network={item.network}
            accounts={item.accounts}
            imgCoin={item.symbol}
          />
        ))}
      </div>
    </div>
  );
}

function TemplateItem({ title, network, imgCoin, accounts }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-1 md:p-3 mt-2 border-b-1 w-full md:w-3/4">
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center">
          <div className="relative">
            <Image
              className={`h-10 w-10 ${title === "BABELCOINS" ? "p-[2px]" : ""}`}
              src={
                title !== "BABELCOINS"
                  ? `/images/coins/${imgCoin}.png`
                  : "/images/logo/png/babelcoins-logo-64.png"
              }
              alt=""
              height={30}
              width={30}
            />
            {title !== "BABELCOINS" && (
              <Image
                className="absolute rounded-full h-4 w-4 bottom-0 right-0 border-1"
                src={`/images/networks/${network}.png`}
                alt=""
                height={30}
                width={30}
              />
            )}
          </div>

          <h1 className="text-lg ml-3">
            {title + " (" + accounts.length + ")"}
          </h1>
        </div>
        {open ? (
          <IoIosArrowUp color="var(--bg-primary-color)" />
        ) : (
          <IoIosArrowDown color="var(--bg-primary-color)" />
        )}
      </div>
      {open && (
        <ul className="md:ml-2 mt-4">
          {accounts.map((account) => (
            <li
              key={account.address}
              className="border-1 rounded-md w-fit p-2 mt-2"
            >
              <div className="flex gap-1 items-center mb-1">
                <span className="font-bold">Name:</span>
                <span>{account.name}</span>
              </div>

              <div className="flex gap-1 items-center">
                <label className="text-xs md:text-base font-bold">
                  {network + ":"}
                </label>
                <p className="text-xs md:text-base break-all">
                  {account.address}
                </p>
                <IoCloseSharp
                  color="red"
                  className="rounded-full hover:bg-slate-400 p-1 w-6 h-6"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
