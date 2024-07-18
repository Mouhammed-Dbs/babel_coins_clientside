import { Button, Select, SelectItem } from "@nextui-org/react";
import { IoIosArrowDown } from "react-icons/io";
import MyInput from "../utils/MyInput";
import MyLoading from "../MyLoading";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  changeNotificationsSettings,
  getSecurityOrNotificationsSettings,
} from "../../../public/global_functions/auth";
import MyMessage from "../utils/MyMessage";
import { useRouter } from "next/router";

export default function Notifications() {
  const router = useRouter();
  const t_w = useTranslations("Words");
  const t = useTranslations("Notifications");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [
    isSendingMsgOnSuccessfulAuthorization,
    setIsSendingMsgOnSuccessfulAuthorization,
  ] = useState(false);
  const [
    methodOfSendingNotificationOnIncomingPayment,
    setMethodOfSendingNotificationOnIncomingPayment,
  ] = useState("email");
  const [
    minimumAmountForSendingNotification,
    setMinimumAmountForSendingNotification,
  ] = useState(0);
  const [initialState, setInitialState] = useState({
    isSendingMsgOnSuccessfulAuthorization: false,
    methodOfSendingNotificationOnIncomingPayment: "email",
    minimumAmountForSendingNotification: "never",
  });
  const [resUpdate, setResUpdate] = useState({
    msg: "",
    error: false,
    show: false,
  });

  const hasChanges = () => {
    return (
      isSendingMsgOnSuccessfulAuthorization !==
        initialState.isSendingMsgOnSuccessfulAuthorization ||
      methodOfSendingNotificationOnIncomingPayment !==
        initialState.methodOfSendingNotificationOnIncomingPayment ||
      minimumAmountForSendingNotification !==
        initialState.minimumAmountForSendingNotification
    );
  };

  const getData = async () => {
    const res = await getSecurityOrNotificationsSettings("notifications");
    setPageLoading(false);
    if (!res?.error) {
      setIsDataLoaded(true);
      setIsSendingMsgOnSuccessfulAuthorization(
        res.data.authentication.isSendingMsgOnSuccessfulAuthorization
      );
      setMethodOfSendingNotificationOnIncomingPayment(
        res.data.internalTransfers.methodOfSendingNotificationOnIncomingPayment
      );
      setMinimumAmountForSendingNotification(
        res.data.internalTransfers.minimumAmountForSendingNotification
      );
      setInitialState({
        isSendingMsgOnSuccessfulAuthorization:
          res.data.authentication.isSendingMsgOnSuccessfulAuthorization,
        methodOfSendingNotificationOnIncomingPayment:
          res.data.internalTransfers
            .methodOfSendingNotificationOnIncomingPayment,
        minimumAmountForSendingNotification:
          res.data.internalTransfers.minimumAmountForSendingNotification,
      });
    }
  };

  const updateData = async () => {
    setUpdateLoading(true);
    const res = await changeNotificationsSettings(
      isSendingMsgOnSuccessfulAuthorization === "enabled",
      methodOfSendingNotificationOnIncomingPayment,
      Number(minimumAmountForSendingNotification),
      false
    );
    setUpdateLoading(false);
    setResUpdate({ error: res.error, msg: res.msg, show: true });
    if (!res?.error) {
      setInitialState({
        isSendingMsgOnSuccessfulAuthorization,
        methodOfSendingNotificationOnIncomingPayment,
        minimumAmountForSendingNotification,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (pageLoading)
    return (
      <MyLoading
        msg={t_w("Loading")}
        color="primary"
        className={`text-black dark:text-white bg-white/55 dark:bg-default-100/55 backdrop-blur-md mt-24`}
      />
    );

  if (!isDataLoaded)
    return (
      <div className="text-red-500 font-bold bg-white/55 dark:bg-default-100/55 backdrop-blur-md py-10 px-16 w-fit m-auto mt-10 rounded-md">
        <p className="text-lg text-center">{t_w("ErrorGettingData")}</p>
      </div>
    );
  return (
    <div
      className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white/55 dark:bg-default-100/55 backdrop-blur-md shadow-md`}
    >
      {/* Title 1 */}
      <div className="w-full border-b">
        <h1 className="text-sm mb-3 font-bold">{t("Authentication")}</h1>
      </div>

      {/* Content 1 */}
      <div className="mt-10">
        <label className="text-right text-sm md:text-base w-fit">
          {t("NotificationOfSuccessfulAuthorization") + ":"}
        </label>
        <Select
          dir="ltr"
          defaultSelectedKeys={["disabled"]}
          selectedKeys={
            isSendingMsgOnSuccessfulAuthorization ? ["enabled"] : ["disabled"]
          }
          onChange={(e) => {
            setIsSendingMsgOnSuccessfulAuthorization(
              e.target.value === "enabled" ? true : false
            );
          }}
          disallowEmptySelection={true}
          aria-label="none"
          style={{ backgroundColor: "inherit" }}
          size="sm"
          labelPlacement="outside"
          selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
          classNames={{
            base: "p-[2px] max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
            trigger: "h-7",
          }}
        >
          <SelectItem key="enabled" value="enabled">
            {t_w("Enabled")}
          </SelectItem>
          <SelectItem key="disabled" value="disabled">
            {t_w("Disabled")}
          </SelectItem>
        </Select>
      </div>

      {/* Title 2 */}
      <div className="w-full border-b mt-9">
        <h1 className="text-sm mb-3 font-bold">{t("InternalTransfers")}</h1>
      </div>

      {/* Content 2 */}
      <div className="mt-10">
        <label className="text-right text-sm md:text-base w-fit">
          {t("IncomingPaymentNotification") + ":"}
        </label>

        <Select
          dir="ltr"
          defaultSelectedKeys={["never"]}
          selectedKeys={
            methodOfSendingNotificationOnIncomingPayment
              ? [methodOfSendingNotificationOnIncomingPayment]
              : ["never"]
          }
          onChange={(e) => {
            setMethodOfSendingNotificationOnIncomingPayment(e.target.value);
          }}
          disallowEmptySelection={true}
          aria-label="none"
          style={{ backgroundColor: "inherit" }}
          size="sm"
          labelPlacement="outside"
          selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
          classNames={{
            base: "p-[2px] mb-4 max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
            trigger: "h-7",
          }}
        >
          <SelectItem key="never" value="never">
            {t_w("Disabled")}
          </SelectItem>
          <SelectItem key="email" value="email">
            {t_w("E-mail")}
          </SelectItem>
          <SelectItem key="sms" value="sms">
            {t_w("SMS")}
          </SelectItem>
        </Select>
        <label className="pl-1">{t("MinimumAmountForNotification")}:</label>
        <div className="flex items-end gap-1">
          <MyInput
            value={minimumAmountForSendingNotification}
            onChange={(e) => {
              setMinimumAmountForSendingNotification(e.target.value);
            }}
            color="border-gray-500"
            className="w-64 border-black"
            item={{
              name: "minimum_amount",
              type: "number",
              placeholder: "5",
            }}
          />
          <p className="w-fit text-center px-3 pt-[3px] mb-[1px] h-[34px] bg-inherit border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md">
            USD
          </p>
        </div>
      </div>
      <Button
        onClick={() => {
          updateData();
        }}
        isDisabled={!hasChanges() || updateLoading}
        size="sm"
        className="bg-orange text-sm rounded-full mt-10 p-4 text-white"
      >
        {updateLoading ? t_w("Confirming") + ".." : t_w("Confirm")}
      </Button>
      <MyMessage
        show={resUpdate.error === false && resUpdate.show}
        message={resUpdate.msg[router.locale]}
        isSuccess={resUpdate.error === false}
      />
      <MyMessage
        show={resUpdate.error === true && resUpdate.show}
        message={resUpdate.msg[router.locale]}
        isSuccess={resUpdate.error === false}
      />
    </div>
  );
}
