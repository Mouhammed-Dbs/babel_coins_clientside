"use client";
import Navbar from "@/components/MainNavbar";
import Sidebar, { SidebarItem } from "@/components/Sidebar";
import { LuWallet } from "react-icons/lu";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { RiExchangeFundsLine } from "react-icons/ri";
import { PiChartLineUpBold } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { useRouter } from "next/router";

export default function MainLayout(props) {
  const currentRoute = useRouter().asPath.slice(1);
  return (
    <>
      <main className="w-screen flex text-md">
        <Sidebar>
          <SidebarItem
            text="Balance"
            icon={<LuWallet size={20} />}
            active={currentRoute === "account"}
          />
          <SidebarItem
            text="Add"
            icon={<IoAddCircleSharp size={20} />}
            active={currentRoute.includes("account/add")}
          />
          <SidebarItem text="Transfer" icon={<IoIosSend size={20} />} />
          <SidebarItem text="Trade" icon={<PiChartLineUpBold size={20} />} />
          <SidebarItem
            text="Exchange"
            icon={<RiExchangeFundsLine size={20} />}
          />
          <SidebarItem text="History" icon={<FaHistory size={20} />} />
        </Sidebar>
        <div className="w-full">
          <Navbar />
          {props.children}
        </div>
      </main>
    </>
  );
}
