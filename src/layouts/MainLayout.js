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
import { useEffect, useState } from "react";
import CallAlert from "@/components/utils/alerts/CallAlert";
import PhoneVerificationAlert from "@/components/utils/alerts/PhoneVerificationAlert";
import AccessLockedAlert from "@/components/utils/alerts/AccessLockedAlert";
import MyLoading from "@/components/MyLoading";
import { isUserLogged } from "../../public/global_functions/auth";

export default function MainLayout(props) {
  const router = useRouter();
  const currentRoute = router.asPath.slice(1);
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    isUserLogged()
      .then((isLogged) => {
        if (!isLogged) {
          router.replace("/login");
        } else {
          setPageLoading(false);
        }
      })
      .catch(async (err) => {
        localStorage.removeItem("babel-coins-user-token");
        await router.replace("/login");
        setPageLoading(false);
      });
  }, [router]);

  if (pageLoading)
    return (
      <MyLoading
        msg="Loading BabelCoins.."
        color="primary"
        className={`h-screen text-black dark:text-white mt-24`}
      />
    );
  return (
    <>
      <main className="w-screen flex text-md fixed">
        <Sidebar>
          <SidebarItem
            text="Balance"
            link=""
            icon={<LuWallet size={20} />}
            active={
              currentRoute === "account" ||
              currentRoute === "account/messages" ||
              currentRoute === "account/settings"
            }
          />
          <SidebarItem
            text="Add"
            link="add"
            icon={<IoAddCircleSharp size={20} />}
            active={currentRoute.includes("account/add")}
          />
          <SidebarItem
            text="Transfer"
            link="send"
            icon={<IoIosSend size={20} />}
            active={currentRoute.includes("account/send")}
          />
          <SidebarItem
            text="Trade"
            link="trade"
            icon={<PiChartLineUpBold size={20} />}
          />
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

        {/* <CallAlert onSubmit={() => console.log("submit")} isShow={true} /> */}
        {/* <PhoneVerificationAlert isShow={true} /> */}
        {/* <AccessLockedAlert isShow={true} /> */}
      </main>
    </>
  );
}
