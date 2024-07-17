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
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosCloseCircleOutline,
  IoMdAdd,
  IoMdClose,
} from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { getNetworksCurrencies } from "../../../public/global_functions/coins";
import MyLoading from "../MyLoading";
import MyInput from "../utils/MyInput";
import screenIs from "@/screen";
import {
  createNewTemplate,
  deleteTemplateByTransferTemplateId,
  getAllTemplates,
} from "../../../public/global_functions/template";
import MyMessage from "../utils/MyMessage";
import { FaInfoCircle } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Templates() {
  const t_w = useTranslations("Words");
  const t = useTranslations("Templates");
  const t_placeholder = useTranslations("Placeholder");
  const [screenSize, setScreenSize] = useState(false);
  const router = useRouter();
  const { query } = router;
  const [coins, setCoins] = useState([]);
  const [networks, setNetworks] = useState([]);
  const [networkSelected, setNetworkSelected] = useState(null);
  const [coinSelected, setCoinSelected] = useState(null);
  const [loadingReqADD, setLoadingReqADD] = useState(false);
  const [loadingADD, setLoadingADD] = useState(false);
  const [loadingGET, setLoadingGET] = useState(true);
  const [loadingDELETE, setLoadingDELETE] = useState(false);
  const [resADD, setResADD] = useState({
    msg: { en: "", ar: "" },
    error: false,
    show: false,
  });
  const [resDELETE, setResDELETE] = useState({
    msg: { en: "", ar: "" },
    error: false,
    show: false,
  });
  const [itemDelete, setItemDelete] = useState(null);
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [address, setAddress] = useState("");
  const [nameTemplate, setNameTemplate] = useState("");
  const [data, setData] = useState([
    // {
    //   network: "TRON",
    //   symbol: "USDT",
    //   currencyName: "USDT",
    //   accounts: [
    //     { name: "Ali", address: "TKHQbDCENpkFqYjkACMnrQDzEonKqRG" },
    //     { name: "Ahmad", address: "TKHQbDCENpksFqjkACCNVMnrQDzEonKqRG" },
    //     { name: "Mouhammed", address: "TKHQbDCENpkFqYjkACNVMrQDzEonKqRG" },
    //     { name: "Monir", address: "TKHQbDCdENpkFqjkACCNVMnrQDzEonKqRG" },
    //   ],
    // },
    // {
    //   network: "POLYGON",
    //   symbol: "USDT",
    //   currencyName: "USDT",
    //   accounts: [
    //     { name: "Ali", address: "TKHQbDCENpkFqYjekACMnrQDzEonKqRG" },
    //     { name: "Ahmad", address: "TKHQbDdCENepkFqjkACCNVMnrQDzEonKqRG" },
    //     { name: "Mouhammed", address: "TKHQbDCeENpkFqYjkACNVMrQDzEonKqRG" },
    //     { name: "Monir", address: "TKHQbDCENpkFqjkdACCNVMnrQDzEeonKqRG" },
    //   ],
    // },
    // {
    //   network: "TRON",
    //   symbol: "TRX",
    //   currencyName: "TRX",
    //   accounts: [
    //     { name: "Ali", address: "TKHQbDeCENpkFqYjkACMnrQDzEonKqRG" },
    //     { name: "Ahmad", address: "TKHQbDCENpkFqjekAfCCNVMnrQDzEonKqRG" },
    //     { name: "Mouhammed", address: "TKsHQbDCENpkFqYjkACNVMrQDqzEonKqRG" },
    //     { name: "Monir", address: "TKHQbeDCEfNpkFqjkACCNVMnrQDzEonKqRG" },
    //   ],
    // },
    // {
    //   currencyName: "MATIC",
    //   network: "POLYGON",
    //   symbol: "MATIC",
    //   accounts: [
    //     { name: "Ali", address: "TKHQbDCEwNpkFqfYjkACMnrQDzEonKqRG" },
    //     { name: "Ahmad", address: "TKHQbDCENwpkFqjkACCNVMnrQDzEonKqRG" },
    //     { name: "Mouhammed", address: "TKHQbDCENpkFqYjkACNVMrQt4DzEonKqRG" },
    //     { name: "Monir", address: "TKHQsbDCENpkFqjkACCNV34MnrQDzEonKqRG" },
    //   ],
    // },
    // {
    //   currencyName: "BABELCOINS",
    //   network: "Account",
    //   symbol: "",
    //   accounts: [
    //     { name: "Alaa", address: "B1" },
    //     { name: "Alaa", address: "B2" },
    //     { name: "Alaa", address: "B3" },
    //     { name: "Alaa", address: "B4" },
    //     { name: "Alaa", address: "B5" },
    //   ],
    // },
  ]);
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

  const initFormTemplate = () => {
    setResADD({ error: false, show: false, msg: { en: "", ar: "" } });
    setAddress("");
    setNameTemplate("");
  };

  const isAddTemplateValid = () => {
    return coinSelected === "BABELCOINS"
      ? coinSelected && nameTemplate && address
      : coinSelected && networkSelected && nameTemplate && address;
  };

  const toggleAdd = async () => {
    if (showAddTemplate === true) {
      initFormTemplate();
    }

    setShowAddTemplate(!showAddTemplate);
    await router.replace({
      pathname: router.pathname,
      query: { tab: "templates", "add-template": !showAddTemplate },
    });
  };

  const addTemplate = async (currencyName, network, name, address) => {
    if (currencyName === "BABELCOINS") currencyName = "ANY";
    setResADD({ show: false, error: false, msg: { en: "", ar: "" } });
    try {
      setLoadingReqADD(true);
      const res = await createNewTemplate(currencyName, network, name, address);
      setResADD({ show: true, error: res.error, msg: res.msg });
      if (!res.error) {
        getTemplates();
      }
      setLoadingReqADD(false);
    } catch (err) {
      setLoadingReqADD(false);
      if (err?.response?.data !== undefined)
        setResADD({
          show: true,
          error: err?.response?.data.error,
          msg: err?.response?.data.msg,
        });
    }
  };

  const getTemplates = async () => {
    try {
      const res = await getAllTemplates();
      if (!res.error) {
        setData(res.data);
      }
      setLoadingGET(false);
    } catch (err) {
      setLoadingGET(false);
    }
  };

  const deleteTemplate = async (currencyName, network, transferTemplateId) => {
    setLoadingDELETE(true);
    try {
      const res = await deleteTemplateByTransferTemplateId(
        currencyName,
        network,
        transferTemplateId
      );
      setResDELETE({ msg: res.msg, error: res.error, show: true });
      setLoadingDELETE(false);
      onClose();
      if (!res.error) getTemplates();
    } catch (err) {
      if (err?.response?.data !== undefined)
        setResDELETE({
          show: true,
          error: err?.response?.data.error,
          msg: { en: err?.response?.data.msg, ar: "" },
        });
      setLoadingDELETE(false);
      onClose();
    }
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
    getTemplates();
    if (query["add-template"] === "true") {
      setLoadingADD(true);
      getNetworksCurrencies().then((result) => {
        if (!result.error) {
          const arr = [
            ...result.data,
            {
              _id: "babelcoins",
              networks: [],
              currencyName: "BABELCOINS",
              symbol: "",
              __v: 0,
            },
          ];
          setCoins(arr);
          if (sessionStorage.getItem("currencyData")) {
            const currencyData = JSON.parse(
              sessionStorage.getItem("currencyData")
            );
            let net = getNetworks(currencyData.name, arr);
            setNetworks(net);
            setCoinSelected(currencyData.name);
            setNetworkSelected(currencyData.network);
            setAddress(currencyData.address);
            sessionStorage.removeItem("currencyData");
          }
          toggleAdd();
        }
        setLoadingADD(false);
      });
    }
  }, []);

  return (
    <div
      className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white/55 dark:bg-default-100/55 backdrop-blur-md shadow-md`}
    >
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
                <span className="flex gap-3 text-lg text-gray-700 dark:text-gray-400">
                  <FaInfoCircle
                    className={`self-cente w-7 h-7 text-yellow-500`}
                  />
                  <p className="self-center text-xl">Delete Account</p>
                  {loadingDELETE && <Spinner size="sm" />}
                </span>
              </ModalHeader>
              <ModalBody>
                <p className={`w-fit m-auto`}>
                  Are you sure you want to delete this account?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={loadingDELETE}
                  color="primary"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  isDisabled={loadingDELETE}
                  color="danger"
                  variant="light"
                  onPress={() => {
                    deleteTemplate(
                      itemDelete.currencyName,
                      itemDelete.network,
                      itemDelete.transferTemplateId
                    );
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Title */}
      <div className="flex justify-between w-full border-b py-2">
        <h1 className="w-fit flex self-center font-bold">
          {t_w("Templates").toUpperCase()}
        </h1>
        <Button
          isDisabled={loadingADD}
          size="sm"
          className="w-24 md:w-28 border-2 border-primary rounded-lg text-primary text-sm backdrop-blur-md p-4"
          onClick={(e) => {
            if (coins.length > 0 || showAddTemplate) {
              toggleAdd();
            } else {
              if (showAddTemplate) {
                toggleAdd();
              }
              setLoadingADD(true);
              getNetworksCurrencies()
                .then((result) => {
                  if (!result.error) {
                    setCoins([
                      ...result.data,
                      {
                        _id: "babelcoins",
                        networks: [],
                        currencyName: "BABELCOINS",
                        symbol: "",
                        __v: 0,
                      },
                    ]);
                    toggleAdd();
                  }
                  setLoadingADD(false);
                })
                .catch((err) => {
                  setLoadingADD(false);
                });
            }
          }}
        >
          {showAddTemplate ? t_w("Close") : t_w("Add")}
          {showAddTemplate ? (
            <IoMdClose className="h-5 w-5 cursor-pointer" size={10} />
          ) : (
            <IoMdAdd className="h-5 w-5 cursor-pointer" size={10} />
          )}
        </Button>
      </div>

      {/* Content */}
      <div>
        {!loadingADD ? (
          showAddTemplate && (
            <div className="my-5 mx-1 md:mx-5 bg-slate-100/55 dark:bg-gray-600/55 p-2 rounded-md shadow-md py-4">
              <div className="flex justify-between border-b">
                <h1 className="text-lg w-fit ltr:pl-1 rtl:pr-1">
                  {t("AddTemplate")}
                </h1>
                <IoIosCloseCircleOutline
                  onClick={() => {
                    toggleAdd();
                  }}
                  className="h-6 w-6 cursor-pointer ltr:mr-1 ltr:md:mr-2 rtl:ml-1 rtl:md:ml-2"
                  size={10}
                />
              </div>
              <div className="mt-8 px-5">
                {/* System */}
                <div className="md:flex m-auto w-full gap-4 items-center">
                  <label className="text-right text-sm md:text-base w-36">
                    {t("ChooseSystem")}
                  </label>
                  <Select
                    dir="ltr"
                    disallowEmptySelection={true}
                    isDisabled={loadingADD}
                    selectedKeys={coinSelected ? [coinSelected] : []}
                    onChange={async (e) => {
                      setCoinSelected(e.target.value);
                      let net = getNetworks(e.target.value, coins);
                      setNetworks(net);
                      setNetworkSelected(net[0]);
                      initFormTemplate();
                    }}
                    aria-label="none"
                    style={{ backgroundColor: "inherit" }}
                    size="sm"
                    items={coins}
                    labelPlacement="outside"
                    placeholder={t("ChooseSystem").toUpperCase()}
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
                            src={
                              item.data.currencyName !== "BABELCOINS"
                                ? `/images/coins/${item.data.symbol}.png`
                                : "/images/logo/png/babelcoins-logo-64.png"
                            }
                          />
                          <div className="flex flex-col">
                            <span>{item.data.currencyName}</span>
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
                            src={
                              item.currencyName !== "BABELCOINS"
                                ? `/images/coins/${item.symbol}.png`
                                : "/images/logo/png/babelcoins-logo-64.png"
                            }
                          />
                          <div className="flex flex-col">
                            <span>{item["currencyName"]}</span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                </div>
                {/* Network */}
                {coinSelected !== "BABELCOINS" && (
                  <div className="md:flex m-auto w-full gap-4 items-center mt-4 md:mt-0">
                    <label className="block ltr:ml-1 ltr:md:ml-0 rtl:mr-1 rtl:md:mr-0 md:text-right text-sm md:text-base w-36 md:mt-3">
                      {t_w("Network")}
                    </label>
                    <Select
                      dir="ltr"
                      isDisabled={loadingADD || !coinSelected}
                      disallowEmptySelection={true}
                      items={networks}
                      selectedKeys={networkSelected ? [networkSelected] : []}
                      onChange={(e) => {
                        setNetworkSelected(e.target.value);
                        initFormTemplate();
                      }}
                      aria-label="none"
                      classNames={{
                        base: "mt-1 md:mt-3 max-w-sm peer w-36 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                        trigger: "h-8",
                      }}
                      size="sm"
                      style={{ backgroundColor: "inherit" }}
                      labelPlacement="outside-left"
                      selectorIcon={
                        <IoIosArrowDown color="var(--bg-primary-color)" />
                      }
                      placeholder={t_w("Network")}
                    >
                      {networks.map((network) => (
                        <SelectItem key={network} value={network}>
                          {network}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                )}
                {coinSelected && (
                  <div>
                    {/* Name Template */}
                    <div className={`m-auto w-full gap-4 items-center flex`}>
                      <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36 mt-3">
                        {t("TemplateName")}
                      </label>
                      <MyInput
                        value={nameTemplate}
                        onChange={(e) => {
                          setNameTemplate(e.target.value);
                        }}
                        color="border-gray-500"
                        className="w-full md:w-64 border-black mt-3"
                        item={{
                          label: screenSize ? undefined : t("TemplateName"),
                          name: "name_template",
                          type: "text",
                          placeholder: t_placeholder("Name"),
                        }}
                      />
                    </div>
                    {/* Address OR Account */}
                    <div className={`m-auto w-full gap-4 items-center flex`}>
                      <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36 mt-3">
                        {coinSelected === "BABELCOINS"
                          ? t_w("Account")
                          : t_w("Address")}
                      </label>
                      <MyInput
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        color="border-gray-500"
                        className="w-full md:w-64 border-black mt-3"
                        item={{
                          label: screenSize
                            ? undefined
                            : coinSelected === "BABELCOINS"
                            ? t_w("Account")
                            : t_w("Address"),
                          name: "address_account",
                          type: "text",
                          placeholder:
                            coinSelected === "BABELCOINS"
                              ? t("TypeAccountName") + " (B00)"
                              : t("TypeAddress"),
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="ltr:ml-6 ltr:md:ml-44 rtl:mr-6 rtl:md:mr-44">
                <MyMessage
                  show={resADD.show}
                  message={resADD.msg[router.locale]}
                  isSuccess={!resADD.error}
                />
              </div>
              <Button
                onClick={() => {
                  if (coinSelected === "BABELCOINS")
                    addTemplate(
                      coinSelected,
                      "BABELCOINS",
                      nameTemplate,
                      address
                    );
                  else
                    addTemplate(
                      coinSelected,
                      networkSelected,
                      nameTemplate,
                      address
                    );
                }}
                isDisabled={!isAddTemplateValid() || loadingReqADD}
                className="bg-orange text-white block m-auto mt-5 px-7 rounded-full uppercase"
              >
                {!loadingReqADD ? t("AddTemplate") : t_w("Adding")}
              </Button>
            </div>
          )
        ) : (
          <MyLoading />
        )}
        {resDELETE.show && (
          <MyMessage
            show={resDELETE.show}
            message={resDELETE.msg[router.locale]}
            isSuccess={resDELETE.error === false}
          />
        )}
        {!loadingGET ? (
          <ul className="mt-10">
            {data.map((item) => (
              <TemplateItem
                key={item._id}
                title={
                  item.currencyName === "ANY" ? "BABELCOINS" : item.currencyName
                }
                network={item.network}
                accounts={item.accounts}
                imgCoin={
                  item.currencyName === "ETHER"
                    ? "ETH"
                    : item.currencyName === "ANY"
                    ? "BABELCOINS"
                    : item.currencyName
                }
                onOpen={onOpen}
                setItemDelete={setItemDelete}
              />
            ))}
          </ul>
        ) : (
          <MyLoading />
        )}
      </div>
    </div>
  );
}

function TemplateItem({
  title,
  network,
  imgCoin,
  accounts,
  onOpen,
  setItemDelete,
}) {
  const [open, setOpen] = useState(false);
  if (accounts.length === 0) return <></>;
  return (
    <li className="p-1 md:p-3 mt-2 border-b-1 w-full md:w-3/4">
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center">
          <div className="relative">
            <Image
              className={`h-10 w-10 ${title === "BABELCOINS" ? "p-[2px]" : ""}`}
              src={
                title !== "BABELCOINS"
                  ? `/images/coins/${imgCoin}.png`
                  : "/images/logo/png/babelcoins-logo-64.png"
              }
              alt=""
              height={30}
              width={30}
            />
            {title !== "BABELCOINS" && (
              <Image
                className="absolute rounded-full h-4 w-4 bottom-0 right-0 border-1"
                src={`/images/networks/${network}.png`}
                alt=""
                height={30}
                width={30}
              />
            )}
          </div>

          <h1 className="text-lg ltr:ml-3 rtl:mr-3">
            {title + " (" + accounts.length + ")"}
          </h1>
        </div>
        {open ? (
          <IoIosArrowUp color="var(--bg-primary-color)" />
        ) : (
          <IoIosArrowDown color="var(--bg-primary-color)" />
        )}
      </div>
      {open && (
        <ul
          className="ltr:md:ml-2 rtl:md:mr-2 mt-4"
          style={{ direction: "ltr" }}
        >
          {accounts.map((account) => (
            <li
              key={account._id}
              className="border-1 rounded-md w-fit p-2 mt-2"
            >
              <div className="flex gap-1 justify-between mb-1">
                <div className="flex gap-1 items-center">
                  <span className="font-bold">Name:</span>
                  <span>{account.name}</span>
                </div>
                <IoCloseSharp
                  onClick={() => {
                    onOpen();
                    setItemDelete({
                      currencyName: title === "BABELCOINS" ? "ANY" : title,
                      network: network,
                      transferTemplateId: account._id,
                    });
                  }}
                  color="red"
                  className="rounded-full hover:bg-slate-400 p-1 w-6 h-6 cursor-pointer"
                />
              </div>

              <div className="flex gap-1">
                <label className="text-xs md:text-base font-bold">
                  {network + ":"}
                </label>
                <p className="text-xs md:text-base break-all">
                  {account.address}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
