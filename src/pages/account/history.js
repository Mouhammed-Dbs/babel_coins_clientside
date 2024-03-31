import MyInput from "@/components/utils/MyInput";
import { Button, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaFileCsv } from "react-icons/fa6";
import { IoIosArrowDown, IoIosCloseCircleOutline } from "react-icons/io";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { RiErrorWarningFill } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MyLoading from "@/components/MyLoading";
import screenIs from "@/screen";

export default function History() {
  const [data, setData] = useState([
    {
      date: "16 Jan 2024 23:52",
      credit: 0,
      debit: 15,
      ps: "TRX",
      id: "2009936051",
      status: true,
    },
    {
      date: "16 Jul 2024 23:53",
      credit: 100,
      debit: 0,
      ps: "TRX",
      id: "2009996551",
      status: false,
    },
    {
      date: "16 Jan 2024 23:54",
      credit: 0,
      debit: 15,
      ps: "TRX",
      id: "2009936051",
      status: true,
    },
    {
      date: "16 Jul 2024 23:55",
      credit: 100,
      debit: 0,
      ps: "TRX",
      id: "2009996551",
      status: false,
    },
    {
      date: "16 Jan 2024 23:56",
      credit: 0,
      debit: 15,
      ps: "TRX",
      id: "2009936051",
      status: true,
    },
    {
      date: "16 Jul 2024 23:57",
      credit: 90,
      debit: 0,
      ps: "TRX",
      id: "2009996551",
      status: false,
    },
    {
      date: "16 Jan 2024 23:58",
      credit: 0,
      debit: 15,
      ps: "TRX",
      id: "2009936051",
      status: true,
    },
    {
      date: "16 Jul 2024 23:59",
      credit: 100,
      debit: 0,
      ps: "TRX",
      id: "2009996551",
      status: false,
    },
    {
      date: "16 Jan 2024 00:00",
      credit: 0,
      debit: 15,
      ps: "TRX",
      id: "2009936051",
      status: true,
    },
    {
      date: "16 Jul 2024 22:52",
      credit: 100,
      debit: 0,
      ps: "TRX",
      id: "2009996551",
      status: false,
    },
    {
      date: "16 Jan 2024 21:52",
      credit: 0,
      debit: 15,
      ps: "TRX",
      id: "2009936051",
      status: true,
    },
    {
      date: "16 Jul 2024 19:52",
      credit: 100,
      debit: 0,
      ps: "TRX",
      id: "2009996551",
      status: false,
    },
    {
      date: "16 Jan 2024 14:52",
      credit: 0,
      debit: 15,
      ps: "TRX",
      id: "2009936051",
      status: true,
    },
    {
      date: "16 Jul 2024 13:52",
      credit: 100,
      debit: 0,
      ps: "TRX",
      id: "2009996551",
      status: false,
    },
    {
      date: "16 Jan 2024 12:52",
      credit: 0,
      debit: 15,
      ps: "TRX",
      id: "2009936051",
      status: true,
    },
    {
      date: "16 Jul 2024 10:52",
      credit: 100,
      debit: 0,
      ps: "TRX",
      id: "2009996551",
      status: false,
    },
    {
      date: "16 Jan 2024 02:52",
      credit: 0,
      debit: 15,
      ps: "TRX",
      id: "2009936051",
      status: true,
    },
    {
      date: "16 Jul 2024 03:52",
      credit: 100,
      debit: 0,
      ps: "TRX",
      id: "2009996551",
      status: false,
    },
  ]);
  const [currentSize, setCurrentSize] = useState(0);
  const [screenSize, setScreenSize] = useState(false);
  const [mounted, setMount] = useState(false);
  const [tillDate, setTillDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [items, setItems] = useState([
    "TRANSACTIONS",
    "USD",
    "RUB",
    "EUR",
    "BTC",
    "ETH",
    "BCH",
    "LTC",
    "DASH",
    "USDT",
    "XRP",
    "DOGE",
    "TRX",
    "BNB",
    "MATIC",
    "DAI",
    "DOT",
    "USDC",
    "LINK",
    "SAND",
    "MANA",
    "AAVE",
    "SUSHI",
    "CAKE",
    "1INCH",
    "GALA",
    "LDO",
    "GMT",
    "UNI",
    "CRV",
    "BAL",
    "GRT",
    "APE",
  ]);
  const [openFilter, setOpenFilter] = useState(false);
  const [itemSelected, setItemSelected] = useState("TRANSACTIONS");
  const [widthCard, setWidthCard] = useState("100%");

  useEffect(() => {
    setMount(true);
    setScreenSize(screenIs("md"));
    setWidthCard(window.innerWidth);
    const handleResize = () => {
      setScreenSize(screenIs("md"));
      setWidthCard(window.innerWidth);
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
    <div className="h-screen container m-auto no-scrollbar overflow-y-scroll pb-[150px]">
      <div className="w-full md:w-[720px] lg:w-[950px] m-auto mt-4 pb-3">
        <div className="w-fit ml-4 md:ml-0 bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50 dark:bg-default-50">
            HISTORY
          </h1>
        </div>
      </div>
      <div className="card_history pb-4 ml-4 mt-6 md:m-auto md:mt-10 w-11/12 md:w-[720px] lg:w-[950px] md:text-center backdrop-blur-xs bg-white dark:bg-default-100 rounded-lg shadow-md">
        <ul
          style={!screenSize ? { width: (widthCard - 68) * (11 / 12) } : {}}
          className="flex md:flex-wrap bg-gray-200 dark:bg-gray-600 rounded-t-lg py-1 no-scrollbar overflow-x-scroll"
        >
          {items.map((item) => (
            <li
              key={item}
              className={`p-2 px-1 md:px-2 mx-1 md:mx-2 text-gray-500 cursor-pointer text-sm md:text-base ${
                itemSelected === item
                  ? "bg-white dark:text-primary dark:bg-gray-400 rounded-lg text-primary px-3"
                  : "dark:text-gray-300"
              }`}
              onClick={() => {
                setItemSelected(item);
                setOpenFilter(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
        <div>
          <div className="flex justify-between md:px-4">
            <Button className="text-gray-500 underline">
              <FaFileCsv />
              EXPORT TO CSV
            </Button>
            {itemSelected === "TRANSACTIONS" && (
              <Button
                className="text-gray-500 underline"
                onClick={() => {
                  setOpenFilter(!openFilter);
                }}
              >
                SHOW FILTER
              </Button>
            )}
          </div>
          {openFilter && (
            <div className="flex bg-slate-100 dark:bg-gray-600 mx-5 p-2 rounded-md">
              <div className="w-11/12 md:grid grid-cols-3 gap-1 md:gap-5">
                <div className="w-full px-1 md:px-4">
                  <MyInput
                    color="border-gray-500"
                    className="w-40 border-black"
                    item={{
                      label: "Operation ID:",
                      name: "operation_id",
                      type: "text",
                      placeholder: "",
                    }}
                  />
                  <div className="mt-7">
                    <Select
                      label="Type:"
                      defaultSelectedKeys={["all"]}
                      disallowEmptySelection={true}
                      aria-label="none"
                      classNames={{
                        base: "w-40 peer self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                        trigger: "h-8",
                      }}
                      size="sm"
                      style={{ backgroundColor: "inherit" }}
                      labelPlacement="outside"
                      selectorIcon={
                        <IoIosArrowDown color="var(--bg-primary-color)" />
                      }
                      placeholder="All"
                    >
                      <SelectItem key="all" value="all">
                        All
                      </SelectItem>
                    </Select>
                  </div>
                </div>
                <div className="w-full px-1 md:px-4">
                  <div className="w-full">
                    <label className="block w-full text-left text-sm mb-[2.5px]">
                      From
                    </label>
                    <DatePicker
                      className="bg-inherit w-40 outline-none rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 px-4 py-[3px]"
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </div>
                  <div className="w-full mt-2">
                    <label className="block w-full text-left text-sm mb-1">
                      Till
                    </label>
                    <DatePicker
                      className="bg-inherit w-40 outline-none rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 px-4 py-[3px]"
                      selected={tillDate}
                      onChange={(date) => setTillDate(date)}
                    />
                  </div>
                </div>
                <div className="w-full text-left px-1 md:px-4">
                  <Select
                    label="Currency:"
                    defaultSelectedKeys={["all"]}
                    disallowEmptySelection={true}
                    aria-label="none"
                    classNames={{
                      base: "w-40 peer mt-3 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                      trigger: "h-8",
                    }}
                    size="sm"
                    style={{ backgroundColor: "inherit" }}
                    labelPlacement="outside"
                    selectorIcon={
                      <IoIosArrowDown color="var(--bg-primary-color)" />
                    }
                    placeholder="All"
                  >
                    <SelectItem key="all" value="all">
                      All
                    </SelectItem>
                  </Select>
                  <Button
                    size="md"
                    className="bg-orange text-white rounded-full mt-4"
                  >
                    Apply
                  </Button>
                </div>
              </div>
              <div className="w-1/12">
                <div className="flex w-full place-content-end">
                  <IoIosCloseCircleOutline
                    className="h-6 w-6 cursor-pointer"
                    size={10}
                    onClick={() => setOpenFilter(false)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mx-1 md:mx-4">
          <div className="flex md:px-2 py-2 mt-3 font-bold text-gray-700 dark:text-gray-300 text-center">
            <h3 className="w-3/12 text-xs md:text-sm text-start pl-2 md:pl-4">
              DATE
            </h3>
            <h3 className="w-2/12 text-xs md:text-sm">CREDIT</h3>
            <h3 className="w-2/12 text-xs md:text-sm">DEBIT</h3>
            <h3 className="hidden md:block md:w-1/12 text-xs md:text-sm">PS</h3>
            <h3 className="w-3/12 text-xs md:text-sm">ID</h3>
            <h3 className="md:w-1/12 w-2/12 text-xs md:text-sm">STATUS</h3>
          </div>
          <ul className="w-full">
            {data.slice(0, currentSize + 3).map((item) => (
              <ItemTransaction
                key={item.date}
                date={item.date}
                credit={"+" + item.credit + " " + item.ps}
                debit={"-" + item.debit + " " + item.ps}
                ps={item.ps}
                id={item.id}
                status={item.status}
              />
            ))}
          </ul>
          <div
            onClick={() => {
              setCurrentSize(currentSize + 3);
            }}
            className="w-full rounded-full bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 my-3 flex place-content-center"
          >
            <PiDotsThreeOutlineFill className="text-gray-400 h-6 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
function ItemTransaction({ date, credit, debit, ps, id, status }) {
  return (
    <li className="flex px-1 md:px-3 border-b-1 md:border-b-2 py-3 font-bold text-center">
      <div className="flex w-3/12">
        <p className="w-full text-xs opacity-70 self-center md:pl-4 text-left">
          {date}
        </p>
      </div>
      <div className="flex w-2/12">
        <p className="w-full text-xs opacity-70 self-center px-1 md:px-4 text-green-600">
          {credit}
        </p>
      </div>
      <div className="flex w-2/12">
        <p className="w-full text-xs opacity-70 self-center px-1 md:px-4 text-red-600">
          {debit}
        </p>
      </div>
      <div className="hidden md:flex md:w-1/12 place-content-center">
        <Image
          alt=""
          width={20}
          height={20}
          src={`/images/coins/${ps}.png`}
          className="w-5 h-5 md:h-8 md:w-8"
        />
      </div>
      <div className="flex w-3/12">
        <p className="w-full text-xs opacity-70 self-center px-1 md:px-4">
          {id}
        </p>
      </div>
      <div className="flex w-2/12 md:w-1/12 overflow-hidden place-content-center">
        {status ? (
          <IoCheckmarkDoneCircle className="w-5 h-5 md:h-8 md:w-8 self-center text-green-600" />
        ) : (
          <RiErrorWarningFill className="w-5 h-5 md:h-8 md:w-8 self-center text-red-600" />
        )}
      </div>
    </li>
  );
}
