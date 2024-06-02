import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import screenIs from "../screen.js";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Switch,
  Spacer,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router.js";
import Link from "next/link.js";
import { useTranslations } from "next-intl";

export default function HomeNavbare() {
  const t = useTranslations("HomeNavbar");
  const router = useRouter();
  let currentRoute = router.asPath;
  // const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [screenSize, setScreenSize] = useState(false);
  const [localLang, setLocalLang] = useState(router.locale);
  if (currentRoute == "/") currentRoute = "/home";
  const menuItems = [
    "HOME",
    "EXCHANGE",
    "SOLUTIONS",
    "Fees",
    "Affiliates",
    "Contacts",
  ];
  const styleActiveLink = {
    color: "var(--primary-color)",
    fontWeight: "bold",
    borderBottom: "3px solid var(--secondary-color)",
  };
  useEffect(() => {
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

  return (
    <Navbar
      className="backdrop-blur-md bg-opacity-65"
      isBlurred={false}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarBrand
          style={{ direction: "ltr" }}
          className="cursor-pointer justify-end"
          onClick={() => router.replace("/")}
        >
          <Image
            className="h-6 w-6 md:h-8 md:w-8"
            src={"/images/logo/webp/babelcoins-logo-512.webp"}
            alt="babelcoins logo"
            width={25}
            height={25}
          ></Image>
          <h1 className="self-center text-lg md:text-xl ml-2 font-bold">
            Babel coins
          </h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:flex" justify="end">
        <div className="hidden md:flex gap-4 justify-end">
          <NavbarItem isActive={currentRoute === "/home"}>
            <Link
              href={router.locale + "/"}
              className="text-foreground me-3"
              style={currentRoute === "/home" ? styleActiveLink : {}}
            >
              {t("home")}
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentRoute === "/exchange"}>
            <Link
              href={router.locale + "/exchange"}
              className="text-foreground me-3"
              style={currentRoute === "/exchange" ? styleActiveLink : {}}
            >
              {t("exchange")}
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentRoute === "/solutions"}>
            <Link
              href={router.locale + "/solutions"}
              className="text-foreground me-3"
              style={currentRoute === "/solutions" ? styleActiveLink : {}}
            >
              {t("solutions")}
            </Link>
          </NavbarItem>
        </div>
        <div className="hidden lg:flex gap-4 justify-end">
          <NavbarItem isActive={currentRoute === "/fees"}>
            <Link
              href={router.locale + "/fees"}
              className="text-foreground me-2"
              style={currentRoute === "/fees" ? styleActiveLink : {}}
            >
              {t("fees")}
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentRoute === "/affiliates"}>
            <Link
              href={router.locale + "/affiliates"}
              className="text-foreground me-2"
              style={currentRoute === "/affiliates" ? styleActiveLink : {}}
            >
              {t("affiliates")}
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentRoute === "/contact-us"}>
            <Link
              href={router.locale + "/contact-us"}
              className="text-foreground me-4"
              style={currentRoute === "/contact-us" ? styleActiveLink : {}}
            >
              {t("contacts")}
            </Link>
          </NavbarItem>
        </div>
        <div className="flex justify-end md:gap-4">
          {/* Theme */}
          <NavbarItem className="sm:flex self-center">
            <Switch
              isSelected={theme === "dark"}
              size="sm"
              startContent={<FaMoon />}
              endContent={<IoIosSunny />}
              onClick={() => {
                theme === "dark" ? setTheme("light") : setTheme("dark");
              }}
            ></Switch>
          </NavbarItem>
          {/* Language */}
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button className="border-2 text-xs gap-unit-1 h-unit-9 rounded-full border-primary">
                  {localLang.toUpperCase()}
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
                <DropdownItem key="ar">AR</DropdownItem>
                <DropdownItem key="en">EN</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </div>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            hidden={index < 3 && screenSize == "md"}
            key={`${item}-${index}`}
          >
            <Link
              color={
                item.toLowerCase() === currentRoute.slice(1)
                  ? "primary"
                  : "foreground"
              }
              className={
                item.toLowerCase() === currentRoute.slice(1) ? "font-bold" : {}
              }
              href={
                "/" +
                (item === "HOME"
                  ? ""
                  : item === "Contacts"
                  ? "contact-us"
                  : item.toLowerCase())
              }
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
