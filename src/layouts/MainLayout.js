"use client";
import Navbar from "@/components/MainNavbar";
import Sidebar, { SidebarElement, SidebarItem } from "@/components/Sidebar";
import { LuWallet } from "react-icons/lu";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoIosSend, IoIosSunny } from "react-icons/io";
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
import { Divider, Switch } from "@nextui-org/react";
import { FaMoon } from "react-icons/fa6";
import { useTheme } from "next-themes";
import { MdOutlineSupportAgent } from "react-icons/md";

export default function MainLayout(props) {
  const router = useRouter();
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
            active={currentRoute === "account"}
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
            link="exchange"
            icon={<RiExchangeFundsLine size={20} />}
          />
          <SidebarItem
            toast={!isMobile}
            text="History"
            link="history"
            icon={<FaHistory size={20} />}
            active={currentRoute.includes("account/history")}
          />

          {isMobile && (
            <>
              <Divider className="my-3" />
              <SidebarItem
                toast={!isMobile}
                text="Support"
                link="support"
                icon={<MdOutlineSupportAgent size={20} />}
                active={currentRoute.includes("account/support")}
              />
              <SidebarElement text="Light/Dark">
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
