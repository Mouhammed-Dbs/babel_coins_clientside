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
  getBalanceCoins,
  getFeesByCoinNameAndNetwork,
  getTransferLimitsByCoinNameAndNetwork,
  transferMoney,
} from "../../../public/global_functions/coins";
import MyLoading from "@/components/MyLoading";
import { validateAmount } from "../../../public/global_functions/validation";
import { CopyButton } from "@/components/utils/CopyButton";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import { getDateTimeFormated } from "../../../public/global_functions/helpers";
import { getAllTemplates } from "../../../public/global_functions/template";

export default function Send(props) {
  const router = useRouter();
  const { query } = router;
  const [mounted, setMount] = useState(false);
  const [transferType, setTransferType] = useState("external");
  const [coins, setCoins] = useState([]);
  const [coinSelected, setCoinSelected] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [networkSelected, setNetworkSelected] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [templatesAccount, setTemplatesAccount] = useState([]);
  const [templatesAddress, setTemplatesAddress] = useState([]);
  const [templateSelected, setTemplateSelected] = useState(null);
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
    data: {},
  });
  const [msg, setMsg] = useState({ error: false, data: "" });
  const [address, setAddress] = useState("");
  const [account, setAccount] = useState("B");
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
    if (coin.length > 0) return coin[0].network.split(",");
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
    if (transferType === "external")
      if (isAmountValid(amount) && address && coinSelected && networkSelected)
        return true;
    if (transferType === "internal")
      if (
        isAmountValid(amount) &&
        account.length > 1 &&
        coinSelected &&
        networkSelected
      )
        return true;
    return false;
  };

  const initForTemplate = () => {
    setTemplateSelected(null);
    setAccount("B");
    setAddress("");
  };

  const isAddressORAccountInTemplates = (address, account) => {
    if (transferType === "external" && address.length === 0) return false;
    if (transferType === "internal" && account.length === 1) return false;
    if (templatesAddress.filter((item) => item.address === address).length > 0)
      return false;
    else if (
      templatesAccount.filter((item) => item.address === account).length > 0
    )
      return false;
    return true;
  };

  const getTemplateByCurrencyNameAndNetwork = (
    templates,
    transferType,
    currencyName = null,
    network = null
  ) => {
    if (transferType === "external")
      return templates
        .filter(
          (item) =>
            item.currencyName === currencyName && item.network === network
        )
        .flatMap((item) => item.accounts);
    return templates
      .filter((item) => item.currencyName === "ANY")
      .flatMap((item) => item.accounts);
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
    getAllTemplates()
      .then((resTemplates) => {
        setTemplates(resTemplates.data);
        getBalanceCoins()
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
                  getFeesAndLimits(
                    "crypto",
                    transferType,
                    query["curr"],
                    net[0]
                  );
                  setTemplatesAccount(
                    getTemplateByCurrencyNameAndNetwork(
                      resTemplates.data,
                      "internal"
                    )
                  );
                  setTemplatesAddress(
                    getTemplateByCurrencyNameAndNetwork(
                      resTemplates.data,
                      "external",
                      query["curr"],
                      net[0]
                    )
                  );
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
                        resData.data?.status === "pending"
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
                      <p className="self-center">
                        {resData.data?.currencyName}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Network:</p>
                      <p className="">{resData.data?.network}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Amount:</p>
                      <p className="">{resData.data?.amount}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Fee:</p>
                      <p className="">{resData.data?.fee}</p>
                    </div>
                    {resData.data.transferType === "external" ? (
                      <div className="flex flex-col gap-1">
                        <p className="font-bold">Receiver address:</p>
                        <p className="flex item-center text-sky-800 dark:text-sky-600 text-xs md:text-sm mb-[2px] border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md p-2 w-fit break-all">
                          {resData.data?.receiverAddress}
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <p className="font-bold">Receiver Account Name:</p>
                        <p className="">{resData.data?.receiverAccountName}</p>
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">Operation ID:</p>
                      <p className="flex item-center text-sky-800 dark:text-sky-600 text-xs md:text-sm mb-[2px] border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md p-2 w-fit break-all">
                        {resData.data?._id}
                        <CopyButton
                          className="self-center ml-2 text-primary hover:text-opacity-70"
                          copy={resData.data?._id}
                        />
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Status:</p>
                      <p
                        className={
                          resData.data?.status === "pending"
                            ? "text-yellow-500"
                            : ""
                        }
                      >
                        {resData.data.status?.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-bold">Date & Time:</p>
                      <p className="">
                        {getDateTimeFormated(resData.data?.dateOfTransfer)}
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
                    {resData.data.transferType === "external" && (
                      <Button className="text-white" color="primary">
                        <Link
                          className="flex items-center justify-center w-full h-full"
                          target="_blank"
                          href={
                            sitesScan[resData.data?.network]
                              ? sitesScan[resData.data?.network]?.url +
                                resData.data?.receiverAddress
                              : ""
                          }
                        >
                          Go {sitesScan[resData.data?.network]?.title}
                        </Link>
                      </Button>
                    )}
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
          <div className="lg:w-2/3 lg:ml-5 flex flex-col gap-1 md:gap-4">
            {/* System */}
            <div className="md:flex m-auto w-full gap-4 items-center">
              <label className="text-right text-sm md:text-base w-36">
                Choose system
              </label>
              <Select
                dir="ltr"
                disallowEmptySelection={true}
                isDisabled={loading}
                selectedKeys={coinSelected ? [coinSelected] : []}
                onChange={async (e) => {
                  let net = getNetworks(e.target.value, coins);
                  setNetworks(net);
                  setNetworkSelected(net[0]);
                  setTemplatesAddress(
                    templates,
                    transferType,
                    e.target.value,
                    net[0]
                  );
                  initForTemplate();
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
                  trigger: "h-8",
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
                        <span>{item.data.validDepositeBalance}</span>
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
                        className="flex-shrink-0 h-6 w-6"
                        size="sm"
                        src={`/images/coins/${item["symbol"]}.png`}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">
                          {item.validDepositeBalance}
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
            {/* Network */}
            <div className="md:flex m-auto w-full gap-4 items-center mt-4 md:mt-0">
              <label className="block ml-1 md:ml-0 md:text-right text-sm md:text-base w-36 md:mt-3">
                Network
              </label>
              <Select
                dir="ltr"
                isDisabled={loading || !coinSelected}
                disallowEmptySelection={true}
                items={networks}
                selectedKeys={networkSelected ? [networkSelected] : []}
                onChange={(e) => {
                  setPlaceholder(placeholdersAddresses[e.target.value]);
                  setNetworkSelected(e.target.value);
                  setTemplatesAddress(
                    getTemplateByCurrencyNameAndNetwork(
                      templates,
                      transferType,
                      coinSelected,
                      e.target.value
                    )
                  );
                  initForTemplate();
                  getFeesAndLimits(
                    "crypto",
                    transferType,
                    query["curr"],
                    e.target.value
                  );
                }}
                aria-label="none"
                classNames={{
                  base: "mt-1 md:mt-3 max-w-sm min-w-32 peer w-36 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
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
            {/* Type Transfer */}
            <div className="md:flex m-auto w-full gap-4 items-center mt-4">
              <label className="block ml-1 md:ml-0 md:text-right text-base w-36">
                Transfer type
              </label>
              <div className="flex gap-4 mt-1 md:mt-0 pl-2 md:pl-0 text-sm">
                <div className="flex gap-1">
                  <input
                    defaultChecked
                    onChange={() => {
                      setTemplatesAddress(
                        getTemplateByCurrencyNameAndNetwork(
                          templates,
                          "external",
                          coinSelected,
                          networkSelected
                        )
                      );
                      initForTemplate();
                      setTransferType("external");
                      getFeesAndLimits(
                        "crypto",
                        "external",
                        query["curr"],
                        networkSelected
                      );
                    }}
                    id="external_transfer"
                    className="accent-primary"
                    name="transfer"
                    type="radio"
                  />
                  <label htmlFor="external_transfer">External</label>
                </div>
                <div className="flex gap-1">
                  <input
                    onChange={() => {
                      setTemplatesAccount(
                        getTemplateByCurrencyNameAndNetwork(
                          templates,
                          "internal"
                        )
                      );
                      initForTemplate();
                      setTransferType("internal");
                      getFeesAndLimits(
                        "crypto",
                        "internal",
                        query["curr"],
                        networkSelected
                      );
                    }}
                    id="internal_transfer"
                    name="transfer"
                    type="radio"
                    className="accent-primary"
                  />
                  <label htmlFor="internal_transfer">Internal</label>
                </div>
              </div>
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
                dir="ltr"
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
                <>
                  {/* Templates */}
                  {((templatesAccount.length > 0 &&
                    transferType === "internal") ||
                    (templatesAddress.length > 0 &&
                      transferType === "external")) && (
                    <div
                      className={`${
                        coinSelected && networkSelected ? "md:flex" : "hidden"
                      } m-auto w-full gap-4 items-center mt-2`}
                    >
                      <label className="text-right text-sm md:text-base w-36">
                        Templates
                      </label>
                      <Select
                        dir="ltr"
                        onChange={(e) => {
                          if (e.target.value.length > 0) {
                            setTemplateSelected(e.target.value);
                            transferType === "external"
                              ? setAddress(e.target.value)
                              : setAccount(e.target.value);
                          } else {
                            transferType === "external"
                              ? setAddress("")
                              : setAccount("B");

                            setTemplateSelected(null);
                          }
                        }}
                        selectedKeys={
                          templateSelected ? [templateSelected] : []
                        }
                        isDisabled={
                          loading || !(coinSelected && networkSelected)
                        }
                        items={
                          transferType === "external"
                            ? templatesAddress
                            : templatesAccount
                        }
                        style={{ backgroundColor: "inherit" }}
                        aria-label="none"
                        size="sm"
                        labelPlacement="outside"
                        placeholder="CHOOSE TEMPLATE"
                        selectorIcon={
                          <IoIosArrowDown color="var(--bg-primary-color)" />
                        }
                        classNames={{
                          base: "p-[2px] peer w-full md:w-64 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                          trigger: "h-8",
                        }}
                        renderValue={(items) => {
                          return items.map((item) => {
                            return (
                              <div
                                key={item.data.address}
                                className="flex flex-col"
                              >
                                <span>{item.data.name}</span>
                                <span className="text-default-500 text-tiny">
                                  {item.data.address}
                                </span>
                              </div>
                            );
                          });
                        }}
                      >
                        {(item) => (
                          <SelectItem
                            key={item.address}
                            textValue={item.address}
                          >
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                              <span className="text-default-500 text-tiny">
                                {item.address}
                              </span>
                            </div>
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  )}
                  <div className="flex flex-col">
                    {/* Address */}
                    <div
                      className={`m-auto w-full gap-4 items-center ${
                        transferType === "external" && coinSelected
                          ? "flex "
                          : "hidden"
                      }`}
                    >
                      <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36 mt-3">
                        Address
                      </label>
                      <MyInput
                        // readOnly={templateSelected}
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          if (
                            !isAddressORAccountInTemplates(
                              e.target.value,
                              account
                            )
                          ) {
                            setTemplateSelected(e.target.value);
                          } else {
                            setTemplateSelected(null);
                          }
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
                    {/* Account */}
                    <div
                      className={`m-auto w-full gap-4 items-center ${
                        transferType === "internal" && coinSelected
                          ? "md:flex"
                          : "hidden"
                      }`}
                    >
                      <label className="hidden md:block text-right text-sm md:text-base w-36 mt-3">
                        Account
                      </label>
                      <MyInput
                        id="account_id"
                        // readOnly={templateSelected}
                        value={account}
                        onChange={(e) => {
                          if (e.target.value.length >= 1) {
                            setAccount(e.target.value);
                            if (
                              !isAddressORAccountInTemplates(
                                address,
                                e.target.value
                              ) &&
                              e.target.value.length > 1
                            ) {
                              setTemplateSelected(e.target.value);
                            } else {
                              setTemplateSelected(null);
                            }
                          }
                        }}
                        color="border-gray-500"
                        className="w-full md:w-64 border-black mt-3"
                        item={{
                          label: screenSize ? undefined : "Account",
                          name: "account",
                          type: "text",
                          placeholder: "B000000",
                        }}
                      />
                    </div>
                    {isAddressORAccountInTemplates(address, account) && (
                      <Link
                        onClick={() => {
                          sessionStorage.setItem(
                            "currencyData",
                            JSON.stringify({
                              name:
                                transferType === "external"
                                  ? coinSelected
                                  : "BABELCOINS",
                              network:
                                transferType === "external"
                                  ? networkSelected
                                  : [],
                              address:
                                transferType === "external" ? address : account,
                            })
                          );
                        }}
                        className="text-secondary text-xs text-start pl-2 mt-1 md:ml-40"
                        href="/account/settings?tab=templates&add-template=true"
                      >
                        Add
                        {transferType === "external"
                          ? " address "
                          : " account "}
                        to templates?
                      </Link>
                    )}
                  </div>
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
                        dir="ltr"
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
                </>
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

        <div className="w-fit m-auto lg:m-0 lg:ml-44 mt-4">
          <Button
            isDisabled={!isDataValid() || sendLoading}
            className="bg-orange text-white rounded-full mt-5 px-10"
            onClick={() => {
              if (isDataValid()) {
                setSendLoading(true);
                transferMoney(
                  "crypto",
                  transferType,
                  coinSelected,
                  networkSelected,
                  address,
                  account,
                  parseFloat(amount)
                )
                  .then((result) => {
                    setResData({
                      data: result.data,
                      error: result.error,
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
