import { Button, Divider, Tab, Tabs, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import screenIs from "@/screen";
import MyLoading from "@/components/MyLoading";
import LimitTrade from "@/components/trade/LimitTrade";
import MarketTrade from "@/components/trade/MarketTrade";
import TriggerTrade from "@/components/trade/TriggerTrade";
import TradeChat from "@/components/trade/TradeChat";
import MarketCoinsListTrade from "@/components/trade/MarketCoinsListTrade";
import { FaBitcoin, FaDollarSign } from "react-icons/fa6";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
export default function Trade() {
  const [mounted, setMount] = useState(false);
  const [heightWindow, setHeightWindow] = useState("100%");
  const [screenSize, setScreenSize] = useState(false);
  const [tabForm, setTabForm] = useState("limit_tab");
  const [tabChatAndCoinsList, setTabChatAndCoinsList] =
    useState("coinslist_tab");
  const [showOrders, setShowOrdes] = useState("all");
  const [numSellOrders, setNumSellOrders] = useState(35);
  const [pairSelected, setPairSelected] = useState("ETH/USDT");
  useEffect(() => {
    setMount(true);
    setScreenSize(screenIs("md"));
    setHeightWindow(window.innerHeight);
    const handleResize = () => {
      setScreenSize(screenIs("md"));
      setHeightWindow(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);
  if (!mounted)
    return (
      <MyLoading
        msg="Loading.."
        color="primary"
        className={`text-black dark:text-white mt-24`}
      />
    );
  return (
    <div className="flex w-screen h-screen pt-3 pr-24 gap-3 overflow-y-scroll">
      {/* First Col */}
      <div className="w-1/5 min-w-max h-fit">
        <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-full shadow-md">
          {/* Header */}
          <div className="text-sm flex justify-between p-2">
            <h1 className="font-bold self-end">{pairSelected}</h1>
            <span className="text-xs self-end text-gray-500">68312.12</span>
            <span className="text-xs self-end text-green-500">+5.1%</span>
          </div>
          <Divider />
          {/* Tabs */}
          <div className="flex bg-white/85 dark:bg-default-200/50 rounded-md w-[93%] m-auto mt-1">
            <button
              className={`w-1/3 p-1 border-1 rounded-l-md hover:border-sky-500 ${
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
            </button>
            <button
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
            </button>
            <button
              className={`w-1/3 p-1 border-1 rounded-r-md hover:border-sky-500 ${
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
            </button>
          </div>
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
                    ? "h-[704px]"
                    : "h-fit"
                  : "h-[352px]"
              } flex flex-col-reverse bg-white/85 dark:bg-default-200/50 rounded-sm w-full overflow-scroll no-scrollbar py-1`}
            >
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>

              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 hover:border-t-2 border-dotted border-black dark:border-gray-300 cursor-pointer">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
            </ul>
            <div className="h-9 bg-white/85 dark:bg-default-200/50 flex border-y-1">
              <p className="text-[12px] self-center px-1">64,759.90</p>
              <span className="self-center flex">
                <HiOutlineArrowNarrowUp className={`text-red-500 hidden`} />
                <HiOutlineArrowNarrowDown className={`text-green-500`} />
                <p className="self-center text-[9px]">1.47</p>
              </span>
            </div>
            <ul
              className={`${showOrders === "sell" ? "hidden" : ""} ${
                showOrders === "buy" ? "h-[704px]" : "h-[352px]"
              } bg-white/85 dark:bg-default-200/50 rounded-sm w-full h-[332px] overflow-scroll no-scrollbar py-1`}
              // style={{ height: heightWindow - 100 + "px" }}
            >
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1 border-black dark:border-gray-300 hover:border-b-2 border-dotted cursor-pointer">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Second Col */}
      <div
        className="w-3/5 md:min-w-[360px] lg:min-w-[400px]"
        style={{ height: heightWindow + 300 + "px" }}
      >
        {/* Price Graph */}
        <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-72 shadow-md">
          <div className="text-sm flex gap-4 p-2">
            <h1 className="font-bold self-end">Price Graph</h1>
          </div>
          <Divider />
          <div className="p-2"></div>
        </div>
        {/* Trade Form */}
        <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-[540px] shadow-md mt-5 p-2">
          <div className="relative w-full h-[500px]">
            <Tabs
              selectedKey={tabForm}
              onSelectionChange={setTabForm}
              aria-label="Options"
              variant="underlined"
              classNames={{
                tabList:
                  "md:ml-2 gap-6 relative rounded-none p-0 md:w-full w-screen",
                cursor: "w-full bg-[var(--primary-color)]",
                tab: "max-w-fit px-0 h-10",
                tabContent:
                  "group-data-[selected=true]:text-[var(--primary-color)]",
              }}
            >
              <Tab
                key="limit_tab"
                title={
                  <div className="flex gap-2 items-center">
                    <p>Limit</p>
                    <Tooltip
                      className="text-xs"
                      showArrow={true}
                      content="Limit order is an order to buy/sell at a specified price or better"
                    >
                      <Button size="sm" className="p-0 min-w-1 h-4">
                        <FaInfoCircle className="text-xs dark:text-gray-300" />
                      </Button>
                    </Tooltip>
                  </div>
                }
              >
                <LimitTrade
                  currencyName={pairSelected.split("/")[0]}
                  symbol={pairSelected.split("/")[0]}
                />
              </Tab>
              <Tab
                key="market_tab"
                title={
                  <div className="flex gap-2 items-center">
                    <p>Market</p>
                    <Tooltip
                      className="text-xs"
                      showArrow={true}
                      content="Quick buy/sell at market price"
                    >
                      <Button size="sm" className="p-0 min-w-1 h-4">
                        <FaInfoCircle className="text-xs dark:text-gray-300" />
                      </Button>
                    </Tooltip>
                  </div>
                }
              >
                <MarketTrade
                  currencyName={pairSelected.split("/")[0]}
                  symbol={pairSelected.split("/")[0]}
                />
              </Tab>
              <Tab
                key="trigger_tab"
                title={
                  <div className="flex gap-2 items-center">
                    <p>Trigger</p>
                    <Tooltip
                      className="text-xs"
                      showArrow={true}
                      content="To buy/sell coin once the price reaches a specified price"
                    >
                      <Button size="sm" className="p-0 min-w-1 h-4">
                        <FaInfoCircle className="text-xs dark:text-gray-300" />
                      </Button>
                    </Tooltip>
                  </div>
                }
              >
                <TriggerTrade />
              </Tab>
            </Tabs>
          </div>
          <div className="flex justify-center gap-3 text-sm">
            <p className="text-gray-500">Balance:</p>
            <span className="flex gap-1">
              <FaBitcoin className="self-center text-red-500" />
              <p className="self-center">0.00</p>
            </span>
            <span className="flex gap-1 text-sm">
              <FaDollarSign className="self-center text-green-500" />
              <p className="self-center">0.00</p>
            </span>
          </div>
        </div>
      </div>

      {/* Third Col */}
      <div className="w-1/5 min-w-[300px]">
        {/* Chat & Market */}
        <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-72 shadow-md">
          <Tabs
            selectedKey={tabChatAndCoinsList}
            onSelectionChange={setTabChatAndCoinsList}
            aria-label="Options"
            variant="underlined"
            classNames={{
              tabList:
                "ml-4 gap-6 relative rounded-none p-0 w-full w-screen overflow-x-scroll no-scrollbar",
              cursor: "w-full bg-[var(--primary-color)]",
              tab: "max-w-fit px-0 h-8",
              tabContent:
                "group-data-[selected=true]:text-[var(--primary-color)]",
            }}
          >
            <Tab
              key="coinslist_tab"
              title={
                <div className="flex items-center">
                  <p>Market</p>
                </div>
              }
            >
              <MarketCoinsListTrade />
            </Tab>
            <Tab
              key="chat_tab"
              title={
                <div className="flex items-center">
                  <p>Chat</p>
                </div>
              }
            >
              <TradeChat />
            </Tab>
          </Tabs>
        </div>
        {/* Trade History */}
        <div className="w-full h-fit mt-5">
          <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-full shadow-md">
            <div className="text-sm flex justify-between p-2">
              <h1 className="font-bold self-end">Trade History</h1>
            </div>
            <Divider />
            <div className="p-2 h-full md:text-[8px] lg:text-[10px]">
              <div className="flex justify-between bg-white/85 dark:bg-default-200/50 font-bold gap-2 p-1">
                <span>Time</span>
                <span>PRICE({pairSelected.split("/")[1]})</span>
                <span>AMOUNT({pairSelected.split("/")[0]})</span>
                <span>VALUE({pairSelected.split("/")[1]})</span>
              </div>
              <Divider />
              <ul
                className={`bg-white/85 dark:bg-default-200/50 rounded-sm w-full h-[463px] overflow-scroll no-scrollbar py-1`}
                // style={{ height: heightWindow - 100 + "px" }}
              >
                <li className="flex justify-between text-[11px] px-1 hover:bg-slate-200">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1 hover:bg-slate-200">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1 hover:bg-slate-200">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1 hover:bg-slate-200">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1 hover:bg-slate-200">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1 hover:bg-slate-200">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1 hover:bg-slate-200">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1 hover:bg-slate-200">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
