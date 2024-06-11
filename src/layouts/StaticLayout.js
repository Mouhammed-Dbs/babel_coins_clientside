import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import screenIs from "@/screen";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function StaticLayout(props) {
  const router = useRouter();
  const [localLang, setLocalLang] = useState(router.locale);
  const [screenSize, setScreenSize] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setScreenSize(screenIs("md"));
    const handleResize = () => {
      setScreenSize(screenIs("md"));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  useEffect(() => {
    document.documentElement.lang = localLang;
    document.documentElement.dir = localLang === "ar" ? "rtl" : "ltr";
  }, [localLang]);

  useEffect(() => {
    setLocalLang(router.locale);
  }, [router]);

  if (!mounted) return null;

  return (
    <>
      <div className="h-screen relative bg-white overflow-hidden">
        <div
          className={`${screenSize ? "block" : "hidden"}`}
          style={{
            position: "absolute",
            width: "55%",
            height: "1000px",
            background:
              "radial-gradient(closest-side, #392193, rgba(68, 70, 207,0.8))",
            backgroundRepeat: "no-repeat",
            top: "-250px",
            left: "-15%",
          }}
        ></div>
        <div
          className={`h-screen ${screenSize ? "block" : "hidden"}`}
          style={{
            position: "absolute",
            width: "55%",
            backgroundColor: "rgba(68, 70, 207,0.8)",
            backgroundRepeat: "no-repeat",
            top: "750px",
            left: "-15%",
          }}
        ></div>
        <div
          className="h-screen"
          style={{
            position: "absolute",
            width: "1000px",
            background:
              "radial-gradient(closest-side, #392193, rgba(68, 70, 207,0.8))",
            backgroundRepeat: "no-repeat",
            left: screenSize ? "40%" : "",
          }}
        ></div>
        <Card
          isBlurred
          className="w-screen h-screen rounded-none"
          style={{ position: "absolute", background: "unset" }}
        ></Card>
        <Navbar
          isBlurred="false"
          style={{ backgroundColor: "unset", direction: "ltr" }}
        >
          <NavbarContent>
            <NavbarBrand
              className="cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div
                className="flex backdrop-blur-md p-1 rounded-md px-2"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <Image
                  src={"/images/logo/webp/babelcoins-logo-512.webp"}
                  alt="babelcoins logo"
                  width={25}
                  height={25}
                ></Image>
                <h1 className="self-center text-xl ml-2 font-bold text-white">
                  Babel coins
                </h1>
              </div>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className="sm:flex gap-4" justify="end">
            <NavbarItem>
              <Dropdown className="bg-white text-black">
                <DropdownTrigger>
                  <Button className="border-2 text-xs gap-unit-1 h-unit-9 rounded-full border-white text-white">
                    {localLang === "ar" ? "Arabic" : "English"}
                    <RiArrowDropDownLine />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  selectedKeys={[localLang]}
                  aria-label="Static Actions"
                  onAction={(key) => {
                    router.push(router.pathname, router.asPath, {
                      locale: key,
                    });
                    setLocalLang(key);
                  }}
                >
                  <DropdownItem key="ar">Arabic</DropdownItem>
                  <DropdownItem key="en">English</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <div className="absolute w-screen h-screen">{props.children}</div>
      </div>
    </>
  );
}
