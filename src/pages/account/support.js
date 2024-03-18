import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";

export default function Support() {
  const [tab, setTab] = useState("list");
  return (
    <div className="h-screen container m-auto no-scrollbar overflow-y-scroll pb-[150px]">
      <div className="w-full md:w-[720px] lg:w-[950px] m-auto mt-4 pb-3">
        <div className="w-fit ml-4 md:ml-0 bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50 dark:bg-default-50">
            SUPPORT
          </h1>
        </div>
        <p className="text-xs opacity-75 mt-1 ml-4 md:ml-0">
          Operator of a support service will answer you within 1-24 hours
        </p>
      </div>
      <div className="ml-4 mt-6 md:m-auto md:mt-10 w-11/12 md:w-[720px] lg:w-[950px]">
        <div className="absolute text-left w-11/12 md:w-[720px] lg:w-[950px] pb-3 backdrop-blur-xs bg-white dark:bg-default-100 rounded-lg shadow-md">
          <Tabs
            selectedKey={tab}
            onSelectionChange={setTab}
            aria-label="Options"
            variant="underlined"
            classNames={{
              tabList: "md:ml-2 gap-6 relative rounded-none p-0 ",
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
            ></Tab>
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
  );
}
