"use client";
import Navbar from "@/components/MainNavbar";
import Sidebar, { SidebarElement, SidebarItem } from "@/components/Sidebar";
import { LuWallet } from "react-icons/lu";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoIosSend, IoIosSunny, IoMdPower } from "react-icons/io";
import { RiExchangeFundsLine } from "react-icons/ri";
import { PiChartLineUpBold } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import CallAlert from "@/components/utils/alerts/CallAlert";
import PhoneVerificationAlert from "@/components/utils/alerts/PhoneVerificationAlert";
import AccessLockedAlert from "@/components/utils/alerts/AccessLockedAlert";
import MyLoading from "@/components/MyLoading";
import { isUserLogged } from "../../public/global_functions/auth";
import { Button, Divider, Switch } from "@nextui-org/react";
import { FaMoon } from "react-icons/fa6";
import { useTheme } from "next-themes";
import { MdOutlineSupportAgent } from "react-icons/md";
import BGShapes from "@/components/utils/BGShapes";
import { useTranslations } from "next-intl";
const UserContext = createContext();
export { UserContext };
export default function MainLayout(props) {
  const router = useRouter();
  const t_w = useTranslations("Words");
  const currentRoute = router.asPath.slice(1);
  const { theme, setTheme } = useTheme();
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
    setPageLoading(false);
    isUserLogged()
      .then((result) => {
        if (result.error) {
          router.replace("/login");
        } else {
          setUserInfo(result.data);
          localStorage.setItem("babel-coins-user-id", result.data._id);
          setPageLoading(false);
          setMounted(true);
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
        msg={t_w("Loading")}
        color="primary"
        className={`text-black dark:text-white mt-24`}
      />
    );
  if (pageLoading)
    return (
      <MyLoading
        msg={t_w("Loading")}
        color="primary"
        className={`h-full text-black dark:text-white mt-24`}
      />
    );
  return (
    <>
      <main className="w-screen flex text-md fixed bg-slate-50 dark:bg-default-50">
        {!currentRoute.includes("account/trade") && (
          <BGShapes
            className="w-full pt-28 h-full"
            fillColor="bg-slate-50 dark:bg-default-50"
          />
        )}
        <Sidebar>
          <SidebarItem
            toast={!isMobile}
            text={t_w("Balance")}
            link=""
            icon={<LuWallet size={20} />}
            active={currentRoute === "account"}
          />
          <SidebarItem
            toast={!isMobile}
            text={t_w("Add")}
            link="add"
            icon={<IoAddCircleSharp size={20} />}
            active={currentRoute.includes("account/add")}
          />
          <SidebarItem
            toast={!isMobile}
            text={t_w("Transfer")}
            link="send"
            icon={<IoIosSend size={20} />}
            active={currentRoute.includes("account/send")}
          />
          <SidebarItem
            toast={!isMobile}
            text={t_w("Trade")}
            link="trade"
            active={currentRoute.includes("account/trade")}
            icon={<PiChartLineUpBold size={20} />}
          />
          <SidebarItem
            toast={!isMobile}
            text={t_w("Exchange")}
            link="exchange"
            active={currentRoute.includes("account/exchange")}
            icon={<RiExchangeFundsLine size={20} />}
          />
          <SidebarItem
            toast={!isMobile}
            text={t_w("History")}
            link="history"
            icon={<FaHistory size={20} />}
            active={currentRoute.includes("account/history")}
          />

          {isMobile && (
            <>
              <Divider className="my-3" />
              <SidebarItem
                toast={!isMobile}
                text={t_w("Support")}
                link="support"
                icon={<MdOutlineSupportAgent size={20} />}
                active={currentRoute.includes("account/support")}
              />
              <SidebarElement text={t_w("Logout")}>
                <Button
                  onClick={() => {
                    localStorage.removeItem("babel-coins-user-token");
                    router.replace("/");
                  }}
                  className="min-w-fit p-0"
                >
                  {" "}
                  <IoMdPower
                    className="hover:cursor-pointer"
                    color="gray"
                    size={25}
                  />
                </Button>
              </SidebarElement>
              <SidebarElement text="Light/Dark" style={{ direction: "ltr" }}>
                <Switch
                  className="p-0 m-0"
                  style={{ maxWidth: "40px" }}
                  isSelected={theme === "dark"}
                  size="sm"
                  startContent={<FaMoon />}
                  endContent={<IoIosSunny />}
                  onClick={() => {
                    theme === "dark" ? setTheme("light") : setTheme("dark");
                  }}
                />
              </SidebarElement>
            </>
          )}
        </Sidebar>
        <div className="w-screen z-10">
          <Navbar accountName={userInfo.accountName} />

          <div className="px-4 md:px-0 w-[92%] pt-2">
            <UserContext.Provider value={{ userInfo, setUserInfo }}>
              {props.children}
            </UserContext.Provider>
          </div>
        </div>
        {/* <CallAlert onSubmit={() => console.log("submit")} isShow={true} /> */}
        {/* <PhoneVerificationAlert isShow={true} /> */}
        {/* <AccessLockedAlert isShow={true} /> */}
      </main>
    </>
  );
}
