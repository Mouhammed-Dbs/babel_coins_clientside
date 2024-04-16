import { Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import screenIs from "@/screen";
import MyLoading from "@/components/MyLoading";
export default function Trade() {
  const [mounted, setMount] = useState(false);
  const [heightWindow, setHeightWindow] = useState("100%");
  const [screenSize, setScreenSize] = useState(false);

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
    <div className="flex w-screen h-full pb-20 pt-3 px-3 pr-20 gap-3">
      <div className="w-1/5 min-w-max h-full">
        <div className="rounded-md bg-gray-200 w-full h-full">
          <div className="text-sm flex justify-between p-2">
            <h1 className="font-bold self-end">BTC/USD</h1>
            <span className="text-xs self-end text-gray-500">68312.12</span>
            <span className="text-xs self-end text-green-500">+5.1%</span>
          </div>
          <Divider />
          <div className="p-2 h-full">
            <div className="flex justify-between text-[11px] gap-2">
              <span>PRICE(USD)</span>
              <span>AMOUNT(BTC)</span>
              <span>VALUE(USD)</span>
            </div>
            <ul
              className={`bg-white/85 rounded-sm w-full overflow-scroll no-scrollbar`}
              style={{ height: heightWindow - 165 + "px" }}
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
            </ul>
          </div>
        </div>
      </div>
      <div className="w-3/5 min-w-[400px]">
        <div className="rounded-md bg-gray-200 w-full h-72">
          <div className="text-sm flex gap-4 p-2">
            <h1 className="font-bold self-end">Price Graph</h1>
          </div>
          <Divider />
          <div className="p-2"></div>
        </div>
      </div>
      <div className="w-1/5 min-w-[260px]">
        <div className="rounded-md bg-gray-200 w-full h-64">
          <div className="text-sm flex gap-4 p-2">
            <h1 className="font-bold self-end">Market</h1>
            <span className="font-bold self-end text-primary">Chat</span>
          </div>
          <Divider />
          <div className="p-2 h-full">
            <ul className="bg-white/85 rounded-sm w-full h-[200px] overflow-scroll no-scrollbar">
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
      </div>
    </div>
  );
}
