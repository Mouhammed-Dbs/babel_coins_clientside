import MyInput from "@/components/utils/MyInput";
import {
  Button,
  Progress,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { MdInfo } from "react-icons/md";

export default function Settings() {
  const router = useRouter();
  const [tab, setTab] = useState("profile_tab");
  const [cardID, setCardID] = useState(false);
  const [verificationSlide, setVerificationSlide] = useState(0);
  const [verificationMes, setVerificationMes] = useState(false);
  const [enableMasterKey, setEnableMasterKey] = useState(false);
  const [typeAccounts, setTypeAccounts] = useState(["Personal"]);
  const [countries, setCountries] = useState(["Syria", "United State"]);
  return (
    <div className="absolute container h-screen ml-3 no-scrollbar overflow-y-scroll pb-[150px]">
      {/* Tabs */}
      <div className="w-screen overflow-x-hidden">
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
            isDisabled
            className="block md:hidden"
            key="first_tab"
            title={
              <div className="flex items-center">
                <IoIosArrowBack className="text-primary w-7 h-7" />
              </div>
            }
          />
          <Tab
            onSelect={() => setTab("profile_tab")}
            key="profile_tab"
            title={
              <div className="flex items-center space-x-2">
                <span>PROFILE AND VERIFICATION</span>
              </div>
            }
          >
            <>
              {/* Card Vervication Email and Number */}
              <div
                className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white dark:bg-default-100 shadow-md ${
                  cardID ? "hidden" : ""
                }`}
              >
                {/* Title */}
                <div className="w-full border-b">
                  <h1 className="text-sm mb-3 font-bold">CURRENT LIMIT</h1>
                </div>

                {/* Progress */}
                <div className="mt-7">
                  <div className="flex justify-between">
                    <p className="text-xs">
                      <span className="text-base text-green-500">$0.00</span> /
                      $999 per day
                    </p>

                    <div className="relative text-xs flex">
                      <span className="hidden lg:block self-center mr-1">
                        Withdrawal limit for non verified accounts:
                      </span>
                      <span className="hidden lg:block font-bold self-center">
                        999 USD per day
                      </span>
                      <MdInfo
                        onClick={() => setVerificationMes(!verificationMes)}
                        className="h-5 w-5 self-center ml-1 text-green-500"
                      />
                      {verificationMes && (
                        <div className="absolute w-56 bg-slate-300 dark:bg-gray-800 border border-gray-300 p-2 rounded-md right-8 z-10">
                          Withdrawal limit for non verified accounts: 999 USD
                          per day
                        </div>
                      )}
                    </div>
                  </div>
                  <Progress
                    aria-label="Loading..."
                    value={60}
                    className="h-[3px] max-w mt-2"
                  />
                </div>

                {/* Content */}
                <div className="mt-10">
                  <h1 className="w-fit border-b-2 border-black dark:border-white">
                    VERIFICATION
                  </h1>
                  {/* Slide 1 */}
                  <div
                    className={`w-fit ${
                      verificationSlide != 0 ? "hidden" : ""
                    }`}
                  >
                    <div className="mt-10">
                      <Select
                        label="Type of account"
                        placeholder="Select type account"
                        labelPlacement="outside"
                        size="sm"
                        style={{ backgroundColor: "inherit" }}
                        className="max-w-xs peer w-64 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300"
                        selectorIcon={<IoIosArrowDown />}
                      >
                        {typeAccounts.map((account) => (
                          <SelectItem key={account} value={account}>
                            {account}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex md:gap-4 gap-3 mt-3">
                      <MyInput
                        color="border-gray-500"
                        className="w-32 md:w-64 border-black mb-3"
                        item={{
                          name: "nick",
                          type: "text",
                          placeholder: "John",
                          label: "First name",
                        }}
                      />
                      <MyInput
                        color="border-gray-500"
                        className="w-28 md:w-64 border-black mb-3"
                        item={{
                          name: "nick",
                          type: "text",
                          placeholder: "Wick",
                          label: "Last name",
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <MyInput
                        color="border-gray-500"
                        className="w-20  border-black mb-3"
                        item={{
                          name: "day",
                          type: "number",
                          placeholder: "Day",
                          label: "Day",
                        }}
                      />
                      <MyInput
                        color="border-gray-500"
                        className="w-20 border-black mb-3"
                        item={{
                          name: "month",
                          type: "number",
                          placeholder: "Month",
                          label: "Month",
                        }}
                      />
                      <MyInput
                        color="border-gray-500"
                        className="w-20 border-black mb-3"
                        item={{
                          name: "year",
                          type: "number",
                          placeholder: "Year",
                          label: "Year",
                        }}
                      />
                    </div>
                    <div>
                      <Select
                        style={{ backgroundColor: "inherit" }}
                        label="Country"
                        placeholder="Select a country"
                        labelPlacement="outside"
                        size="sm"
                        className="max-w-xs peer w-64 self-center rounded-lg border-2 border-black dark:border-slate-400 border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300"
                        selectorIcon={<IoIosArrowDown />}
                      >
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  {/* Slide 2 */}
                  <div
                    className={`w-fit md:grid md:grid-cols-2 md:gap-5 ${
                      verificationSlide != 1 ? "hidden sm:hidden md:hidden" : ""
                    }`}
                  >
                    <div className="pt-5">
                      <MyInput
                        color="border-gray-500"
                        className="border-black w-56 mb-3"
                        item={{
                          name: "email",
                          type: "email",
                          placeholder: "example@email.com",
                          label: "E-mail",
                        }}
                      />
                      <MyInput
                        color="border-gray-500"
                        className="border-black mb-3"
                        item={{
                          name: "telegram",
                          type: "text",
                          placeholder: "username",
                          label: "Telegram",
                        }}
                      />
                    </div>
                    <div className="md:pt-5">
                      <MyInput
                        color="border-gray-500"
                        className="border-black mb-3"
                        item={{
                          name: "phone",
                          type: "number",
                          placeholder: "+10000000000",
                          label: "Mobile phone",
                        }}
                      />
                      <MyInput
                        color="border-gray-500"
                        className="border-black mb-3"
                        item={{
                          name: "nick",
                          type: "text",
                          placeholder: "John",
                          label: "Nick in chat",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (verificationSlide == 0) setVerificationSlide(1);
                    else {
                      setCardID(true);
                    }
                  }}
                  size="sm"
                  className="bg-orange text-sm rounded-full mt-10 p-4 text-white"
                >
                  GO NEXT
                </Button>
              </div>

              {/* Card Vervication ID */}
              <div
                className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 px-4 md:px-8 bg-white dark:bg-default-100 shadow-md ${
                  !cardID ? "hidden" : ""
                }`}
              >
                {/* Title */}
                <div className="flex w-full border-b">
                  <FaArrowAltCircleLeft
                    onClick={() => {
                      setCardID(false);
                      setVerificationSlide(0);
                    }}
                    className="h-5 w-5"
                  />
                  <h1 className="text-sm mb-3 ml-2 font-bold">
                    UPLOADING DOCUMENTS
                  </h1>
                </div>

                {/* Message phone */}
                <div className="flex w-full justify-end mt-1">
                  <span className="text-xs text-green-500 self-center">
                    Phone number successfully linked
                  </span>
                  <MdInfo className="h-5 w-5 self-center ml-1 text-green-500" />
                </div>

                {/* Use your phone */}
                <div className="hidden md:block mt-4">
                  <h1 className="text-xs md:text-sm mb-3">
                    YOU CAN USE YOUR PHONE
                  </h1>
                  <div className="flex w-full rounded-md border-2 mb-10 p-3">
                    <Image
                      className="p-2"
                      src={"/images/logo.svg"}
                      width={70}
                      height={70}
                      alt="QR_Code"
                    />
                    <span className="text-sm self-center ml-2 overflow-hidden">
                      <p>
                        {
                          "It's easier to mak photos and upload them from your phone. You can continue your verifivation directly on your mobile phone."
                        }
                      </p>
                      <p className="font-bold">
                        {"Scan QR code open this link on your phone"}
                        <br className="md:hidden" />
                        <a
                          className="text-blue-700 ml-2 underline"
                          href="https://babelcoins.com/6746svi"
                        >
                          {"https://babelcoins.com/6746svi"}
                        </a>
                        <Button
                          size="sm"
                          className="bg-orange text-[10px] h-6 rounded-full p-2 ml-2 text-white"
                        >
                          COPY LINK
                        </Button>
                      </p>
                    </span>
                  </div>
                </div>

                {/* Continue with desktop */}
                <div className="mt-4">
                  {/* Title */}
                  <h1 className="hidden md:flex text-xs md:text-sm mb-3">
                    OR CONTINUE ON DESKTOP
                  </h1>

                  {/* Box 1 */}
                  <div className="md:flex w-full justify-between rounded-md border md:border-2 p-3">
                    <div className="flex">
                      <Image
                        className="w-16 h-16 md:w-24 md:h-24 p-2"
                        src={"/images/logo.svg"}
                        width={70}
                        height={70}
                        alt="QR_Code"
                      />
                      <div className="ml-3">
                        <label className="text-sm">
                          Choose your <b>document type:</b>
                        </label>
                        <div className="block md:flex mt-2">
                          <div className="ml-3 md:ml-0">
                            <input type="radio" />
                            <label className="ml-2 text-sm">Passport</label>
                          </div>
                          <div className="ml-3">
                            <input type="radio" />
                            <label className="ml-2 text-sm">ID card</label>
                          </div>
                          <div className="ml-3">
                            <input type="radio" />
                            <label className="ml-2 text-sm">
                              {"Driver's license"}
                            </label>
                          </div>
                        </div>
                        <div className="flex my-2">
                          <Button
                            size="sm"
                            className="bg-orange min-w-28 w-28 text-white rounded-full text-[11px] h-7 px-3"
                          >
                            CHOOSE FILE
                          </Button>
                          <label className="hidden md:block opacity-65 ml-3 text-sm">
                            Choose or drop your file here
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-2 p-3 md:px-4 lg:px-10 mt-3 md:mt-0">
                      <label className="text-sm opacity-65">
                        Accepted file formats:
                      </label>
                      <p className="text-sm">IPG, JPEG, PNG, PDF, max 50 MB</p>
                    </div>
                  </div>

                  {/* Box 2 */}
                  <div className="md:flex w-full justify-between rounded-md border md:border-2 p-3 mt-10">
                    <div className="flex">
                      <Image
                        className="w-16 h-16 md:w-24 md:h-24 p-2"
                        src={"/images/logo.svg"}
                        width={70}
                        height={70}
                        alt="QR_Code"
                      />
                      <div className="ml-3">
                        <label className="text-sm">
                          Choose your <b>Proof of address:</b>
                        </label>
                        <div className="flex my-2">
                          <Button
                            size="sm"
                            className="bg-orange min-w-28 w-28 text-white rounded-full text-[11px] h-7 px-3"
                          >
                            CHOOSE FILE
                          </Button>
                          <label className="hidden md:block opacity-65 ml-3 text-sm">
                            Choose or drop your file here
                          </label>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gray-500 min-w-28 w-28 text-white rounded-full text-[11px] h-7 px-3"
                        >
                          +ADD MORE
                        </Button>
                      </div>
                    </div>

                    <div className="border-l-2 p-3 md:px-4 lg:px-10 mt-3 md:mt-0">
                      <label className="text-sm opacity-65">
                        Accepted file formats:
                      </label>
                      <p className="text-sm">IPG, JPEG, PNG, PDF, max 50 MB</p>
                    </div>
                  </div>

                  <p className="w-full text-xs mt-5">
                    Please note that for the pourposes of KYC
                    (know-your-customer), Paycorp Limited may require you yo
                    submit additional documents in cases where the above
                    mentioned documents are deemed insufficient.
                  </p>

                  <div className="flex mt-10">
                    <input className="accent-primary" type="checkbox" />
                    <label className="text-sm ml-2">
                      I UNDERSTAND, ACCEPT, ANDAGREE TO PAYCORP LIMITED TERMS
                      AND CONDITIONS.
                    </label>
                  </div>
                  <Button
                    size="sm"
                    className="text-white bg-orange rounded-full p-4 mt-5"
                  >
                    SUBMIT FOR VERIFICATION
                  </Button>
                </div>
              </div>
            </>
          </Tab>
          <Tab
            key="security_tab"
            onSelect={() => setTab("security_tab")}
            title={
              <div className="flex items-center space-x-2">
                <span>SECURITY</span>
              </div>
            }
          >
            <div
              className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white dark:bg-default-100 shadow-md`}
            >
              {/* Title 1 */}
              <div className="w-full border-b">
                <h1 className="text-sm mb-3 font-bold">
                  {"AUTHENTICATION (2FA)"}
                </h1>
              </div>

              {/* Content 1 */}
              <div className="mt-10">
                <div>
                  <Select
                    defaultSelectedKeys={["never_send"]}
                    disallowEmptySelection={true}
                    label="Send verification code:"
                    style={{ backgroundColor: "inherit" }}
                    size="sm"
                    labelPlacement="outside"
                    selectorIcon={
                      <IoIosArrowDown color="var(--bg-primary-color)" />
                    }
                    classNames={{
                      base: "p-[2px] max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                      trigger: "h-7",
                    }}
                  >
                    <SelectItem key="never_send" value="never_send">
                      Never send verification code
                    </SelectItem>
                    <SelectItem
                      key="subnet_change_send"
                      value="subnet_change_send"
                    >
                      Send when subnet change
                    </SelectItem>
                    <SelectItem
                      key="ip_address_change"
                      value="ip_address_change"
                    >
                      Send when IP-address change
                    </SelectItem>
                    <SelectItem key="always_send" value="always_send">
                      Always send code
                    </SelectItem>
                  </Select>
                </div>
                <div className="mt-8">
                  <Select
                    defaultSelectedKeys={["email"]}
                    disallowEmptySelection={true}
                    label="Confirmation method:"
                    style={{ backgroundColor: "inherit" }}
                    size="sm"
                    labelPlacement="outside"
                    selectorIcon={
                      <IoIosArrowDown color="var(--bg-primary-color)" />
                    }
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
                    <SelectItem key="telegram" value="telegram">
                      Telegram
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
                  defaultSelectedKeys={["never_send"]}
                  disallowEmptySelection={true}
                  label="Method of sending code:"
                  style={{ backgroundColor: "inherit" }}
                  size="sm"
                  labelPlacement="outside"
                  selectorIcon={
                    <IoIosArrowDown color="var(--bg-primary-color)" />
                  }
                  classNames={{
                    base: "p-[2px] max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                    trigger: "h-7",
                  }}
                >
                  <SelectItem key="never_send" value="never_send">
                    Never Send verification code
                  </SelectItem>
                  <SelectItem key="email" value="email">
                    E-mail
                  </SelectItem>
                  <SelectItem key="sms" value="sms">
                    SMS
                  </SelectItem>
                  <SelectItem key="telegram" value="telegram">
                    Telegram
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
                onClick={() => {}}
                size="sm"
                className="bg-orange text-sm rounded-full mt-10 p-4 text-white"
              >
                CONFIRM
              </Button>
            </div>
          </Tab>
          <Tab
            key="password_tab"
            onSelect={() => setTab("password_tab")}
            title={
              <div className="flex items-center space-x-2">
                <span>PASSWORD</span>
              </div>
            }
          >
            <div
              className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white dark:bg-default-100 shadow-md`}
            >
              {/* Title */}
              <div className="w-full border-b">
                <h1 className="text-sm mb-3 font-bold">CHANGE PASSWORD</h1>
              </div>

              {/* Content */}
              <div className="mt-10">
                <MyInput
                  color="border-gray-500"
                  className="w-64 border-black mb-3"
                  item={{
                    name: "current_pass",
                    type: "text",
                    placeholder: "",
                    label: "Your password:",
                  }}
                />
                <MyInput
                  color="border-gray-500"
                  className="w-64 border-black mb-3"
                  item={{
                    name: "new_pass",
                    type: "text",
                    placeholder: "",
                    label: "New password:",
                  }}
                />
                <MyInput
                  color="border-gray-500"
                  className="w-64 border-black mb-3"
                  item={{
                    name: "repeat_new_pass",
                    type: "text",
                    placeholder: "",
                    label: "Repeat new password:",
                  }}
                />
              </div>

              <Button
                onClick={() => {}}
                size="sm"
                className="bg-orange text-sm rounded-full mt-10 p-4 text-white"
              >
                MODIFY
              </Button>
            </div>
          </Tab>
          <Tab
            key="notification_tab"
            onSelect={() => setTab("notification_tab")}
            title={
              <div className="flex items-center space-x-2">
                <span>NOTIFICATIONS</span>
              </div>
            }
          >
            <div
              className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white dark:bg-default-100 shadow-md`}
            >
              {/* Title 1 */}
              <div className="w-full border-b">
                <h1 className="text-sm mb-3 font-bold">AUTHENTICATION</h1>
              </div>

              {/* Content 1 */}
              <div className="mt-10">
                <Select
                  defaultSelectedKeys={["disabled"]}
                  disallowEmptySelection={true}
                  label="Notification of successful authorization:"
                  style={{ backgroundColor: "inherit" }}
                  size="sm"
                  labelPlacement="outside"
                  selectorIcon={
                    <IoIosArrowDown color="var(--bg-primary-color)" />
                  }
                  classNames={{
                    base: "p-[2px] max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                    trigger: "h-7",
                  }}
                >
                  <SelectItem key="enabled" value="enabled">
                    Enabled
                  </SelectItem>
                  <SelectItem key="disabled" value="disabled">
                    Disabled
                  </SelectItem>
                </Select>
              </div>

              {/* Title 2 */}
              <div className="w-full border-b mt-9">
                <h1 className="text-sm mb-3 font-bold">INTERNAL TRANSFERS</h1>
              </div>

              {/* Content 2 */}
              <div className="mt-10">
                <Select
                  defaultSelectedKeys={["disabled"]}
                  disallowEmptySelection={true}
                  label="Incoming payment notification:"
                  style={{ backgroundColor: "inherit" }}
                  size="sm"
                  labelPlacement="outside"
                  selectorIcon={
                    <IoIosArrowDown color="var(--bg-primary-color)" />
                  }
                  classNames={{
                    base: "p-[2px] mb-4 max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                    trigger: "h-7",
                  }}
                >
                  <SelectItem key="disabled" value="disabled">
                    Disabled
                  </SelectItem>
                  <SelectItem key="send_email" value="email">
                    Send to email
                  </SelectItem>
                  <SelectItem key="send_sms" value="sms">
                    Send via SMS
                  </SelectItem>
                </Select>
                <label className="text-xs md:text-sm pl-1">
                  Minimum amount for notification:
                </label>
                <div className="flex items-end gap-1">
                  <MyInput
                    color="border-gray-500"
                    className="w-64 border-black"
                    item={{
                      name: "minimum_amount",
                      type: "number",
                      placeholder: "1",
                    }}
                  />
                  <p className="w-fit text-center px-3 pt-[3px] mb-[1px] h-[34px] bg-inherit border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md">
                    USD
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {}}
                size="sm"
                className="bg-orange text-sm rounded-full mt-10 p-4 text-white"
              >
                CONFIRM
              </Button>
            </div>
          </Tab>
          <Tab
            key="templates_tab"
            onSelect={() => setTab("templates_tab")}
            title={
              <div className="flex items-center space-x-2">
                <span>TEMPLATES</span>
              </div>
            }
          ></Tab>
          <Tab
            isDisabled
            className="block md:hidden"
            key="nomore_tab"
            title={
              <div className="flex items-center">
                <IoIosArrowForward className="text-primary w-7 h-7" />
                <div className="w-28"></div>
              </div>
            }
          />
        </Tabs>
      </div>
    </div>
  );
}
