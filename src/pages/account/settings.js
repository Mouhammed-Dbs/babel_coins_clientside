import MyInput from "@/components/utils/MyInput";
import { Button, Chip, Progress, Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdInfo } from "react-icons/md";

export default function Settings(props) {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  return (
    <div className="container h-screen m-auto no-scrollbar overflow-y-scroll pb-20">
      <Tabs
        aria-label="Options"
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full m-auto md:mx-14 relative rounded-none p-0",
          cursor: "w-full bg-[var(--primary-color)]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[var(--primary-color)]",
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
      <div
        className={`w-10/12 m-auto md:mx-12 mt-5 rounded-md py-10 px-8 bg-white dark:bg-default-100 ${
          tab != 0 ? "hidden" : ""
        }`}
      >
        <div className="w-full border-b">
          <h1 className="text-sm mb-3">CURRENT LIMIT</h1>
        </div>
        <div className="mt-7">
          <div className="flex justify-between">
            <p className="text-xs">
              <span className="text-base text-green-500">$0.00</span> / $999 per
              day
            </p>

            <div className="text-xs flex">
              <span className="self-center mr-1">
                Withdrawal limit for non verified accounts:
              </span>
              <span className="font-bold self-center"> 999 USD per day</span>
              <MdInfo className="h-5 w-5 self-center ml-1 text-green-500" />
            </div>
          </div>
          <Progress
            aria-label="Loading..."
            value={60}
            className="h-[3px] max-w mt-2"
          />
        </div>
        <div className="mt-10">
          <h1 className="w-fit border-b-2 border-black dark:border-white">
            VERIFICATION
          </h1>
          <div className="w-fit md:grid grid-cols-2 md:gap-5">
            <div className="pt-5">
              <MyInput
                color="border-gray-500"
                className="border-black mb-3"
                item={{
                  name: "email",
                  type: "email",
                  placeholder: "example@email.com",
                  label: "E-mail:",
                }}
              />
              <MyInput
                color="border-gray-500"
                className="border-black mb-3"
                item={{
                  name: "telegram",
                  type: "text",
                  placeholder: "username",
                  label: "Telegram:",
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
                  label: "Mobile phone:",
                }}
              />
              <MyInput
                color="border-gray-500"
                className="border-black mb-3"
                item={{
                  name: "nick",
                  type: "text",
                  placeholder: "John",
                  label: "Nick in chat:",
                }}
              />
            </div>
          </div>
        </div>
        <Button
          size="sm"
          className="bg-orange text-xs rounded-full mt-10 text-white"
        >
          GO NEXT
        </Button>
      </div>
    </div>
  );
}
