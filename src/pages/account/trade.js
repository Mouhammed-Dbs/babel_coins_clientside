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
  const [screenSize, setScreenSize] = useState(false);
  const [tabForm, setTabForm] = useState("limit_tab");
  const [tabChatAndCoinsList, setTabChatAndCoinsList] =
    useState("coinslist_tab");
  const [pairSelected, setPairSelected] = useState("ETHER/USDT");
  const [pendingSellOrders, setPendingSellOrders] = useState([]);
  const [pendingBuyOrders, setPendingBuyOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [globalPrice, setGlobalPrice] = useState(0);
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

    socket.on("change currency rates", (data) => {
      console.log(data);
      setGlobalPrice(data);
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const pair = pairSelected.split("/");
    getInitOrders(pair[0], pair[1]);
  }, [pairSelected]);

  const handleChangePair = (pair) => {
    setPairSelected(pair);
  };

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
    <div className="flex h-screen w-screen pt-3 rtl:pl-24 ltr:pr-24 gap-3 overflow-y-scroll overflow-x-hidden no-scrollbar pb-20">
      {/* First Col */}
      <div className="w-1/4 min-w-max h-fit">
        <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-full shadow-md">
          {/* Header */}
          <div className="text-sm flex justify-between p-2">
            <h1 className="font-bold self-end">{pairSelected}</h1>
            <span className="text-xs self-end text-gray-500">68312.12</span>
            <span className="text-xs self-end text-green-500">+5.1%</span>
          </div>
          <Divider />
          <QueueOrders
            globalPrice={globalPrice}
            pairSelected={pairSelected}
            pendingBuyOrders={pendingBuyOrders}
            pendingSellOrders={pendingSellOrders}
          />
        </div>
      </div>

      {/* Second Col */}
      <div
        className="w-1/2 min-w-[360px] lg:min-w-[400px]"
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
                  firstSymbol={pairSelected.split("/")[0]}
                  secondSymbol={pairSelected.split("/")[1]}
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
                  firstSymbol={pairSelected.split("/")[0]}
                  secondSymbol={pairSelected.split("/")[1]}
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
                  firstSymbol={pairSelected.split("/")[0]}
                  secondSymbol={pairSelected.split("/")[1]}
                />
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
      <div className="w-1/4 min-w-[300px]">
        {/* Chat & Market */}
        <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-[348px] shadow-md">
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
              <MarketCoinsListTrade
                prices={globalPrice}
                onItemClick={handleChangePair}
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
        <TradeHistory
          pairSelected={pairSelected}
          historyOrders={historyOrders}
        />
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
