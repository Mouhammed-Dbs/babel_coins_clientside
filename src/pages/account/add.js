import { Avatar, Button, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import MyInput from "@/components/utils/MyInput";
import screenIs from "@/screen";
import { MdOutlineContentCopy } from "react-icons/md";
import MyLoading from "@/components/MyLoading";
import {
  getAddressesByCoinName,
  getBalanceCoins,
} from "../../../public/global_functions/coins";
import { data } from "autoprefixer";

export default function Add(props) {
  const router = useRouter();
  const { query } = router;
  const [mounted, setMount] = useState(false);
  const [coins, setCoins] = useState([]);
  const [addressesByCoinName, setAddressesByCoinName] = useState([]);
  const [accounts, setAccounts] = useState([
    { type: "crypto", name: "BTC", balance: "200" },
    { type: "crypto", name: "ETH", balance: "50" },
  ]);
  const [fiatAccounts, setFiateAccounts] = useState(["USD", "EUR", "RUB"]);
  const [screenSize, setScreenSize] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [addressesLoading, setAddressesLoading] = useState(false);

  useEffect(() => {
    setScreenSize(screenIs("md"));
    const handleResize = () => {
      setScreenSize(screenIs("md"));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  useEffect(() => {
    setMount(true);

    getBalanceCoins()
      .then((result) => {
        if (!result.error) {
          setCoins(result.data);
          if (query["curr"]) {
            setAddressesLoading(true);
            getAddressesByCoinName(query["curr"])
              .then((res) => {
                if (!res.error) {
                  setAddressesByCoinName(res.data);
                }
                setAddressesLoading(false);
              })
              .catch((err) => {
                setAddressesLoading(false);
              });
          }
        }
        setPageLoading(false);
      })
      .catch((err) => {
        setPageLoading(false);
      });
  }, [query]);

  if (!mounted)
    return (
      <MyLoading
        msg="Loading.."
        color="primary"
        className={`text-black dark:text-white mt-24`}
      />
    );
  if (pageLoading)
    return (
      <MyLoading
        msg="Loading.."
        color="primary"
        className={`text-black dark:text-white mt-24`}
      />
    );

  return (
    <div className="h-screen container m-auto no-scrollbar overflow-y-scroll pb-[150px]">
      <div className="w-full md:w-[520px] lg:w-[790px] m-auto mt-4 pb-3">
        <div className="w-fit ml-4 md:ml-0 bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50 dark:bg-default-50">
            ADD
          </h1>
        </div>
      </div>
      <div className="p-4 py-10 md:px-8 ml-4 mt-6 md:m-auto md:mt-10 w-11/12 md:w-[520px] lg:w-[790px] md:text-center backdrop-blur-xs bg-white dark:bg-default-100 rounded-lg shadow-md">
        <div className="md:flex w-full m-auto gap-4 items-center">
          <label className="text-right text-sm md:text-base w-36">
            Choose account
          </label>
          <Select
            selectedKeys={[query["curr"]]}
            onChange={async (e) => {
              await router.replace({
                pathname: router.pathname,
                query: { curr: e.target.value },
              });
            }}
            aria-label="none"
            style={{ backgroundColor: "inherit" }}
            size="sm"
            items={coins}
            labelPlacement="outside"
            placeholder="CHOOSE ACCOUNT"
            selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
            classNames={{
              base: "p-[2px] max-w-xs peer w-64 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
              trigger: "h-6",
            }}
            renderValue={(items) => {
              return items.map((item) => (
                <div
                  key={item.data.network + "_" + item.data.symbol}
                  className="flex items-center gap-2"
                >
                  <Avatar
                    alt={item.data.currencyName}
                    className="flex-shrink-0 h-6 w-6"
                    size="sm"
                    src={`/images/coins/${item.data.symbol}.png`}
                  />
                  <div className="flex flex-col">
                    <span>{item.data.validDepositeBalance}</span>
                    <span className="text-default-500 text-tiny">
                      {item.data.currencyName}
                    </span>
                  </div>
                </div>
              ));
            }}
          >
            {(item) => (
              <SelectItem key={item["symbol"]} textValue={item["currencyName"]}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={item["currencyName"]}
                    className="flex-shrink-0"
                    size="sm"
                    src={`/images/coins/${item["symbol"]}.png`}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">
                      {item["validDepositeBalance"]}
                    </span>
                    <span className="text-tiny text-default-400">
                      {item["currencyName"]}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </div>
        {/* md:flex */}
        <div className="hidden md:hidden w-full m-auto gap-4 items-center mt-3">
          <label className="text-right text-sm md:text-base w-36">
            Choose system
          </label>
          <Select
            aria-label="none"
            style={{ backgroundColor: "inherit" }}
            size="sm"
            items={coins}
            labelPlacement="outside"
            placeholder="CHOOSE SYSTEM"
            selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
            classNames={{
              base: "p-[2px] max-w-xs peer w-64 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
              trigger: "h-7",
            }}
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <Avatar
                    alt={item.data.currencyName}
                    className="flex-shrink-0 h-6 w-6"
                    size="sm"
                    src={`/images/coins/${item.key}.png`}
                  />
                  <div className="flex flex-col">
                    <span>{item.data.balance}</span>
                    <span className="text-default-500 text-tiny">
                      {item.data.currencyName}
                    </span>
                  </div>
                </div>
              ));
            }}
          >
            {(item) => (
              <SelectItem
                key={item["currencyName"]}
                textValue={item["currencyName"]}
              >
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={item["currencyName"]}
                    className="flex-shrink-0"
                    size="sm"
                    src={`/images/coins/${item["currencyName"]}.png`}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{item["balance"]}</span>
                    <span className="text-tiny text-default-400">
                      {item["currencyName"]}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </div>
        {/* Amount hidden->flex */}
        <div className="hidden m-auto w-full md:gap-4 gap-2 items-center mt-3">
          <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36 mt-3">
            Amount
          </label>
          <MyInput
            color="border-gray-500"
            className="w-full md:w-48 border-black mb-3"
            item={{
              label: screenSize ? undefined : "Amount",
              name: "amount",
              type: "number",
              placeholder: "$0",
            }}
          />
          <p className="w-24 min-w-20 text-center pt-[3px] mt-3 h-[34px] bg-inherit border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md">
            USD
          </p>
        </div>
        {/* Total hidden->flex */}
        <div className="hidden m-auto w-full md:gap-4 gap-2 items-center">
          <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36 mt-3">
            Total
          </label>
          <MyInput
            color="border-gray-500"
            className="w-full md:w-48 border-black mb-3"
            item={{
              label: screenSize ? undefined : "Total",
              name: "amount",
              type: "number",
              placeholder: "$0",
            }}
          />
          <Select
            aria-label="none"
            classNames={{
              base: "max-w-xs min-w-20 peer mt-3 w-24 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
              trigger: "h-8",
            }}
            size="sm"
            style={{ backgroundColor: "inherit" }}
            labelPlacement="outside-left"
            selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
            placeholder="USD"
          >
            {fiatAccounts.map((account) => (
              <SelectItem key={account} value={account}>
                {account}
              </SelectItem>
            ))}
          </Select>
        </div>
        {/* Address */}
        {!addressesLoading ? (
          addressesByCoinName.map((item) => (
            <div
              key={item.network}
              className="lg:flex m-auto w-full md:gap-4 gap-2 items-center mt-4"
            >
              <label className="block text-left lg:text-right text-sm md:text-base w-full lg:w-36">
                {item.network} address:
              </label>
              <p className="flex item-center text-sky-800 dark:text-sky-600 text-xs md:text-sm self-end mb-[2px] border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md p-2 w-fit break-all">
                {item.address}
                <MdOutlineContentCopy
                  size={18}
                  className="self-center ml-2 text-primary hover:text-opacity-70"
                />
              </p>
            </div>
          ))
        ) : (
          <MyLoading />
        )}

        <div className="w-fit m-auto md:m-0 md:ml-40">
          <Button className="bg-orange text-white rounded-full mt-4 md:px-10 w-12">
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
}
