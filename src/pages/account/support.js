import SupportList from "@/components/support/SupportList";
import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";

export default function Support() {
  const [tab, setTab] = useState("list");
  return (
    <div className="h-screen container m-auto no-scrollbar overflow-y-scroll pb-[150px]">
      <div className="w-full md:w-[720px] lg:w-[950px] ml-4 mt-4 pb-3">
        <div className="w-fit ml-2 md:ml-4 bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50 dark:bg-default-50">
            SUPPORT
          </h1>
        </div>
        <p className="text-xs opacity-75 mt-1 ml-2 md:ml-4">
          Operator of a support service will answer you within 1-24 hours
        </p>
      </div>
      <div className="ml-2 md:ml-4 mt-2 md:mt-5 md:m-auto w-11/12 md:w-[720px] lg:w-[950px]">
        <div className="absolute container h-screen ml-3 no-scrollbar overflow-y-scroll pb-[150px]">
          {/* Tabs */}
          <div className="w-screen overflow-x-hidden">
            <Tabs
              selectedKey={tab}
              onSelectionChange={setTab}
              aria-label="Options"
              variant="underlined"
              classNames={{
                tabList: "ml-1 gap-6 relative rounded-none p-0 ",
                cursor: "w-full bg-[var(--primary-color)]",
                tab: "max-w-fit px-0 h-12",
                tabContent:
                  "group-data-[selected=true]:text-[var(--primary-color)]",
              }}
            >
              <Tab
                onSelect={() => setTab("newticket_tab")}
                key="list"
                title={
                  <div className="flex items-center space-x-2">
                    <span>List</span>
                  </div>
                }
              >
                <SupportList />
              </Tab>
              <Tab
                key="newticket_tab"
                onSelect={() => setTab("list")}
                title={
                  <div className="flex items-center space-x-2">
                    <span>New Ticket</span>
                  </div>
                }
              ></Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
