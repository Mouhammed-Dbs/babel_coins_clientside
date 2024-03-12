import { CiLock, CiUnlock } from "react-icons/ci";

export default function Log() {
  return (
    <div className="h-screen container m-auto no-scrollbar overflow-y-scroll pb-[150px]">
      <div className="w-full md:w-[720px] lg:w-[950px] m-auto mt-4 pb-3">
        <div className="w-fit ml-4 md:ml-0 bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50 dark:bg-default-50">
            LOG
          </h1>
        </div>
        <p className="text-xs opacity-75 mt-1 ml-4 md:ml-0"></p>
      </div>
      <div className="ml-4 mt-6 md:m-auto md:mt-10 w-11/12 md:w-[720px] lg:w-[950px] pb-3 text-center backdrop-blur-xs bg-white dark:bg-default-100 rounded-lg shadow-md">
        <div className="flex p-3 py-5">
          <h3 className="text-primary w-3/12 text-xs md:text-base">DATE</h3>
          <h3 className="text-primary w-5/12 text-xs md:text-base">ACTION</h3>
          <h3 className="text-primary w-2/12 md:w-3/12 text-xs md:text-base">
            IP
          </h3>
          <h3 className="text-primary w-2/12 md:w-1/12 text-xs md:text-base">
            STATUS
          </h3>
        </div>
        <ul className="w-full">
          <ItemList
            date={"31 Aug 2023 00:27"}
            action={"Utilities for controlling how an individual flex"}
            ip={"176.9.113.53\nGermany"}
            status={true}
          />
          <ItemList
            date={"31 Aug 2023 00:27"}
            action={"Utilities for controlling how"}
            ip={"176.9.113.53\nGermany"}
            status={true}
          />
          <ItemList
            date={"31 Aug 2023 00:27"}
            action={"Utilities for controlling how an individual flex"}
            ip={"176.9.113.53\nGermany"}
            status={true}
          />
          <ItemList
            date={"31 Aug 2023 00:27"}
            action={"Utilities for controlling how an individual flex"}
            ip={"176.9.113.53\nGermany"}
            status={true}
          />
          <ItemList
            date={"31 Aug 2023 00:27"}
            action={"Utilities for controlling how"}
            ip={"176.9.113.53\nGermany"}
            status={true}
          />
          <ItemList
            date={"31 Aug 2023 00:27"}
            action={"Utilities for controlling how"}
            ip={"176.9.113.53\nGermany"}
            status={true}
          />
        </ul>
      </div>
    </div>
  );
}

function ItemList({ date, action, ip, status }) {
  return (
    <li className="flex p-3 border-b-2 ml-2 md:ml-8 py-3">
      <div className="flex w-3/12">
        <p className="w-full text-xs opacity-70 self-center md:pl-4 text-left">
          {date}
        </p>
      </div>
      <div className="flex w-5/12">
        <p className="w-full text-xs opacity-70 self-center px-1 md:px-4">
          {action}
        </p>
      </div>
      <div className="flex w-3/12">
        <p className="w-full text-xs opacity-70 self-center px-1 md:px-4">
          {ip}
        </p>
      </div>
      <div className="flex w-1/12 overflow-hidden place-content-center">
        {status ? (
          <CiLock
            color="gray"
            className="w-5 h-5 md:h-10 md:w-10 self-center"
          />
        ) : (
          <CiUnlock
            color="gray"
            className="w-5 h-5 md:h-10 md:w-10 self-center"
          />
        )}
      </div>
    </li>
  );
}
