import io from "socket.io-client";
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
import { FaInfoCircle } from "react-icons/fa";
import GraphTrade from "@/components/trade/GraphTrage";
import { loadMessages } from "@/lib/loadMessages";
import {
  getInitialTrageOrders,
  getOrders,
} from "../../../public/global_functions/trade";
import QueueOrders from "@/components/trade/QueueOrders";
import TradeHistory from "@/components/trade/TradeHistory";

export default function Trade() {
  const [mounted, setMount] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [heightWindow, setHeightWindow] = useState("100%");
  const [widthWindow, setWidthWindow] = useState("100%");
  const [screenSize, setScreenSize] = useState(false);
  const [tabForm, setTabForm] = useState("limit_tab");
  const [tabChatAndCoinsList, setTabChatAndCoinsList] =
    useState("coinslist_tab");
  const [pairSelected, setPairSelected] = useState({
    firstCurrencyName: "ETHER",
    rate: 3666.08,
    secondCurrencyName: "USDT",
    _v: 0,
    _id: "66eaedf190472fa912f2b2df",
  });
  const [pendingSellOrders, setPendingSellOrders] = useState([]);
  const [pendingBuyOrders, setPendingBuyOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [globalPrice, setGlobalPrice] = useState(0);

  useEffect(() => {
    setMount(true);
    setScreenSize(screenIs("md"));
    setHeightWindow(window.innerHeight);
    setWidthWindow(window.innerWidth);
    const handleResize = () => {
      setScreenSize(screenIs("md"));
      setHeightWindow(window.innerHeight);
      setWidthWindow(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  // Socket.IO connection
  useEffect(() => {
    const socket = io(process.env.BASE_API_URL, {
      transports: ["polling"],
    });
    socket.on("connect", () => {
      console.log("Socket.IO connected");
      socket.emit("join to trade room");
    });

    socket.on("success join to trade room", () => {
      console.log("success join to trade room");
    });

    socket.on("new executed order", (order) => {
      console.log(order);
    });

    socket.on("new pending order", (order) => {
      console.log(order);
    });

    socket.on("change trade currency rates", (res) => {
      console.log(res.data);
      setGlobalPrice(res.data);
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getFilteringString = (filters) => {
    let filteringString = "";
    if (filters.pageNumber)
      filteringString += `pageNumber=${filters.pageNumber}&`;
    if (filters.pageSize) filteringString += `pageSize=${filters.pageSize}&`;
    if (filters.status) filteringString += `status=${filters.status}&`;
    if (filters.destination)
      filteringString += `destination=${filters.destination}&`;
    if (filters.orderAction)
      filteringString += `orderAction=${filters.orderAction}&`;
    if (filters.firstCurrencyName)
      filteringString += `firstCurrencyName=${filters.firstCurrencyName}&`;
    if (filters.secondCurrencyName)
      filteringString += `secondCurrencyName=${filters.secondCurrencyName}&`;
    if (filteringString)
      filteringString = filteringString.substring(
        0,
        filteringString.length - 1
      );
    return filteringString;
  };

  const getInitOrders = async (firstCurrencyName, secondCurrencyName) => {
    setPageLoading(true);
    try {
      const initOrders = await getInitialTrageOrders(
        firstCurrencyName,
        secondCurrencyName
      );
      setPendingBuyOrders(initOrders.data.pendingBuyOrders.orders);
      setPendingSellOrders(initOrders.data.pendingSellOrders.orders);
      setHistoryOrders(initOrders.data.historyOrders.orders);
    } catch (err) {
      console.log(err);
    } finally {
      setPageLoading(false);
    }
  };

  const getTradeOrders = async (filters) => {
    try {
      const initOrders = await getOrders(getFilteringString(filters));
      if (!initOrders.error) {
        // Handle successful fetching of trade orders
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInitOrders(
      pairSelected.firstCurrencyName,
      pairSelected.secondCurrencyName
    );
  }, [pairSelected]);

  const handleChangePair = (firstCurrencyName, secondCurrencyName) => {
    const infoPair = globalPrice.find(
      (pair) =>
        pair.firstCurrencyName === firstCurrencyName &&
        pair.secondCurrencyName === secondCurrencyName
    );
    setPairSelected(infoPair);
  };

  const getSpecificPair = (firstCurrencyName, secondCurrencyName) => {
    if (globalPrice) {
      const specificPair = globalPrice.find(
        (pair) =>
          pair.firstCurrencyName === firstCurrencyName &&
          pair.secondCurrencyName === secondCurrencyName
      );
      return specificPair ? specificPair.rate : null;
    }
  };
  // return <></>;
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
    <div
      className={`flex flex-col md:flex-row h-screen w-[${widthWindow}px] md:w-screen pt-3 rtl:pl-24 ltr:pr-24 gap-4 overflow-y-scroll overflow-x-hidden no-scrollbar pb-20`}
    >
      {/* Show Price Graph First on Mobile */}
      <div
        className={`order-1 md:order-2 w-full md:w-1/2 min-w-[310px] lg:min-w-[400px]`}
        style={{ height: heightWindow + 340 + "px" }}
      >
        {/* Price Graph */}
        <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-[350px] shadow-md">
          <div className="text-sm flex gap-4 p-2">
            <h1 className="font-bold self-end">Price Graph</h1>
          </div>
          <Divider />
          <div className="p-2">
            <GraphTrade pair={pairSelected} />
          </div>
        </div>
        {/* Trade Form */}
        <div className="flex flex-col rounded-md bg-gray-100 dark:bg-default-100 w-full h-[600px] shadow-md mt-5 p-2">
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
                  firstSymbol={pairSelected.firstCurrencyName}
                  secondSymbol={pairSelected.secondCurrencyName}
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
                  firstSymbol={pairSelected.firstCurrencyName}
                  secondSymbol={pairSelected.secondCurrencyName}
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
                <TriggerTrade
                  firstSymbol={pairSelected.firstCurrencyName}
                  secondSymbol={pairSelected.secondCurrencyName}
                />
              </Tab>
            </Tabs>
          </div>
          <div className="h-full flex justify-center gap-3 text-sm">
            <p className="self-end text-gray-500">Balance:</p>
            <span className="self-end flex gap-1">
              <FaBitcoin className="self-center text-red-500" />
              <p className="self-center">0.00</p>
            </span>
            <span className="self-end flex gap-1 text-sm">
              <FaDollarSign className="self-center text-green-500" />
              <p className="self-center">0.00</p>
            </span>
          </div>
        </div>
      </div>

      {/* First Column (Queue Orders) */}
      <div
        className={`order-2 md:order-1 w-full md:w-1/4 min-w-[310px] md:min-w-max h-fit`}
      >
        <QueueOrders
          pairSelected={pairSelected}
          pendingBuyOrders={pendingBuyOrders}
          pendingSellOrders={pendingSellOrders}
          getSpecificPair={getSpecificPair}
        />
      </div>

      {/* Third Column (Chat & Market) */}
      <div className={`order-3 w-full md:w-1/4 min-w-[310px]`}>
        {/* Chat & Market */}
        <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-[350px] shadow-md">
          <Tabs
            selectedKey={tabChatAndCoinsList}
            onSelectionChange={setTabChatAndCoinsList}
            aria-label="Options"
            variant="underlined"
            classNames={{
              tabList:
                "ml-4 gap-6 relative rounded-none p-0 w-full overflow-x-scroll no-scrollbar",
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
              <MarketCoinsListTrade
                onItemClick={handleChangePair}
                getSpecificPair={getSpecificPair}
              />
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
        <div className={`min-w-max`}>
          <TradeHistory
            pairSelected={pairSelected}
            historyOrders={historyOrders}
          />
        </div>
        <div className="min-h-24 block"></div>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: await loadMessages(locale),
    },
  };
}
