import Notifications from "@/components/settings/Notifications";
import Password from "@/components/settings/Password";
import ProfileAndVerification from "@/components/settings/ProfileAndVerification";
import Security from "@/components/settings/Security";
import Templates from "@/components/settings/Templates";
import { Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const CardIDContext = createContext();
export { CardIDContext };
export default function Settings() {
  const router = useRouter();
  const { query } = router;
  const [tab, setTab] = useState("profile_tab");
  const [cardID, setCardID] = useState(false);
  useEffect(() => {
    if (query["tab"] === "security") setTab("security_tab");
    if (query["tab"] === "profile" || query["tab"] === undefined)
      setTab("profile_tab");
    if (query["tab"] === "password") setTab("password_tab");
    if (query["tab"] === "notification") setTab("notification_tab");
    if (query["tab"] === "templates") setTab("templates_tab");
  }, [query]);
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
            <CardIDContext.Provider value={{ cardID, setCardID }}>
              <ProfileAndVerification />
            </CardIDContext.Provider>
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
            <Security />
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
            <Password />
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
            <Notifications />
          </Tab>
          <Tab
            key="templates_tab"
            onSelect={() => setTab("templates_tab")}
            title={
              <div className="flex items-center space-x-2">
                <span>TEMPLATES</span>
              </div>
            }
          >
            <Templates />
          </Tab>
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
