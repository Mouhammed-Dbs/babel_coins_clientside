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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BiSolidError } from "react-icons/bi";
import MyInput from "@/components/utils/MyInput";
import screenIs from "@/screen";
import {
  getFeesByCoinNameAndNetwork,
  getNetworksCurrencies,
  getTransferLimitsByCoinNameAndNetwork,
  transferMoney,
} from "../../../public/global_functions/coins";
import MyLoading from "@/components/MyLoading";
import { validateAmount } from "../../../public/global_functions/validation";
import { data } from "autoprefixer";
import { CopyButton } from "@/components/utils/CopyButton";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import {
  getDateFormated,
  getTimeFormated,
} from "../../../public/global_functions/helpers";

export default function Send(props) {
  const router = useRouter();
  const { query } = router;
  const [mounted, setMount] = useState(false);
  const [templates, setTemplates] = useState(["b23523553", "b29523553"]);
  const [coins, setCoins] = useState([]);
  const [coinSelected, setCoinSelected] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [networkSelected, setNetworkSelected] = useState(null);
  const [fiatAccounts, setFiateAccounts] = useState(["USD", "EUR", "RUB"]);
  const [screenSize, setScreenSize] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fee, setFee] = useState(0);
  const [amount, setAmount] = useState("");
  const [limits, setLimits] = useState({});
  const [resData, setResData] = useState({
    error: false,
    msg: "",
    data: {
      transferType: "external",
      transferCurrencyType: "crypto",
      network: "TRON",
      currencyName: "USDT",
      senderId: "660839b814d4842df81b5bed",
      receiverAddress: "TEN4KrL95t6cSWZwb71gaiXj5ZbadJuT3o",
      amount: 5,
      fee: 4,
      status: "pending",
      dateOfTransfer: "2024-04-23T14:21:01.702Z",
      _id: "6627c3ceb5cf165c6bc2b017",
      __v: 0,
    },
  });
  const [msg, setMsg] = useState({ error: false, data: "" });
  const [address, setAddress] = useState(null);
  const [sendLoading, setSendLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const placeholdersAddresses = {
    TRON: "TEN4KrL95t6cSWZwb71gaiXj5ZbadJuT3o",
    POLYGON: "0x7200B957373F641Ad602DC6C0afcBBb43827120E",
    ETHEREUM: "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
    BITCOIN: "3b5a8f7a50caf07685b7026bb5ac8694f36a18246bce7494c7a9239a7674ae5a",
    BSC: "0x685B1ded8013785d6623CC18D214320b6Bb64759",
  };
  const sitesScan = {
    TRON: { title: "tronscan.org", url: "https://tronscan.org/#/address/" },
    POLYGON: {
      title: "polygonscan.com",
      url: "https://polygonscan.com/address/",
    },
    ETHEREUM: { title: "etherscan.io", url: "https://etherscan.io/address/" },
    BSC: { title: "bscscan.com", url: "https://bscscan.com/address/" },
  };
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const getNetworks = (coinSelected, coins) => {
    let coin = coins.filter((coin) => {
      if (coin.currencyName === coinSelected) {
        return coin;
      }
    });
    if (coin.length > 0) return coin[0].networks;
    return [];
  };
  const getFeesAndLimits = (
    transferCurrencyType,
    transferType,
    currencyName,
    network
  ) => {
    setLoading(true);
    Promise.all([
      getFeesByCoinNameAndNetwork(
        transferCurrencyType,
        transferType,
        currencyName,
        network
      ),
      getTransferLimitsByCoinNameAndNetwork(
        transferCurrencyType,
        transferType,
        currencyName,
        network
      ),
    ])
      .then(([fees, limits]) => {
        if (!fees.error) setFee(fees.data.fee);
        if (!limits.error) setLimits(limits.data);
        setLoading(false);
      })
      .catch(() => {
        console.log("Error getting fees and limits");
        setLoading(false);
      });
  };
  const isAmountValid = (currentAmount) => {
    if (
      currentAmount < limits.minInOneTime ||
      currentAmount > limits.maxInOneTime
    )
      return false;
    return true;
  };
  const isDataValid = () => {
    if (
      address &&
      isAmountValid(amount) &&
      address &&
      coinSelected &&
      networkSelected
    )
      return true;
    return false;
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
          setCoins(result.data);
          if (query["curr"]) {
            if (
              result.data.map((c) => c.currencyName).includes(query["curr"])
            ) {
              setCoinSelected(query["curr"]);
              let net = getNetworks(query["curr"], result.data);
              setNetworks(net);
              setNetworkSelected(net[0]);
              setPlaceholder(placeholdersAddresses[net[0]]);
              getFeesAndLimits("crypto", "external", query["curr"], net[0]);
            } else {
              router.replace({
                pathname: router.pathname,
                query: { curr: "USDT" },
              });
            }
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
        className={`text-black dark:text-white bg-white/55 dark:bg-default-100/55 backdrop-blur-md mt-24`}
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
                {resData.error && (
                  <span className="flex gap-3 text-lg text-gray-700 dark:text-gray-400">
                    <BiSolidError className="self-cente w-7 h-7 text-red-400" />
                    <p className="self-center text-xl">Sending failure</p>
                  </span>
                )}
                {!resData.error && (
                  <span className="flex gap-3 text-lg text-gray-700 dark:text-gray-400">
                    <FaInfoCircle
                      className={`self-cente w-7 h-7 ${
                        resData.data.status === "pending"
                          ? "text-yellow-500"
                          : ""
                      }`}
                    />
                    <p className="self-center text-xl">Sending Info</p>
                  </span>
                )}
              </ModalHeader>
              <ModalBody>
                {resData.error && (
                  <p className={`w-fit m-auto`}>{resData.msg}</p>
                )}
                {!resData.error && (
                  <div className="flex flex-col gap-1 md:gap-2 p-3 text-lg">
                    <div className="flex gap-2">
                      <p className="font-bold self-center">Coin:</p>
                      <p className="self-center">{resData.data.currencyName}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Network:</p>
                      <p className="">{resData.data.network}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Amount:</p>
                      <p className="">{resData.data.amount}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Fee:</p>
                      <p className="">{resData.data.fee}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">Receiver address:</p>
                      <p className="flex item-center text-sky-800 dark:text-sky-600 text-xs md:text-sm mb-[2px] border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md p-2 w-fit break-all">
                        {resData.data.receiverAddress}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">Operation ID:</p>
                      <p className="flex item-center text-sky-800 dark:text-sky-600 text-xs md:text-sm mb-[2px] border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md p-2 w-fit break-all">
                        {resData.data._id}
                        <CopyButton
                          className="self-center ml-2 text-primary hover:text-opacity-70"
                          copy={resData.data._id}
                        />
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Status:</p>
                      <p
                        className={
                          resData.data.status === "pending"
                            ? "text-yellow-500"
                            : ""
                        }
                      >
                        {resData.data.status.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Date & Time:</p>
                      <p className="">
                        {getDateFormated(resData.data.dateOfTransfer)}{" "}
                        {getTimeFormated(resData.data.dateOfTransfer)}
                      </p>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {resData.error && (
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                )}
                {!resData.error && (
                  <>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button className="text-white" color="primary">
                      <Link
                        className="flex items-center justify-center w-full h-full"
                        target="_blank"
                        href={
                          sitesScan[resData.data.network].url +
                          resData.data.receiverAddress
                        }
                      >
                        Go {sitesScan[resData.data.network].title}
                      </Link>
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="w-full md:w-[720px] lg:w-[950px] m-auto mt-4 pb-3">
        <div className="w-fit pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50/15 dark:bg-default-50/15 backdrop-blur-xs">
            TRANSFER
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]"></div>
        </div>
      </div>
      <div className="p-4 py-10 md:px-8 mt-6 md:m-auto md:mt-10 w-11/12 md:w-[720px] lg:w-[950px] md:text-center bg-white/55 dark:bg-default-100/55 rounded-lg shadow-md backdrop-blur-md">
        <div className="lg:flex lg:gap-10">
          <div className="lg:w-2/3 lg:ml-5">
            {/* System */}
            <div className="md:flex m-auto w-full gap-4 items-center">
              <label className="text-right text-sm md:text-base w-36">
                Choose system
              </label>
              <Select
                disallowEmptySelection={true}
                isDisabled={loading}
                selectedKeys={coinSelected ? [coinSelected] : []}
                onChange={async (e) => {
                  let net = getNetworks(e.target.value, coins);
                  setNetworks(net);
                  setNetworkSelected(net[0]);
                  setLoading(true);
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
                placeholder="CHOOSE SYSTEM"
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
                    <div className="flex gap-2 items-center">
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
            {/* Templates md:flex */}
            <div className="hidden m-auto w-full gap-4 items-center mt-3">
              <label className="text-right text-sm md:text-base w-36">
                Templates
              </label>
              <Select
                aria-label="none"
                style={{ backgroundColor: "inherit" }}
                size="sm"
                labelPlacement="outside"
                placeholder="CHOOSE TEMPLATE"
                selectorIcon={
                  <IoIosArrowDown color="var(--bg-primary-color)" />
                }
                classNames={{
                  base: "p-[2px] max-w-xs peer w-full md:w-64 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                  trigger: "h-7",
                }}
              >
                {templates.map((template) => (
                  <SelectItem key={template} value={template}>
                    {template}
                  </SelectItem>
                ))}
              </Select>
            </div>
            {/* Network */}
            <div className="md:flex m-auto w-full gap-4 items-center mt-3 md:mt-0">
              <label className="block ml-1 md:ml-0 md:text-right text-sm md:text-base w-36 md:mt-3">
                Network
              </label>
              <Select
                isDisabled={loading}
                disallowEmptySelection={true}
                items={networks}
                selectedKeys={networkSelected ? [networkSelected] : []}
                onChange={(e) => {
                  setPlaceholder(placeholdersAddresses[e.target.value]);
                  setNetworkSelected(e.target.value);
                  getFeesAndLimits(
                    "crypto",
                    "external",
                    query["curr"],
                    e.target.value
                  );
                }}
                aria-label="none"
                classNames={{
                  base: "mt-1 md:mt-3 max-w-xs min-w-32 peer w-28 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                  trigger: "h-8",
                }}
                size="sm"
                style={{ backgroundColor: "inherit" }}
                labelPlacement="outside-left"
                selectorIcon={
                  <IoIosArrowDown color="var(--bg-primary-color)" />
                }
                placeholder="network"
              >
                {networks.map((network) => (
                  <SelectItem key={network} value={network}>
                    {network}
                  </SelectItem>
                ))}
              </Select>
            </div>
            {/* Address */}
            <div className="flex m-auto w-full gap-4 items-center">
              <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36 mt-3">
                Address
              </label>
              <MyInput
                defaultValue={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                color="border-gray-500"
                className="w-full md:w-64 border-black mt-3"
                item={{
                  label: screenSize ? undefined : "Address",
                  name: "address",
                  type: "text",
                  placeholder: placeholder,
                }}
              />
            </div>
            {/* Account md:flex */}
            <div className="hidden m-auto w-full gap-4 items-center mt-3">
              <label className="hidden md:block text-right text-sm md:text-base w-36 mt-3">
                Account
              </label>
              <MyInput
                color="border-gray-500"
                className="w-full md:w-64 border-black mb-3 mt-6"
                item={{
                  label: screenSize ? undefined : "Account",
                  name: "account",
                  type: "text",
                  placeholder: "b0320320",
                }}
              />
            </div>
            {/* Comment md:flex*/}
            <div className="hidden m-auto w-full gap-4 items-center">
              <label className="hidden md:block text-right text-sm md:text-base w-36 mt-3">
                Comment
              </label>
              <MyInput
                color="border-gray-500"
                className="w-full md:w-64 border-black mb-3 mt-6"
                item={{
                  label: screenSize ? undefined : "Comment",
                  name: "comment",
                  type: "text",
                  placeholder: "",
                }}
              />
            </div>
            {/* Secret Code flex*/}
            <div className="hidden m-auto w-full md:gap-4 gap-2 items-center">
              <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36 mt-3">
                Secret Code
              </label>
              <MyInput
                color="border-gray-500"
                className="w-full md:w-48 border-black mb-3 mt-6"
                item={{
                  label: screenSize ? undefined : "Secret Code",
                  name: "secretcode",
                  type: "text",
                  placeholder: "Secret code",
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
                selectorIcon={
                  <IoIosArrowDown color="var(--bg-primary-color)" />
                }
                placeholder="USD"
              >
                {fiatAccounts.map((account) => (
                  <SelectItem key={account} value={account}>
                    {account}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {!loading ? (
              query["curr"] ? (
                <div>
                  {/* Amount */}
                  <div className="flex m-auto w-full md:gap-4 gap-2 items-end ">
                    <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36">
                      Amount
                    </label>
                    <MyInput
                      color="border-gray-500"
                      className="w-full md:w-48 border-black mt-3"
                      value={amount}
                      onChange={(e) => {
                        let value = validateAmount(e.target.value);
                        setAmount(value);
                        if (value) {
                          let currentAmount = parseFloat(value);
                          if (!isAmountValid(currentAmount)) {
                            setMsg({
                              error: true,
                              data: `The amount must be less than ${limits.minInOneTime} and greater than ${limits.maxInOneTime}`,
                            });
                          } else {
                            setMsg({
                              error: false,
                              data: "",
                            });
                          }
                        }
                      }}
                      item={{
                        label: screenSize ? undefined : "Amount",
                        name: "amount",
                        type: "text",
                        placeholder: "0",
                      }}
                    />
                    <p className="w-24 min-w-20 text-center mb-[1px] pt-[3px] h-[34px] bg-inherit border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md">
                      {coinSelected}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="flex m-auto w-full md:gap-4 gap-2 md:items-center items-end">
                    <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36 mt-3">
                      Total
                    </label>
                    <MyInput
                      value={amount.length > 0 ? parseFloat(amount) + fee : 0}
                      readOnly
                      color="border-gray-500"
                      className="w-full md:w-48 border-black mb-3 mt-3"
                      item={{
                        label: screenSize ? undefined : "Total",
                        name: "amount",
                        type: "text",
                        placeholder: "$0",
                      }}
                    />
                    <Select
                      aria-label="none"
                      classNames={{
                        base: "hidden max-w-xs min-w-20 peer mt-3 w-24 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                        trigger: "h-8",
                      }}
                      size="sm"
                      style={{ backgroundColor: "inherit" }}
                      labelPlacement="outside-left"
                      selectorIcon={
                        <IoIosArrowDown color="var(--bg-primary-color)" />
                      }
                      placeholder="USD"
                    >
                      {fiatAccounts.map((account) => (
                        <SelectItem key={account} value={account}>
                          {account}
                        </SelectItem>
                      ))}
                    </Select>
                    <p className="w-24 min-w-20 text-center mb-[13px] md:mb-[1px] pt-[3px] h-[34px] bg-inherit border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md">
                      {coinSelected}
                    </p>
                  </div>
                  {msg.error && (
                    <p
                      className={`w-fit m-auto lg:m-0 lg:ml-40 text-sm ${
                        msg.error ? "text-red-700" : "text-green-700"
                      }`}
                    >
                      {msg.data}
                    </p>
                  )}
                </div>
              ) : (
                ""
              )
            ) : (
              <MyLoading />
            )}
          </div>
          {!loading && query["curr"] ? (
            <div className="block w-full h-fit text-start border-l lg:border-l-2 pl-3 mt-4">
              <h1 className="font-bold text-sm">
                Transfer to BabelCoins Wallet
              </h1>
              <div className="my-4 text-xs">
                <p>{limits?.minInOneTime}</p>
                <p className="text-gray-400">Min. per transaction</p>
              </div>
              <div className="my-4 text-xs">
                <p>{limits?.maxInOneTime}</p>
                <p className="text-gray-400">Max. per transaction</p>
              </div>
              <div className="my-4 text-xs">
                <p>Instantly</p>
                <p className="text-gray-400">Transfer term</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="w-fit m-auto lg:m-0 lg:ml-44">
          <Button
            isDisabled={!isDataValid() || sendLoading}
            className="bg-orange text-white rounded-full mt-5 px-10"
            onClick={() => {
              if (isDataValid()) {
                setSendLoading(true);
                transferMoney(
                  "crypto",
                  "external",
                  coinSelected,
                  networkSelected,
                  address,
                  parseFloat(amount)
                )
                  .then((result) => {
                    setResData({
                      data: resData.data,
                      error: !result.error,
                      msg: result.msg,
                    });
                    setSendLoading(false);
                    onOpen();
                  })
                  .catch((err) => {
                    setResData({
                      error: err.response.data.error,
                      msg: err.response.data.msg,
                      data: {},
                    });
                    setSendLoading(false);
                  });
              } else {
                setSendLoading(false);
              }
            }}
          >
            {sendLoading ? "SENDING.." : "SEND"}
          </Button>
        </div>
      </div>
    </div>
  );
}
