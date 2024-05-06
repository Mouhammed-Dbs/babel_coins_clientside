import { Button, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosCloseCircleOutline,
  IoMdAdd,
  IoMdClose,
} from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { getNetworksCurrencies } from "../../../public/global_functions/coins";
import MyLoading from "../MyLoading";

export default function Templates() {
  const router = useRouter();
  const { query } = router;
  const [coins, setCoins] = useState([]);
  const [networkSelected, setNetworkSelected] = useState(null);
  const [coinSelected, setCoinSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [data, setData] = useState([
    {
      network: "TRON",
      symbol: "USDT",
      currencyName: "USDT",
      accounts: [
        { name: "Ali", address: "TKHQbDCENpkFqYjkACMnrQDzEonKqRG" },
        { name: "Ahmad", address: "TKHQbDCENpksFqjkACCNVMnrQDzEonKqRG" },
        { name: "Mouhammed", address: "TKHQbDCENpkFqYjkACNVMrQDzEonKqRG" },
        { name: "Monir", address: "TKHQbDCdENpkFqjkACCNVMnrQDzEonKqRG" },
      ],
    },
    {
      network: "POLYGON",
      symbol: "USDT",
      currencyName: "USDT",
      accounts: [
        { name: "Ali", address: "TKHQbDCENpkFqYjekACMnrQDzEonKqRG" },
        { name: "Ahmad", address: "TKHQbDdCENepkFqjkACCNVMnrQDzEonKqRG" },
        { name: "Mouhammed", address: "TKHQbDCeENpkFqYjkACNVMrQDzEonKqRG" },
        { name: "Monir", address: "TKHQbDCENpkFqjkdACCNVMnrQDzEeonKqRG" },
      ],
    },
    {
      network: "TRON",
      symbol: "TRX",
      currencyName: "TRX",
      accounts: [
        { name: "Ali", address: "TKHQbDeCENpkFqYjkACMnrQDzEonKqRG" },
        { name: "Ahmad", address: "TKHQbDCENpkFqjekAfCCNVMnrQDzEonKqRG" },
        { name: "Mouhammed", address: "TKsHQbDCENpkFqYjkACNVMrQDqzEonKqRG" },
        { name: "Monir", address: "TKHQbeDCEfNpkFqjkACCNVMnrQDzEonKqRG" },
      ],
    },
    {
      currencyName: "MATIC",
      network: "POLYGON",
      symbol: "MATIC",
      accounts: [
        { name: "Ali", address: "TKHQbDCEwNpkFqfYjkACMnrQDzEonKqRG" },
        { name: "Ahmad", address: "TKHQbDCENwpkFqjkACCNVMnrQDzEonKqRG" },
        { name: "Mouhammed", address: "TKHQbDCENpkFqYjkACNVMrQt4DzEonKqRG" },
        { name: "Monir", address: "TKHQsbDCENpkFqjkACCNV34MnrQDzEonKqRG" },
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

  const toggleAdd = async () => {
    setShowAddTemplate(!showAddTemplate);
    await router.replace({
      pathname: router.pathname,
      query: { tab: "template", "add-template": !showAddTemplate },
    });
  };

  useEffect(() => {
    if (query["add-template"] === "true") {
      setLoading(true);
      getNetworksCurrencies()
        .then((result) => {
          if (!result.error) {
            setCoins(data);
            toggleAdd();
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <div
      className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white/55 dark:bg-default-100/55 backdrop-blur-md shadow-md`}
    >
      {/* Title */}
      <div className="flex justify-between w-full border-b py-2">
        <h1 className="w-fit flex self-center font-bold">TEMPLATES</h1>
        <Button
          size="sm"
          className="w-24 md:w-28 border-2 border-primary rounded-lg text-primary text-sm backdrop-blur-md p-4"
          onClick={(e) => {
            if (coins.length > 0 || showAddTemplate) {
              toggleAdd();
              console.log("no request");
            } else {
              if (showAddTemplate) {
                toggleAdd();
              }
              setLoading(true);
              getNetworksCurrencies()
                .then((result) => {
                  if (!result.error) {
                    setCoins(result.data);
                    toggleAdd();
                  }
                  setLoading(false);
                })
                .catch((err) => {
                  setLoading(false);
                });
            }
          }}
        >
          {showAddTemplate ? "HIDE" : "ADD"}
          {showAddTemplate ? (
            <IoMdClose className="h-5 w-5 cursor-pointer" size={10} />
          ) : (
            <IoMdAdd className="h-5 w-5 cursor-pointer" size={10} />
          )}
        </Button>
      </div>

      {/* Content */}
      <div>
        {!loading ? (
          showAddTemplate && (
            <div className="m-5 bg-slate-100/55 dark:bg-gray-600/55 mx-5 p-2 rounded-md shadow-md py-4">
              <div className="flex justify-between">
                <h1 className="text-lg w-fit">Add Template</h1>
                <IoIosCloseCircleOutline
                  onClick={() => {
                    setShowAddTemplate(false);
                    router.replace({
                      pathname: router.pathname,
                      query: { tab: "template", "add-template": false },
                    });
                  }}
                  className="h-6 w-6 cursor-pointer"
                  size={10}
                />
              </div>

              <div className="mt-8">
                <Select
                  defaultSelectedKeys={["never_send"]}
                  disallowEmptySelection={true}
                  label="Send verification code:"
                  style={{ backgroundColor: "inherit" }}
                  size="sm"
                  labelPlacement="outside"
                  selectorIcon={
                    <IoIosArrowDown color="var(--bg-primary-color)" />
                  }
                  classNames={{
                    base: "p-[2px] max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                    trigger: "h-7",
                  }}
                >
                  <SelectItem key="never_send" value="never_send">
                    Never send verification code
                  </SelectItem>
                  <SelectItem
                    key="subnet_change_send"
                    value="subnet_change_send"
                  >
                    Send when subnet change
                  </SelectItem>
                  <SelectItem key="ip_address_change" value="ip_address_change">
                    Send when IP-address change
                  </SelectItem>
                  <SelectItem key="always_send" value="always_send">
                    Always send code
                  </SelectItem>
                </Select>
              </div>
            </div>
          )
        ) : (
          <MyLoading />
        )}
        <ul className="mt-10">
          {data.map((item) => (
            <TemplateItem
              key={item.currencyName + "_" + item.network}
              title={item.currencyName}
              network={item.network}
              accounts={item.accounts}
              imgCoin={item.symbol}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function TemplateItem({ title, network, imgCoin, accounts }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="p-1 md:p-3 mt-2 border-b-1 w-full md:w-3/4">
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
    </li>
  );
}
