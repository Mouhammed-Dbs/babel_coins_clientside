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
import {
  getOperations,
  getOperationsCount,
} from "../../../public/global_functions/coins";
import { getDateTimeFormated } from "../../../public/global_functions/helpers";
import { loadMessages } from "@/lib/loadMessages";
import { useTranslations } from "next-intl";

export default function History() {
  const t = useTranslations("History");
  const t_w = useTranslations("Words");
  const PAGE_SIZE = 4;
  const [tab, setTab] = useState("CREDIT");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [screenSize, setScreenSize] = useState(false);
  const [mounted, setMount] = useState(false);
  const [tillDate, setTillDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [items, setItems] = useState([
    "TRANSACTIONS",
    // "USD",
    // "RUB",
    // "EUR",
    "ETHER",
    "USDT",
    "TRX",
    "BNB",
    "MATIC",
  ]);
  const [openFilter, setOpenFilter] = useState(false);
  const [itemSelected, setItemSelected] = useState("TRANSACTIONS");
  const [widthCard, setWidthCard] = useState("100%");
  const [totalSlidesCount, setTotalSlidesCount] = useState(0);
  const [currentlSlidesCount, setCurrentSlidesCount] = useState(1);
  const [filters, setFilters] = useState({
    _id: "",
    status: "",
    userId: "",
    currencyName: "",
  });

  const getFilteringString = (filters) => {
    let filteringString = "";
    if (filters._id) filteringString += `_id=${filters._id}&`;
    if (filters.status) filteringString += `status=${filters.status}&`;
    if (filters.userId) filteringString += `userId=${filters.userId}&`;
    if (filters.currencyName)
      filteringString += `currencyName=${filters.currencyName}&`;
    if (filteringString)
      filteringString = filteringString.substring(
        0,
        filteringString.length - 1
      );
    return filteringString;
  };

  const getData = (type, pageNumber, sizeNumber, filters) => {
    const tempFilters = {
      ...filters,
      userId: localStorage.getItem("babel-coins-user-id"),
    };
    setFilters(tempFilters);
    setLoading(true);
    if (pageNumber === 1) setData([]);
    setCurrentSlidesCount(pageNumber);
    getOperationsCount(type, getFilteringString(tempFilters))
      .then((result) => {
        setTotalSlidesCount(Math.ceil(result.data / PAGE_SIZE));
        if (result.data > 0) {
          getOperations(
            type,
            pageNumber,
            sizeNumber,
            getFilteringString(tempFilters)
          )
            .then((result) => {
              console.log(result.data);
              if (pageNumber === 1) setData(result.data);
              else setData([...data, ...result.data]);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

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

  useEffect(() => {
    getData("deposits", currentlSlidesCount, PAGE_SIZE, filters);
  }, []);
  if (!mounted)
    return (
      <MyLoading
        msg={t_w("Loading")}
        color="primary"
        className={`text-black dark:text-white mt-24`}
      />
    );

  return (
    <div className="h-screen container m-auto no-scrollbar overflow-y-scroll pb-[150px]">
      {/* Title Page */}
      <div className="w-full md:w-[720px] lg:w-[950px] m-auto mt-4 pb-3">
        <div className="w-fit pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50/15 dark:bg-default-50/15 backdrop-blur-xs">
            {t("History")}
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]"></div>
        </div>
      </div>
      {/* Body Page */}
      <div className="card_history pb-4 mt-6 md:m-auto md:mt-10 w-11/12 md:w-[720px] lg:w-[950px] md:text-center bg-white/55 dark:bg-default-100/55 backdrop-blur-md rounded-lg shadow-md">
        {/* Currencies Tabs */}
        <ul
          style={!screenSize ? { width: (widthCard - 100) * (11 / 12) } : {}}
          className="flex md:flex-wrap bg-gray-200/70 dark:bg-gray-600/70 rounded-t-lg py-1 no-scrollbar overflow-x-scroll"
        >
          {items.map((item) => (
            <li
              key={item}
              className={`p-1 px-1 md:px-2 mx-1 md:mx-2 text-gray-500 cursor-pointer text-sm md:text-base pt-2 ${
                itemSelected === item
                  ? "bg-white dark:text-secondary dark:bg-gray-600 rounded-lg text-primary px-3"
                  : "dark:text-gray-300"
              }`}
              onClick={(e) => {
                const currency =
                  e.target.innerText === "TRANSACTIONS"
                    ? ""
                    : e.target.innerText;
                setItemSelected(e.target.innerText);
                const tempFilters = {
                  ...filters,
                  currencyName: currency,
                };
                setFilters(tempFilters);
                getData(
                  tab === "DEBIT" ? "transfers" : "deposits",
                  1,
                  PAGE_SIZE,
                  tempFilters
                );
                setOpenFilter(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
        {/* Transfer Type Tabs CREDIT/DEBIT */}
        <div className="flex w-full border-t-1 border-b-1 bg-gray-200/55 dark:bg-gray-600/55 border-gray-400 dark:border-gray-300">
          <Button
            className={`w-1/2 bg-gray-200/55 dark:bg-gray-600/55 rounded-none border-r-1 border-gray-400 dark:border-gray-300 ${
              tab === "CREDIT"
                ? "text-primary dark:text-secondary font-bold"
                : ""
            }`}
            onClick={() => {
              setTab("CREDIT");
              getData("deposits", 1, PAGE_SIZE, filters);
            }}
          >
            {t_w("Credit")}
          </Button>
          <Button
            className={`w-1/2 bg-gray-200/55 dark:bg-gray-600/55 rounded-none ${
              tab === "DEBIT"
                ? "text-primary dark:text-secondary font-bold"
                : ""
            }`}
            onClick={() => {
              setTab("DEBIT");
              getData("transfers", 1, PAGE_SIZE, filters);
            }}
          >
            {t_w("Debit")}
          </Button>
        </div>
        {/* Export To CSV & Show Filter */}
        <div>
          <div className="flex justify-between md:px-4">
            <Button
              className="text-gray-500 underline"
              size={!screenSize ? "sm" : ""}
            >
              <FaFileCsv />
              {t("ExportCSV")}
            </Button>
            {itemSelected === "TRANSACTIONS" && (
              <Button
                className="text-gray-500 underline"
                onClick={() => {
                  setOpenFilter(!openFilter);
                }}
                size={!screenSize ? "sm" : ""}
              >
                {t("ShowFilter")}
              </Button>
            )}
          </div>
          {openFilter && (
            <div className="flex bg-slate-100/55 dark:bg-gray-600/55 mx-5 p-2 rounded-md shadow-md py-4">
              <div className="w-11/12 md:grid grid-cols-3 gap-1 md:gap-5">
                <div className="w-full px-1 md:px-4">
                  <MyInput
                    value={filters._id}
                    onChange={(e) => {
                      setFilters({ ...filters, _id: e.target.value });
                    }}
                    color="border-gray-500"
                    className="w-40 border-black"
                    item={{
                      label: t("OperationID") + ":",
                      name: "operation_id",
                      type: "text",
                      placeholder: "",
                    }}
                  />

                  <div className="mt-1">
                    <label className="block w-full ltr:text-left rtl:text-right text-sm px-1">
                      {t_w("Type")}:
                    </label>
                    <Select
                      dir="ltr"
                      selectedKeys={[tab]}
                      onChange={(e) => {
                        setTab(e.target.value);
                        getData(
                          e.target.value === "DEBIT" ? "transfers" : "deposits",
                          1,
                          PAGE_SIZE,
                          filters
                        );
                      }}
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
                    >
                      <SelectItem key="DEBIT" value="DEBIT">
                        {t_w("Debit")}
                      </SelectItem>
                      <SelectItem key="CREDIT" value="CREDIT">
                        {t_w("Credit")}
                      </SelectItem>
                    </Select>
                  </div>
                </div>
                <div className="w-full px-1 md:px-4">
                  <div className="w-full">
                    <label className="block w-full ltr:text-left rtl:text-right text-sm mb-[2.5px] px-1">
                      {t("From")}
                    </label>
                    <DatePicker
                      className="bg-inherit w-40 md:w-full outline-none rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 px-4 py-[3px]"
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </div>
                  <div className="w-full mt-2">
                    <label className="block w-full ltr:text-left rtl:text-right text-sm mb-1 px-1">
                      {t("Till")}
                    </label>
                    <DatePicker
                      className="bg-inherit w-40 md:w-full outline-none rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 px-4 py-[3px]"
                      selected={tillDate}
                      onChange={(date) => setTillDate(date)}
                    />
                  </div>
                </div>
                <div className="w-full ltr:text-left rtl:text-right px-1 md:px-4 mt-2">
                  <label className="block w-full ltr:text-left rtl:text-right text-xs px-1">
                    {t_w("Currency")}:
                  </label>
                  <Select
                    dir="ltr"
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
                  <Button
                    isDisabled={loading}
                    onClick={() => {
                      getData(
                        tab === "DEBIT" ? "transfers" : "deposits",
                        currentlSlidesCount,
                        PAGE_SIZE,
                        filters
                      );
                    }}
                    size="md"
                    className="bg-orange text-white rounded-full mt-4"
                  >
                    {loading ? t_w("Sending") : t_w("Apply")}
                  </Button>
                </div>
              </div>
              <div className="w-1/12">
                <div className="flex w-full place-content-end">
                  <IoIosCloseCircleOutline
                    className="h-6 w-6 cursor-pointer"
                    size={10}
                    onClick={() => {
                      setOpenFilter(false);
                      setFilters({
                        _id: "",
                        status: "",
                        userId: "",
                        currencyName: "",
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {data.length > 0 ? ( // Operations Table
          <div className="mx-1 md:mx-4">
            <div className="flex md:px-2 py-2 mt-3 font-bold text-gray-700 dark:text-gray-300 text-center">
              <h3 className="w-3/12 text-xs md:text-sm text-center pl-2 md:pl-4">
                {t("Date")}
              </h3>
              <h3 className="w-3/12 text-xs md:text-sm">
                {tab === "DEBIT" ? t_w("Debit") : t_w("Credit")}
              </h3>
              <h3 className="hidden md:block md:w-1/12 text-xs md:text-sm">
                {t("PS")}
              </h3>
              <h3 className="w-4/12 text-xs md:text-sm">{t("ID")}</h3>
              <h3 className="md:w-1/12 w-2/12 text-xs md:text-sm">
                {t("Status")}
              </h3>
            </div>
            <ul className="w-full">
              {data.map((item) => (
                <ItemTransaction
                  key={item._id}
                  type={tab}
                  date={
                    tab === "DEBIT" ? item.dateOfTransfer : item.dateOfDeposit
                  }
                  amount={item.amount}
                  ps={item.currencyName === "ETHER" ? "ETH" : item.currencyName}
                  id={item._id}
                  status={item.status}
                />
              ))}
            </ul>
            {loading && <MyLoading />}
            {currentlSlidesCount < totalSlidesCount && (
              <div
                onClick={() => {
                  if (currentlSlidesCount <= totalSlidesCount) {
                    getData(
                      tab === "DEBIT" ? "transfers" : "deposits",
                      currentlSlidesCount + 1,
                      PAGE_SIZE,
                      filters
                    );
                    setCurrentSlidesCount(currentlSlidesCount + 1);
                  }
                }}
                className="w-full rounded-full bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 my-3 flex place-content-center"
              >
                <PiDotsThreeOutlineFill className="text-gray-400 h-6 w-8" />
              </div>
            )}
          </div>
        ) : loading ? (
          <MyLoading />
        ) : (
          <div className="flex justify-center">
            <p className="text-sm py-5">{t("NoOperations")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ItemTransaction({ date, amount, ps, id, status, type }) {
  return (
    <li className="flex px-1 md:px-3 border-b-1 md:border-b-2 py-3 font-bold text-center">
      <div className="flex w-3/12">
        <p className="w-full text-xs opacity-70 self-center md:pl-4 text-left">
          {getDateTimeFormated(date)}
        </p>
      </div>
      <div className="flex w-3/12">
        <p
          className={`w-full text-xs opacity-70 self-center px-1 md:px-4 ${
            type === "CREDIT" ? "text-green-600" : "text-red-600"
          }`}
        >
          {type === "CREDIT" ? "+" : "-"}
          {amount}
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
      <div className="flex w-4/12">
        <p className="w-full text-xs opacity-70 self-center px-1 md:px-4 break-all">
          {id}
        </p>
      </div>
      <div className="flex w-2/12 md:w-1/12 overflow-hidden place-content-center">
        {status === "success" ? (
          <IoCheckmarkDoneCircle className="w-5 h-5 md:h-8 md:w-8 self-center text-green-600" />
        ) : status === "failed" ? (
          <RiErrorWarningFill className="w-5 h-5 md:h-8 md:w-8 self-center text-red-600" />
        ) : (
          status === "pending" && (
            <RiErrorWarningFill className="w-5 h-5 md:h-8 md:w-8 self-center text-yellow-400" />
          )
        )}
      </div>
    </li>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: await loadMessages(locale),
    },
  };
}
