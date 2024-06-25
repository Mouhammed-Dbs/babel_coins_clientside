import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { IoIosArrowDown } from "react-icons/io";
import MyInput from "@/components/utils/MyInput";
import screenIs from "@/screen";
import {
  exchange,
  getExchangeFee,
  getNetworksCurrencies,
} from "../../../public/global_functions/coins";
import MyLoading from "@/components/MyLoading";
import { validateAmount } from "../../../public/global_functions/validation";
import { loadMessages } from "@/lib/loadMessages";
import io from "socket.io-client";
import { BiSolidError } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";
import { getDateTimeFormated } from "../../../public/global_functions/helpers";
import { useTranslations } from "next-intl";

export default function Exchange() {
  const t_w = useTranslations("Words");
  const [mounted, setMount] = useState(false);
  const [debitAccounts, setDebitAccounts] = useState([]);
  const [creditAccounts, setCreditAccounts] = useState([]);
  const [creditSelected, setCreditSelected] = useState("USDT");
  const [debitSelected, setDebitSelected] = useState("TRX");
  const [screenSize, setScreenSize] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [exchLoading, setExchLoading] = useState(false);
  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [response, setResponse] = useState({ error: false, data: {} });
  const [fee, setFee] = useState(0);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const exchangeCoin = async (
    sellCurrencyName,
    buyCurrencyName,
    sellCurrencyAmount
  ) => {
    setExchLoading(true);
    const res = await exchange(
      sellCurrencyName,
      buyCurrencyName,
      sellCurrencyAmount
    );
    setExchLoading(false);
    setResponse(res);
    onOpen();
  };

  const getFee = async (sellCurrencyName, buyCurrencyName) => {
    const res = await getExchangeFee(sellCurrencyName, buyCurrencyName);
    if (!res.error) {
      setFee(res.data.fee);
      if (exchangeRate)
        setCredit(
          calculateCredit(
            debit,
            exchangeRate[sellCurrencyName][buyCurrencyName].rate
          )
        );
    }
  };

  const calculateCredit = (amount, rate) => {
    return (
      Number(amount) * Number(rate) -
      (Number(amount) * Number(rate) * fee) / 100
    );
  };

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
    getNetworksCurrencies()
      .then((result) => {
        if (result) {
          let data = result.data;
          data.sort((a, b) =>
            a.currencyName[0].localeCompare(b.currencyName[0])
          );
          setCreditAccounts(data);
          setDebitAccounts(data);
          getFee("TRX", "USDT");
        }
        setPageLoading(false);
      })
      .catch((err) => {
        setPageLoading(false);
      });
  }, []);

  // Socket.IO connection
  useEffect(() => {
    const socket = io(process.env.BASE_API_URL, {
      transports: ["polling"],
    });
    socket.on("connect", () => {
      console.log("Socket.IO connected");
    });

    socket.on("change currency rates", (data) => {
      setExchangeRate(data);
      setCredit(
        calculateCredit(debit, data[debitSelected][creditSelected].rate)
      );
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
      <Modal
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        className="border-t-2 border-gray-400"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {response.error && (
                  <span className="flex gap-3 text-lg text-gray-700 dark:text-gray-400 w-full pr-4">
                    <BiSolidError className="self-cente w-7 h-7 text-red-400" />
                    <p className="self-center text-xl">Error</p>
                  </span>
                )}
                {!response.error && (
                  <span className="flex gap-3 text-lg text-gray-700 dark:text-gray-400 w-full pr-4">
                    <FaInfoCircle className={`self-cente w-7 h-7`} />
                    <p className="self-center text-xl">Info</p>
                  </span>
                )}
              </ModalHeader>
              <ModalBody>
                {response.error && (
                  <p className={`w-fit m-auto`}>{response.msg}</p>
                )}
                {!response.error && (
                  <div className="flex flex-col gap-1 md:gap-2 p-3 text-lg">
                    <div className="flex gap-2">
                      <p className="font-bold self-center">Sell Currency:</p>
                      <p className="self-center">
                        {response.data?.sellCurrencyName}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Buy Currency:</p>
                      <p className="">{response.data?.buyCurrencyName}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Sell Amount:</p>
                      <p className="">{response.data?.sellCurrencyAmount}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Buy Amount:</p>
                      <p className="">{response.data?.buyCurrencyAmount}</p>
                    </div>

                    <div className="flex gap-2">
                      <p className="font-bold">Rate:</p>
                      <p className="">{response.data?.rate}</p>
                    </div>

                    <div className="flex gap-2">
                      <p className="font-bold"> Status:</p>
                      <p
                        className={
                          response.data?.status === "success"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {response.data.status?.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Date & Time:</p>
                      <p className="">
                        {getDateTimeFormated(response.data?.dateOfExchange)}
                      </p>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t_w("Close")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="w-full md:w-[720px] lg:w-[950px] m-auto mt-4 pb-3">
        <div className="w-fit pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50/15 dark:bg-default-50/15 backdrop-blur-xs">
            EXCHANGE
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]"></div>
        </div>
      </div>
      <div className="p-4 py-10 md:px-8 mt-6 md:m-auto md:mt-10 w-11/12 md:w-[720px] lg:w-[950px] md:text-center bg-white/55 dark:bg-default-100/55 rounded-lg shadow-md backdrop-blur-md">
        <div className="lg:flex lg:gap-10">
          <div className="lg:w-2/3 lg:ml-5">
            {/* Debit Account */}
            <div className="md:flex m-auto w-full gap-4 items-center">
              <label className="text-right text-sm md:text-base w-36">
                Select account
              </label>
              <Select
                selectedKeys={[debitSelected]}
                defaultSelectedKeys={[debitSelected]}
                disallowEmptySelection={true}
                onChange={(e) => {
                  if (
                    e.target.value === creditSelected &&
                    e.target.value !== "USDT"
                  ) {
                    setCreditSelected("USDT");
                    setCredit(
                      calculateCredit(
                        debit,
                        exchangeRate[e.target.value]["USDT"].rate
                      )
                    );
                    getFee(e.target.value, "USDT");
                  } else if (
                    e.target.value === creditSelected &&
                    e.target.value === "USDT"
                  ) {
                    setCreditSelected("TRX");
                    setCredit(
                      calculateCredit(
                        debit,
                        exchangeRate[e.target.value]["TRX"].rate
                      )
                    );
                    getFee(e.target.value, "TRX");
                  } else {
                    getFee(e.target.value, creditSelected);
                    setCredit(
                      calculateCredit(
                        debit,
                        exchangeRate[e.target.value][creditSelected].rate
                      )
                    );
                  }
                  setDebitSelected(e.target.value);
                }}
                aria-label="none"
                style={{ backgroundColor: "inherit" }}
                size="sm"
                items={debitAccounts}
                labelPlacement="outside"
                placeholder="CHOOSE ACCOUNT"
                selectorIcon={
                  <IoIosArrowDown color="var(--bg-primary-color)" />
                }
                classNames={{
                  base: "p-[2px] max-w-xs peer w-full md:w-64 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                  trigger: "h-6",
                }}
                renderValue={(items) => {
                  return items.map((item) => (
                    <div
                      key={item.data.currencyName}
                      className={`flex items-center gap-2`}
                    >
                      <Avatar
                        ImgComponent="img"
                        alt={item.data.currencyName}
                        className="flex-shrink-0 h-6 w-6"
                        size="sm"
                        src={`/images/coins/${item.data.symbol}.png`}
                      />
                      <div className="flex flex-col">
                        <span>{item.data.currencyName}</span>
                        <span className="text-default-500 text-tiny">
                          {item.data.networks.join(" | ").slice(0, 20)}
                          {item.data.networks.join(" | ").length >= 20
                            ? "..."
                            : ""}
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
                    <div className={`flex gap-2 items-center`}>
                      <Avatar
                        ImgComponent="img"
                        alt={item["currencyName"]}
                        className="flex-shrink-0 h-6 w-6"
                        size="sm"
                        src={`/images/coins/${item["symbol"]}.png`}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">
                          {item["currencyName"]}
                        </span>
                        <span className="text-tiny text-default-400">
                          {item["networks"].join(" | ")}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </div>
            {/* Credit Account */}
            <div className="md:flex m-auto w-full gap-4 items-center mt-4">
              <label className="text-right text-sm md:text-base w-36">
                Select account
              </label>
              <Select
                selectedKeys={[creditSelected]}
                defaultSelectedKeys={[creditSelected]}
                disallowEmptySelection={true}
                onChange={(e) => {
                  if (
                    e.target.value === debitSelected &&
                    e.target.value !== "USDT"
                  ) {
                    setDebitSelected("USDT");
                    setCredit(
                      calculateCredit(
                        debit,
                        exchangeRate["USDT"][e.target.value].rate
                      )
                    );
                    getFee("USDT", e.target.value);
                  } else if (
                    e.target.value === debitSelected &&
                    e.target.value === "USDT"
                  ) {
                    setDebitSelected("TRX");
                    setCredit(
                      calculateCredit(
                        debit,
                        exchangeRate["TRX"][e.target.value].rate
                      )
                    );
                    getFee("TRX", e.target.value);
                  } else {
                    setCredit(
                      calculateCredit(
                        debit,
                        exchangeRate[debitSelected][e.target.value].rate
                      )
                    );
                    getFee(debitSelected, e.target.value);
                  }
                  setCreditSelected(e.target.value);
                }}
                aria-label="none"
                style={{ backgroundColor: "inherit" }}
                size="sm"
                items={creditAccounts}
                labelPlacement="outside"
                placeholder="CHOOSE ACCOUNT"
                selectorIcon={
                  <IoIosArrowDown color="var(--bg-primary-color)" />
                }
                classNames={{
                  base: "p-[2px] max-w-xs peer w-full md:w-64 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                  trigger: "h-6",
                }}
                renderValue={(items) => {
                  return items.map((item) => (
                    <div
                      key={item.data.currencyName}
                      className={`flex items-center gap-2`}
                    >
                      <Avatar
                        ImgComponent="img"
                        alt={item.data.currencyName}
                        className="flex-shrink-0 h-6 w-6"
                        size="sm"
                        src={`/images/coins/${item.data.symbol}.png`}
                      />
                      <div className="flex flex-col">
                        <span>{item.data.currencyName}</span>
                        <span className="text-default-500 text-tiny">
                          {item.data.networks.join(" | ").slice(0, 20)}
                          {item.data.networks.join(" | ").length >= 20
                            ? "..."
                            : ""}
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
                    <div className={`flex gap-2 items-center`}>
                      <Avatar
                        ImgComponent="img"
                        alt={item["currencyName"]}
                        className="flex-shrink-0 h-6 w-6"
                        size="sm"
                        src={`/images/coins/${item["symbol"]}.png`}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">
                          {item["currencyName"]}
                        </span>
                        <span className="text-tiny text-default-400">
                          {item["networks"].join(" | ")}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </div>
            {/* Debit */}
            <div className="flex m-auto w-full md:gap-4 gap-2 items-end mt-2">
              <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36 mb-1">
                Debit
              </label>
              <MyInput
                color="border-gray-500"
                className="w-36 border-black mt-3"
                value={debit}
                onChange={(e) => {
                  let value = validateAmount(e.target.value);
                  setDebit(value);
                  setCredit(
                    calculateCredit(
                      e.target.value,
                      exchangeRate[debitSelected][creditSelected].rate
                    )
                  );
                }}
                item={{
                  label: screenSize ? undefined : "Debit",
                  name: "Debit",
                  type: "number",
                  placeholder: "0",
                }}
              />
            </div>
            {/* Rate */}
            <div className="flex m-auto w-full md:gap-4 gap-2 items-center mt-4">
              <label className="block text-left md:text-right text-sm md:text-base w-14 md:w-36 ">
                Rate{!screenSize ? " :" : null}
              </label>
              <p className="text-red-500 text-sm md:text-base">
                {exchangeRate
                  ? exchangeRate[debitSelected][creditSelected].rate
                  : 0}
              </p>
            </div>
            {/* Credit */}
            <div className="flex m-auto w-full md:gap-4 gap-2 md:items-center items-end">
              <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36">
                Credit
              </label>
              <MyInput
                color="border-gray-500"
                className="w-36 border-black mb-3 mt-3"
                value={credit}
                onChange={(e) => {
                  let value = validateAmount(e.target.value);
                  setCredit(value);
                  setDebit(
                    Number(e.target.value) /
                      Number(exchangeRate[debitSelected][creditSelected].rate)
                  );
                }}
                item={{
                  label: screenSize ? undefined : "Total",
                  name: "amount",
                  type: "number",
                  placeholder: "0",
                }}
              />
            </div>
          </div>
          <div className="block w-full h-fit text-start border-l lg:border-l-2 pl-3 mt-4">
            <h1 className="font-bold text-sm">
              Money exchange to BABELCOINS Wallet
            </h1>
            <div className="my-4 text-xs">
              <p>Instantly</p>
              <p className="text-gray-400">Transfer term</p>
            </div>

            <div className="my-4 text-xs">
              <p>
                Сurrency is exchanged on the currency exchange market in live
                mode.
              </p>
              <p className="text-gray-400">Floating exchange rate</p>
            </div>
          </div>
        </div>

        <div className="w-fit m-auto lg:m-0 lg:ml-44">
          <Button
            isDisabled={!debit || exchLoading}
            className="bg-orange text-white rounded-full mt-5 px-8"
            onClick={() => {
              exchangeCoin(debitSelected, creditSelected, Number(debit));
            }}
          >
            {exchLoading ? "EXCHANGING" : "EXCHANGE"}
          </Button>
        </div>
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
