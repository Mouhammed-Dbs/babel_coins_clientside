import MyInput from "@/components/utils/MyInput";
import {
  Button,
  Chip,
  Progress,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowDown } from "react-icons/fa";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowDropright,
  IoIosArrowForward,
} from "react-icons/io";
import { MdInfo } from "react-icons/md";

export default function Settings() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [cardID, setCardID] = useState(false);
  const [verificationSlide, setVerificationSlide] = useState(0);
  const [verificationMes, setVerificationMes] = useState(false);
  const [typeAccounts, setTypeAccounts] = useState(["Personal"]);
  const [countries, setCountries] = useState(["Syria", "United State"]);
  return (
    <div className="container h-screen ml-3 no-scrollbar overflow-y-scroll pb-24">
      {/* Tabs */}
      <div className="flex w-[78%] md:11/12 md:m-auto md:ml-12 overflow-x-scroll no-scrollbar">
        <span className="flex lg:hidden">
          <IoIosArrowBack className="text-primary self-center mr-2" size={20} />
        </span>
        <Tabs
          aria-label="Options"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0",
            cursor: "w-full bg-[var(--primary-color)]",
            tab: "max-w-fit px-0 h-12",
            tabContent:
              "group-data-[selected=true]:text-[var(--primary-color)]",
          }}
        >
          <Tab
            key="profile_tab"
            title={
              <div
                className="flex items-center space-x-2"
                onClick={() => setTab(0)}
              >
                <span>PROFILE AND VERIFICATION</span>
              </div>
            }
          />
          <Tab
            key="security_tab"
            title={
              <div
                className="flex items-center space-x-2"
                onClick={() => setTab(1)}
              >
                <span>SECURITY</span>
              </div>
            }
          />
          <Tab
            key="password_tab"
            title={
              <div
                className="flex items-center space-x-2"
                onClick={() => setTab(2)}
              >
                <span>PASSWORD</span>
              </div>
            }
          />
          <Tab
            key="notification_tab"
            title={
              <div
                className="flex items-center space-x-2"
                onClick={() => setTab(3)}
              >
                <span>NOTIFICATIONS</span>
              </div>
            }
          />
          <Tab
            key="templates_tab"
            title={
              <div
                className="flex items-center space-x-2"
                onClick={() => setTab(4)}
              >
                <span>TEMPLATES</span>
              </div>
            }
          />
        </Tabs>
        <span className="flex">
          <IoIosArrowForward
            className="text-primary self-center ml-2 lg:hidden"
            size={20}
          />
        </span>
      </div>

      {/* Card Vervication Email and Number */}
      <div
        className={`w-[78%] md:11/12 md:m-auto md:ml-12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white dark:bg-default-100 shadow-md ${
          tab != 0 || cardID ? "hidden" : ""
        }`}
      >
        {/* Title */}
        <div className="w-full border-b">
          <h1 className="text-sm mb-3">CURRENT LIMIT</h1>
        </div>

        {/* Progress */}
        <div className="mt-7">
          <div className="flex justify-between">
            <p className="text-xs">
              <span className="text-base text-green-500">$0.00</span> / $999 per
              day
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
                  Withdrawal limit for non verified accounts: 999 USD per day
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
          <div className={`w-fit ${verificationSlide != 0 ? "hidden" : ""}`}>
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
                className="w-32 border-black mb-3"
                item={{
                  name: "nick",
                  type: "text",
                  placeholder: "John",
                  label: "First name",
                }}
              />
              <MyInput
                color="border-gray-500"
                className="w-28 border-black mb-3"
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
        className={`w-9/12 md:11/12 md:m-auto md:ml-12 mt-5 md:mt-5 rounded-md py-10 px-4 md:px-8 bg-white dark:bg-default-100 shadow-md ${
          !cardID || tab > 0 ? "hidden" : ""
        }`}
      >
        {/* Title */}
        <div className="flex w-full border-b">
          <FaArrowAltCircleLeft
            onClick={() => {
              setCardID(false);
              setTab(0);
              setVerificationSlide(0);
            }}
            className="h-5 w-5"
          />
          <h1 className="text-sm mb-3 ml-2">UPLOADING DOCUMENTS</h1>
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
          <h1 className="text-xs md:text-sm mb-3">YOU CAN USE YOUR PHONE</h1>
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
          <div className="flex w-full justify-between rounded-md border-2 p-3">
            <div className="flex">
              <Image
                className="w-24 h-24 p-2"
                src={"/images/logo.svg"}
                width={70}
                height={70}
                alt="QR_Code"
              />
              <div className="ml-3">
                <label className="text-sm">
                  Choose your <b>document type:</b>
                </label>
                <div className="flex mt-2">
                  <input type="radio" />
                  <label className="ml-2 text-sm">Passport</label>
                  <input className="ml-3" type="radio" />
                  <label className="ml-2 text-sm">ID card</label>
                  <input className="ml-3" type="radio" />
                  <label className="ml-2 text-sm">{"Driver's license"}</label>
                </div>
                <div className="flex my-2">
                  <Button
                    size="sm"
                    className="bg-orange text-white rounded-full text-[11px] h-7 px-3"
                  >
                    CHOOSE FILE
                  </Button>
                  <label className="opacity-65 ml-3 text-sm">
                    Choose or drop your file here
                  </label>
                </div>
              </div>
            </div>

            <div className="border-l-2 p-3 px-10">
              <label className="text-sm opacity-65">
                Accepted file formats:
              </label>
              <p className="text-sm">IPG, JPEG, PNG, PDF, max 50 MB</p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="flex w-full justify-between rounded-md border-2 p-3 mt-10">
            <div className="flex">
              <Image
                className="w-24 h-24 p-2"
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
                    className="bg-orange w-28 text-white rounded-full text-[11px] h-7 px-3"
                  >
                    CHOOSE FILE
                  </Button>
                  <label className="opacity-65 ml-3 text-sm">
                    Choose or drop your file here
                  </label>
                </div>
                <Button
                  size="sm"
                  className="bg-gray-500 w-28 text-white rounded-full text-[11px] h-7 px-3"
                >
                  +ADD MORE
                </Button>
              </div>
            </div>

            <div className="border-l-2 p-3 px-10">
              <label className="text-sm opacity-65">
                Accepted file formats:
              </label>
              <p className="text-sm">IPG, JPEG, PNG, PDF, max 50 MB</p>
            </div>
          </div>

          <p className="w-full text-xs mt-5">
            Please note that for the pourposes of KYC (know-your-customer),
            Paycorp Limited may require you yo submit additional documents in
            cases where the above mentioned documents are deemed insufficient.
          </p>

          <div className="flex mt-10">
            <input className="accent-primary" type="checkbox" />
            <label className="text-sm ml-2">
              I UNDERSTAND, ACCEPT, ANDAGREE TO PAYCORP LIMITED TERMS AND
              CONDITIONS.
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
    </div>
  );
}
