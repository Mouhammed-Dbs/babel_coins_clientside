import { useRouter } from "next/router";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
export default function Messages(props) {
  const router = useRouter();
  return (
    <div className="h-screen container m-auto no-scrollbar overflow-y-scroll pb-[150px]">
      <div className="w-full md:w-[520px] lg:w-[790px] m-auto mt-4 pb-3">
        <div className="w-fit pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50/15 dark:bg-default-50/15 backdrop-blur-xs">
            Messages
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]"></div>
        </div>
        <p className="text-xs opacity-75 mt-1  md:ml-0">
          The actual information in the personal news
        </p>
      </div>
      <div className="mt-6 md:m-auto md:mt-10 w-11/12 md:w-[520px] lg:w-[790px] pb-3 text-center backdrop-blur-xs bg-white dark:bg-default-100 rounded-lg shadow-md">
        <div className="flex p-3 py-5">
          <h3 className="text-primary w-2/5">DATE</h3>
          <h3 className="text-primary w-3/5">NEWS LIST</h3>
        </div>
        <ul className="w-full">
          <ItemList
            date={"31 Aug 2023 00:27"}
            data={
              "Utilities for controlling how an individual flex or grid item is positioned along its containers cross axis"
            }
          />
          <ItemList
            date={"31 Aug 2023 00:27"}
            data={
              "Utilities for controlling how an individual flex or grid item is positioned along its containers cross axis"
            }
          />
          <ItemList
            date={"31 Aug 2023 00:27"}
            data={
              "Utilities for controlling how an individual flex or grid item is positioned along its containers cross axis"
            }
          />
          <ItemList
            date={"31 Aug 2023 00:27"}
            data={
              "Utilities for controlling how an individual flex or grid item is positioned along its containers cross axis"
            }
          />
          <ItemList
            date={"31 Aug 2023 00:27"}
            data={
              "Utilities for controlling how an individual flex or grid item is positioned along its containers cross axis"
            }
          />
          <ItemList
            date={"31 Aug 2023 00:27"}
            data={
              "Utilities for controlling how an individual flex or grid item is positioned along its containers cross axis"
            }
          />
          <ItemList
            date={"31 Aug 2023 00:27"}
            data={
              "Utilities for controlling how an individual flex or grid item is positioned along its containers cross axis"
            }
          />
          <ItemList
            date={"31 Aug 2023 00:27"}
            data={
              "Utilities for controlling how an individual flex or grid item is positioned along its containers cross axis"
            }
          />
        </ul>
      </div>
    </div>
  );
}

function ItemList({ date, data }) {
  return (
    <li className="flex p-3 border-b-1 md:border-b-2 ml-2 md:ml-8 py-5">
      <div className="flex w-2/5">
        <IoCheckmarkDoneCircle
          color="green"
          className="w-5 h-5 md:h-10 md:w-10 self-center"
        />
        <p className="w-full text-xs opacity-70 self-center px-1 md:px-4">
          {date}
        </p>
      </div>
      <div className="flex w-3/5 overflow-hidden">
        <p className="w-full text-xs opacity-70 self-center px-4">{data}</p>
      </div>
    </li>
  );
}
