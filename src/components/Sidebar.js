import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useContext, createContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  return (
    <aside className="h-screen uppercase z-20">
      <nav className="h-full flex flex-col bg-white/55 dark:bg-black/55 border-r shadow-sm backdrop-blur-md">
        <div
          className="p-4 pb-2 flex justify-center items-center border-b-1"
          style={{ height: "var(--navbar-height)" }}
        >
          <p
            onClick={() => router.push("/")}
            className={`overflow-hidden transition-all uppercase ${
              expanded ? "w-fit" : "w-0 hidden"
            }`}
          >
            BabelCoins
          </p>
          {!expanded && (
            <Image
              onClick={() => router.push("/")}
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
        <div className="flex justify-center p-3 mb-20 md:mb-2">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            {expanded ? (
              <IoIosArrowDropleft size={25} />
            ) : (
              <IoIosArrowDropright size={25} />
            )}
          </button>
        </div>
      </nav>
    </aside>
  );
}
export function SidebarElement({ children, text }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`flex transition-colors group my-4 ${
        expanded ? "justify-start px-3" : "justify-center"
      }`}
    >
      <div className="self-center">{children}</div>
      <span
        className={`overflow-hidden transition-all text-gray-600 dark:text-gray-400 self-center ${
          expanded ? "w-fit ml-2 pb-[2px]" : "w-0"
        }`}
      >
        {text}
      </span>
    </li>
  );
}

export function SidebarItem({
  icon,
  text,
  link,
  active,
  alert = false,
  toast,
}) {
  const { expanded } = useContext(SidebarContext);
  const router = useRouter();
  return (
    <li
      onClick={() => {
        router.replace("/account/" + link.toLowerCase());
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
        ></div>
      )}
      {!expanded && toast && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6 z-10
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
