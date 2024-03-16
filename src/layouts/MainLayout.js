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
import { useEffect, useState } from "react";
import CallAlert from "@/components/utils/alerts/CallAlert";
import PhoneVerificationAlert from "@/components/utils/alerts/PhoneVerificationAlert";
import AccessLockedAlert from "@/components/utils/alerts/AccessLockedAlert";
import MyLoading from "@/components/MyLoading";
import { isUserLogged } from "../../public/global_functions/auth";

export default function MainLayout(props) {
  const router = useRouter();
  const currentRoute = router.asPath.slice(1);
  const [mounted, setMounted] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    isUserLogged()
      .then((result) => {
        if (result.error) {
          router.replace("/login");
        } else {
          setUserInfo(result.data);
          setPageLoading(false);
        }
      })
      .catch(async (err) => {
        await router.replace("/login");
        setPageLoading(false);
      });
  }, [router]);

  if (!mounted)
    return (
      <MyLoading
        msg="Loading.."
        color="primary"
        className={`text-black dark:text-white mt-24`}
      />
    );
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
            toast={!isMobile}
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
            toast={!isMobile}
            text="Add"
            link="add"
            icon={<IoAddCircleSharp size={20} />}
            active={currentRoute.includes("account/add")}
          />
          <SidebarItem
            toast={!isMobile}
            text="Transfer"
            link="send"
            icon={<IoIosSend size={20} />}
            active={currentRoute.includes("account/send")}
          />
          <SidebarItem
            toast={!isMobile}
            text="Trade"
            link="trade"
            icon={<PiChartLineUpBold size={20} />}
          />
          <SidebarItem
            toast={!isMobile}
            text="Exchange"
            icon={<RiExchangeFundsLine size={20} />}
          />
          <SidebarItem
            toast={!isMobile}
            text="History"
            link="history"
            icon={<FaHistory size={20} />}
          />
        </Sidebar>
        <div className="w-full bg-slate-50 dark:bg-default-50">
          <Navbar accountName={userInfo.accountName} />
          {props.children}
        </div>

        {/* <CallAlert onSubmit={() => console.log("submit")} isShow={true} /> */}
        {/* <PhoneVerificationAlert isShow={true} /> */}
        {/* <AccessLockedAlert isShow={true} /> */}
      </main>
    </>
  );
}
