import { Button, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  changeSecuritySettings,
  getSecurityOrNotificationsSettings,
} from "../../../public/global_functions/auth";
import MyLoading from "../MyLoading";
import { useTranslations } from "next-intl";
import MyMessage from "../utils/MyMessage";
import { useRouter } from "next/router";

export default function Security() {
  const router = useRouter();
  const t_w = useTranslations("Words");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [enableMasterKey, setEnableMasterKey] = useState(false);
  const [whenVerificationCode, setWhenVerificationCode] = useState("never");
  const [methodOfSendingCode2FA, setMethodOfSendingCode2FA] = useState("email");
  const [methodOfSendingCodeRestorePass, setMethodOfSendingCodeRestorePass] =
    useState("never");
  const [initialState, setInitialState] = useState({
    enableMasterKey: false,
    whenVerificationCode: "never",
    methodOfSendingCode2FA: "email",
    methodOfSendingCodeRestorePass: "never",
  });
  const [resUpdate, setResUpdate] = useState({
    msg: "",
    error: false,
    show: false,
  });

  const hasChanges = () => {
    return (
      enableMasterKey !== initialState.enableMasterKey ||
      whenVerificationCode !== initialState.whenVerificationCode ||
      methodOfSendingCode2FA !== initialState.methodOfSendingCode2FA ||
      methodOfSendingCodeRestorePass !==
        initialState.methodOfSendingCodeRestorePass
    );
  };

  const getData = async () => {
    const res = await getSecurityOrNotificationsSettings("security");
    setPageLoading(false);
    if (!res.error) {
      setIsDataLoaded(true);
      setEnableMasterKey(res.data.isEnabledMasterKey);
      setWhenVerificationCode(
        res.data.authenticationBy2FA.whenSendVerificationCode
      );
      setMethodOfSendingCode2FA(
        res.data.authenticationBy2FA.methodOfSendingCode
      );
      setMethodOfSendingCodeRestorePass(
        res.data.restorePasswords.methodOfSendingCode
      );
      setInitialState({
        enableMasterKey: res.data.isEnabledMasterKey,
        whenVerificationCode:
          res.data.authenticationBy2FA.whenSendVerificationCode,
        methodOfSendingCode2FA:
          res.data.authenticationBy2FA.methodOfSendingCode,
        methodOfSendingCodeRestorePass:
          res.data.restorePasswords.methodOfSendingCode,
      });
    }
  };

  const updateData = async () => {
    setUpdateLoading(true);
    const res = await changeSecuritySettings(
      whenVerificationCode,
      methodOfSendingCode2FA,
      methodOfSendingCodeRestorePass,
      enableMasterKey
    );
    setUpdateLoading(false);
    setResUpdate({ error: res.error, msg: res.msg, show: true });
    if (!res.error) {
      setInitialState({
        enableMasterKey,
        whenVerificationCode,
        methodOfSendingCode2FA,
        methodOfSendingCodeRestorePass,
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
        <p className="text-lg text-center">Error Getting Data!</p>
      </div>
    );
  return (
    <div
      className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white/55 dark:bg-default-100/55 backdrop-blur-md shadow-md`}
    >
      {/* Title 1 */}
      <div className="w-full border-b">
        <h1 className="text-sm mb-3 font-bold">{"AUTHENTICATION (2FA)"}</h1>
      </div>

      {/* Content 1 */}
      <div className="mt-10">
        <div>
          <Select
            defaultSelectedKeys={["never"]}
            selectedKeys={
              whenVerificationCode ? [whenVerificationCode] : ["never"]
            }
            onChange={(e) => {
              setWhenVerificationCode(e.target.value);
            }}
            disallowEmptySelection={true}
            label="Send verification code:"
            style={{ backgroundColor: "inherit" }}
            size="sm"
            labelPlacement="outside"
            selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
            classNames={{
              base: "p-[2px] max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
              trigger: "h-7",
            }}
          >
            <SelectItem key="never" value="never">
              Never send verification code
            </SelectItem>
            <SelectItem key="on subnet change" value="on subnet change">
              Send when subnet change
            </SelectItem>
            <SelectItem key="on ip address change" value="on ip address change">
              Send when IP-address change
            </SelectItem>
            <SelectItem key="always" value="always">
              Always send code
            </SelectItem>
          </Select>
        </div>
        <div className="mt-8">
          <Select
            defaultSelectedKeys={["email"]}
            selectedKeys={
              methodOfSendingCode2FA ? [methodOfSendingCode2FA] : ["email"]
            }
            onChange={(e) => {
              setMethodOfSendingCode2FA(e.target.value);
            }}
            disallowEmptySelection={true}
            label="Confirmation method:"
            style={{ backgroundColor: "inherit" }}
            size="sm"
            labelPlacement="outside"
            selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
            classNames={{
              base: "p-[2px] max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
              trigger: "h-7",
            }}
          >
            <SelectItem key="email" value="email">
              E-mail
            </SelectItem>
            <SelectItem key="sms" value="sms">
              SMS
            </SelectItem>
          </Select>
        </div>
      </div>

      {/* Title 2 */}
      <div className="w-full border-b mt-9">
        <h1 className="text-sm mb-3 font-bold">RESTORE PASSWORDS</h1>
      </div>

      {/* Content 2 */}
      <div className="mt-10">
        <Select
          defaultSelectedKeys={["never"]}
          selectedKeys={
            methodOfSendingCodeRestorePass
              ? [methodOfSendingCodeRestorePass]
              : ["never"]
          }
          onChange={(e) => {
            setMethodOfSendingCodeRestorePass(e.target.value);
          }}
          disallowEmptySelection={true}
          label="Method of sending code:"
          style={{ backgroundColor: "inherit" }}
          size="sm"
          labelPlacement="outside"
          selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
          classNames={{
            base: "p-[2px] max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
            trigger: "h-7",
          }}
        >
          <SelectItem key="never" value="never">
            Never Send verification code
          </SelectItem>
          <SelectItem key="email" value="email">
            E-mail
          </SelectItem>
          <SelectItem key="sms" value="sms">
            SMS
          </SelectItem>
        </Select>
      </div>

      {/* Title 2 */}
      <div className="w-full border-b mt-9">
        <h1 className="text-sm mb-3 font-bold">MASTER KEY</h1>
      </div>

      {/* Content 3 */}
      <div className="flex items-center mt-10">
        <input
          onChange={() => {
            setEnableMasterKey(!enableMasterKey);
          }}
          checked={enableMasterKey}
          value={enableMasterKey}
          type="checkbox"
          className="accent-primary h-4 w-4"
        ></input>
        <label className="text-sm text-opacity-65 ml-2">
          ENABLE MASTER KEY
        </label>
      </div>
      <Button
        onClick={() => {
          updateData();
        }}
        isDisabled={!hasChanges() || updateLoading}
        size="sm"
        className="bg-orange text-sm rounded-full mt-10 p-4 text-white"
      >
        {updateLoading ? "CONFIRMING.." : "CONFIRM"}
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
