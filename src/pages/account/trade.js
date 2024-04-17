import { Divider, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import screenIs from "@/screen";
import MyLoading from "@/components/MyLoading";
export default function Trade() {
  const [mounted, setMount] = useState(false);
  const [heightWindow, setHeightWindow] = useState("100%");
  const [screenSize, setScreenSize] = useState(false);
  const [tab, setTab] = useState("limit_tab");
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
      <div className="w-1/5 min-w-max h-fit pb-28">
        <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-full shadow-md">
          <div className="text-sm flex justify-between p-2">
            <h1 className="font-bold self-end">BTC/USD</h1>
            <span className="text-xs self-end text-gray-500">68312.12</span>
            <span className="text-xs self-end text-green-500">+5.1%</span>
          </div>
          <Divider />
          <div className="p-2 h-full">
            <div className="flex justify-between text-[11px] gap-2 mb-1">
              <span>PRICE(USD)</span>
              <span>AMOUNT(BTC)</span>
              <span>VALUE(USD)</span>
            </div>
            <ul
              className={`bg-white/85 dark:bg-default-200/50 rounded-sm w-full h-[734px] overflow-scroll no-scrollbar py-1`}
              // style={{ height: heightWindow - 100 + "px" }}
            >
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-red-500">200.3223414</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span className="">0.000213</span>
                <span className="text-green-500">200.3223414wqe</span>
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
        <div className="relative rounded-md bg-gray-100 dark:bg-default-100 w-full h-[500px] shadow-md mt-5">
          <Tabs
            selectedKey={tab}
            onSelectionChange={setTab}
            aria-label="Options"
            variant="underlined"
            classNames={{
              tabList:
                "md:ml-2 gap-6 relative rounded-none p-0 md:w-full w-screen overflow-x-scroll no-scrollbar",
              cursor: "w-full bg-[var(--primary-color)]",
              tab: "max-w-fit px-0 h-12",
              tabContent:
                "group-data-[selected=true]:text-[var(--primary-color)]",
            }}
          >
            <Tab
              key="limit_tab"
              title={
                <div className="flex items-center">
                  <p>Limit</p>
                </div>
              }
            >
              <div>
                <p>This is limit</p>
              </div>
            </Tab>
            <Tab
              key="market_tab"
              title={
                <div className="flex items-center">
                  <p>Market</p>
                </div>
              }
            >
              <div>
                <p>This is market</p>
              </div>
            </Tab>
            <Tab
              key="trigger_tab"
              title={
                <div className="flex items-center">
                  <p>Limit</p>
                </div>
              }
            >
              <div>
                <p>This is trigger</p>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Third Col */}
      <div className="w-1/5 md:min-w-[240px] lg:min-w-[300px]">
        {/* Chat */}
        <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-72 shadow-md">
          <div className="text-sm flex gap-4 p-2">
            <h1 className="font-bold self-end">Market</h1>
            <span className="font-bold self-end text-primary">Chat</span>
          </div>
          <Divider />
          <div className="p-2 h-full">
            <ul className="bg-white/85 dark:bg-default-200/50 rounded-sm w-full h-[230px] overflow-scroll no-scrollbar p-1">
              <li className="flex text-[11px] px-1 gap-1">
                <span className="font-bold">b7808680:</span>
                <span>hi, my name is mouhyg</span>
              </li>
              <li className="flex text-[11px] px-1 gap-1">
                <span className="font-bold">b7808680:</span>
                <span>
                  hi, my name is mouhyg bjlbl ljbljb bhgpug bgipgbp pigoug
                </span>
              </li>
              <li className="flex text-[11px] px-1 gap-1">
                <span className="font-bold">b7808680:</span>
                <span>hi, my name is mouhyg bjlbl ljbljb bhgpug</span>
              </li>
              <li className="flex text-[11px] px-1 gap-1">
                <span className="font-bold">b7808680:</span>
                <span>hi, my name is mouhyg</span>
              </li>
              <li className="flex text-[11px] px-1 gap-1">
                <span className="font-bold">b7808680:</span>
                <span>
                  hi, my name is mouhyg bjlbl ljbljb bhgpug bgipgbp pigoug
                </span>
              </li>
              <li className="flex text-[11px] px-1 gap-1">
                <span className="font-bold">b7808680:</span>
                <span>hi, my name is mouhyg bjlbl ljbljb bhgpug</span>
              </li>
              <li className="flex text-[11px] px-1 gap-1">
                <span className="font-bold">b7808680:</span>
                <span>hi, my name is mouhyg</span>
              </li>
              <li className="flex text-[11px] px-1 gap-1">
                <span className="font-bold">b7808680:</span>
                <span>
                  hi, my name is mouhyg bjlbl ljbljb bhgpug bgipgbp pigoug
                </span>
              </li>
              <li className="flex text-[11px] px-1 gap-1">
                <span className="font-bold">b7808680:</span>
                <span>hi, my name is mouhyg bjlbl ljbljb bhgpug</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Trade History */}
        <div className="w-full h-fit mt-5">
          <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-full shadow-md">
            <div className="text-sm flex justify-between p-2">
              <h1 className="font-bold self-end">Trade History</h1>
              <span className="text-xs self-end text-gray-500">68312.12</span>
              <span className="text-xs self-end text-green-500">+5.1%</span>
            </div>
            <Divider />
            <div className="p-2 h-full md:text-[8px] lg:text-[10px]">
              <div className="flex justify-between bg-white/85 dark:bg-default-200/50 font-bold gap-2 p-1">
                <span>Time</span>
                <span>PRICE(USD)</span>
                <span>AMOUNT(BTC)</span>
                <span>VALUE(USD)</span>
              </div>
              <Divider />
              <ul
                className={`bg-white/85 dark:bg-default-200/50 rounded-sm w-full h-[425px] overflow-scroll no-scrollbar py-1`}
                // style={{ height: heightWindow - 100 + "px" }}
              >
                <li className="flex justify-between text-[11px] px-1">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1">
                  <span className="">21:35</span>
                  <span className="text-red-500">44231.22</span>
                  <span className="">0.000213</span>
                  <span className="text-red-500">200.32</span>
                </li>
                <li className="flex justify-between text-[11px] px-1">
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
