import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useContext, createContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen uppercase">
      <nav className="h-full flex flex-col bg-white dark:bg-black border-r shadow-sm">
        <div
          className="p-4 pb-2 flex justify-center items-center border-b-1"
          style={{ height: "var(--navbar-height)" }}
        >
          <p
            className={`overflow-hidden transition-all uppercase ${
              expanded ? "w-fit" : "w-0 hidden"
            }`}
          >
            BabelCoins
          </p>
          {!expanded && (
            <Image
              className="transition-all"
              width={28}
              height={28}
              alt=""
              src={"/images/logo.svg"}
            />
          )}
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 mt-3 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t flex justify-center p-3">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            {expanded ? (
              <IoIosArrowDropleft size={20} />
            ) : (
              <IoIosArrowDropright size={25} />
            )}
          </button>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  const router = useRouter();
  return (
    <li
      onClick={() => {
        // text.toLowerCase() !== "balance"
        //   ? router.replace(router.asPath + "/" + text.toLowerCase())
        //   : router.replace("/account");
      }}
      className={`
        relative flex items-center py-2 px-3 my-1
        text-sm rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-primary text-white"
            : "hover:bg-indigo-50 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-40 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}