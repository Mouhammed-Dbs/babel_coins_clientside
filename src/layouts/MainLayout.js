"use client";
import Navbar from "@/components/MainNavbar";
import Sidebar, { SidebarItem } from "@/components/Sidebar";
import { LuWallet } from "react-icons/lu";
import { IoAddCircleSharp, IoCallOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline, IoIosSend } from "react-icons/io";
import { RiExchangeFundsLine } from "react-icons/ri";
import { PiChartLineUpBold } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { useRouter } from "next/router";
import { Button, Card } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import CallAlert from "@/components/utils/alerts/CallAlert";
import PhoneVerificationAlert from "@/components/utils/alerts/PhoneVerificationAlert";
import AccessLockedAlert from "@/components/utils/alerts/AccessLockedAlert";

export default function MainLayout(props) {
  const currentRoute = useRouter().asPath.slice(1);
  return (
    <>
      <main className="w-screen flex text-md fixed">
        <Sidebar>
          <SidebarItem
            text="Balance"
            icon={<LuWallet size={20} />}
            active={
              currentRoute === "account" ||
              currentRoute === "account/messages" ||
              currentRoute === "account/settings"
            }
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
        <div className="w-full bg-slate-50 dark:bg-default-50">
          <Navbar />
          {props.children}
        </div>

        {/* <CallAlert onSubmit={() => console.log("submit")} isShow={true} />
        <PhoneVerificationAlert isShow={false} />
        <AccessLockedAlert isShow={true} /> */}
      </main>
    </>
  );
}
