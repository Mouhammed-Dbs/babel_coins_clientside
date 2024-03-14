import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export default function Templates() {
  const [data, setData] = useState([
    {
      title: "Tether",
      account: "Tron",
      symbol: "USDT",
      addresses: [
        "TKHQbDCENpkFqYjkACMnrQDzEonKqRG",
        "TKHQbDCENpkFqjkACCNVMnrQDzEonKqRG",
        "TKHQbDCENpkFqYjkACNVMrQDzEonKqRG",
        "TKHQbDCENpkFqjkACCNVMnrQDzEonKqRG",
      ],
    },
    {
      title: "TRX",
      account: "Tron",
      symbol: "TRX",
      addresses: [
        "TKHQbDCENpkFqYjkACMnrQDzEonKqRG",
        "TKHQbDCENpkFqjkACCNVMnrQDzEonKqRG",
      ],
    },
    {
      title: "MATIC",
      account: "Polygon",
      symbol: "MATIC",
      addresses: [
        "TKHQbDCENpkFqYjkACMnrQDzEonKqRG",
        "TKHQbDCENpkFqjkACCNVMnrQDzEonKqRG",
        "TKHQbDCENpkFqYjkACMnrQDzEonKqRG",
        "TKHQbDCENpkFqjkACCNVMnrQDzEonKqRG",
        "TKHQbDCENpkFqYjkACNVMrQDzEonKqRG",
      ],
    },
  ]);
  return (
    <div
      className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white dark:bg-default-100 shadow-md`}
    >
      {/* Title */}
      <div className="w-full border-b">
        <h1 className="text-sm mb-3 font-bold">TEMPLATES</h1>
      </div>

      {/* Content */}
      <div className="mt-10">
        {data.map((item) => (
          <TemplateItem
            key={item.title + "_" + item.account}
            title={item.title}
            account={item.account}
            addresses={item.addresses}
            img={item.symbol}
          />
        ))}
      </div>

      <Button
        onClick={() => {}}
        size="sm"
        className="bg-orange text-sm rounded-full mt-10 p-4 text-white"
      >
        MODIFY
      </Button>
    </div>
  );
}

function TemplateItem({ title, account, img, addresses }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-1 md:p-3 border-b-1 w-full md:w-3/4">
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center">
          <Image
            className="rounded-full h-9 w-9"
            src={`/images/coins/${img}.png`}
            alt=""
            height={30}
            width={30}
          />
          <h1 className="text-lg ml-1 md:ml-3">
            {title + " (" + addresses.length + ")"}
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
          {addresses.map((address) => (
            <li
              key={address}
              className="flex gap-1 items-center border-1 rounded-md w-fit p-2 mt-2"
            >
              <label className="text-xs md:text-base">
                {title + "(" + account + "):"}
              </label>
              <p className="text-xs md:text-base break-all">{address}</p>
              <IoCloseSharp
                color="red"
                className="rounded-full hover:bg-slate-400 p-1 w-6 h-6"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
