import { Avatar, Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import MyInput from "@/components/utils/MyInput";
import screenIs from "@/screen";
import MyLoading from "@/components/MyLoading";
import {
  getAddressesByCoinName,
  getBalanceCoins,
  getMinimumDepositLimits,
} from "../../../public/global_functions/coins";
import { CopyButton } from "@/components/utils/CopyButton";

export default function Add(props) {
  const router = useRouter();
  const { query } = router;
  const [mounted, setMount] = useState(false);
  const [coins, setCoins] = useState([]);
  const [coinSelected, setCoinSelected] = useState(null);
  const [addressesByCoinName, setAddressesByCoinName] = useState([]);
  const [minimumLimitsByCoinName, setMinimumLimitsByCoinName] = useState([]);
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
    setAddressesLoading(true);
    getBalanceCoins()
      .then((result) => {
        if (!result.error) {
          setCoins(result.data);
          if (query["curr"]) {
            if (
              result.data.map((c) => c.currencyName).includes(query["curr"])
            ) {
              setCoinSelected(query["curr"]);
              getAddressesByCoinName(query["curr"])
                .then(async (res) => {
                  if (!res.error) {
                    setAddressesByCoinName(res.data);
                    getMinimumDepositLimits(query["curr"])
                      .then((result) => {
                        if (!result.error) {
                          result.data.map((minimum) => {
                            setMinimumLimitsByCoinName(minimum);
                          });
                          setAddressesLoading(false);
                        }
                      })
                      .catch((error) => {
                        setAddressesLoading(false);
                      });
                  } else {
                    setAddressesLoading(false);
                  }
                })
                .catch((err) => {
                  setAddressesLoading(false);
                });
            } else {
              router.replace({
                pathname: router.pathname,
                query: { curr: "USDT" },
              });
            }
          } else {
            setAddressesLoading(false);
          }
        }
        setPageLoading(false);
      })
      .catch((err) => {
        setPageLoading(false);
      });
  }, [query, router]);

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
        className={`text-black dark:text-white bg-slate-200/55 dark:bg-default-100/55 backdrop-blur-md mt-24`}
      />
    );

  return (
    <div className="h-screen container m-auto no-scrollbar overflow-y-scroll pb-[150px]">
      <div className="w-full md:w-[520px] lg:w-[790px] m-auto mt-4 pb-3 md:m-auto">
        <div className="w-fit pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50/15 dark:bg-default-50/15 backdrop-blur-xs">
            ADD
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]"></div>
        </div>
      </div>
      <div className="p-4 py-10 md:px-8 mt-6 md:m-auto md:mt-10 w-11/12 md:w-[520px] lg:w-[790px] md:text-center bg-white/55 dark:bg-default-100/55 rounded-lg shadow-md backdrop-blur-md">
        <div className="md:flex w-full m-auto gap-4 items-center">
          <label className="text-right text-sm md:text-base w-36">
            Choose account
          </label>
          <Select
            disallowEmptySelection={true}
            isDisabled={addressesLoading}
            selectedKeys={coinSelected ? [coinSelected] : []}
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
              base: "p-[2px] max-w-xs peer w-full self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
              trigger: "h-6",
            }}
            renderValue={(items) => {
              return items.map((item) => (
                <div
                  key={item.data.currencyName}
                  className="flex items-center gap-2"
                >
                  <Avatar
                    ImgComponent="img"
                    alt={item.data.currencyName}
                    className="flex-shrink-0 h-6 w-6"
                    size="sm"
                    src={`/images/coins/${item.data.symbol}.png`}
                  />
                  <div className="flex flex-col">
                    <span>{item.data.validDepositeBalance.toFixed(2)}</span>
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
                    ImgComponent="img"
                    alt={item["currencyName"]}
                    className="flex-shrink-0"
                    size="sm"
                    src={`/images/coins/${item["symbol"]}.png`}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">
                      {item["validDepositeBalance"].toFixed(2)}
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
              base: "p-[2px] max-w-xs peer w-full self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
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
            <div key={item.network}>
              <div className="lg:flex m-auto w-full md:gap-4 gap-2 items-center mt-4">
                <label className="block text-left lg:text-right text-sm md:text-base w-full lg:w-36">
                  {item.network}:
                </label>
                <p className="flex item-center text-sky-800 dark:text-sky-600 text-xs md:text-sm self-end mb-[2px] border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md p-2 w-fit break-all">
                  {item.address}
                  <CopyButton
                    className="self-center ml-2 text-primary hover:text-opacity-70"
                    copy={item.address}
                  />
                </p>
              </div>
              <p className="text-xs w-fit text-left lg:ml-40 lg:mt-[2px]">
                Minimum deposit limit for {minimumLimitsByCoinName.currencyName}
                {minimumLimitsByCoinName.currencyName !== "USDT"
                  ? " on " + minimumLimitsByCoinName.network + " "
                  : " "}
                is {" " + minimumLimitsByCoinName.amount}
              </p>
            </div>
          ))
        ) : (
          <MyLoading />
        )}

        <div className="hidden w-fit m-auto md:m-0 md:ml-40">
          <Button className="bg-orange text-white rounded-full mt-4 md:px-10 w-12">
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
}
