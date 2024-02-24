import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Switch,
  Spacer,
} from "@nextui-org/react";
import { useRouter } from "next/router.js";
import {
  IoMdNotifications,
  IoMdPerson,
  IoMdSettings,
  IoMdPower,
} from "react-icons/io";
import { MdOutlineSupportAgent, MdGroup } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { PiCardsFill } from "react-icons/pi";

export default function MainNavbare() {
  const router = useRouter();
  const currentRoute = router.asPath.slice(1);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Navbar
      className="backdrop-blur-md bg-white/65 dark:bg-black/50"
      isBlurred={false}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <Button className="text-sm text-green-500 gap-unit-1 h-unit-9 rounded-full shadow-sm shadow-slate-400 dark:shadow-gray-700 bg-white dark:bg-default-50">
          $0.00
          <RiArrowDropDownLine size={25} />
        </Button>
      </NavbarContent>
      <NavbarContent>
        <NavbarItem>
          <Button className="min-w-fit p-0">
            <IoMdNotifications
              className={`hover:cursor-pointer ${
                currentRoute === "account/messages"
                  ? "text-primary"
                  : "text-gray-500"
              }`}
              size={25}
              onClick={() => {
                router.push("/account/messages");
              }}
            />
          </Button>
        </NavbarItem>
        <Spacer className="hidden md:block" x={1} />
        <NavbarItem className="hidden md:flex items-center hover:cursor-pointer">
          <Dropdown size="sm" className="min-w-28 rounded-sm">
            <DropdownTrigger>
              <Button className="min-w-fit p-0">
                <IoMdPerson
                  className={`${
                    currentRoute === "account"
                      ? "text-primary"
                      : "text-gray-500"
                  }`}
                  size={25}
                />

                <div className="ml-1 text-xs text-gray-500">
                  <label>Account No.</label>
                  <p className="text-center text-black dark:text-white">
                    B023065820
                  </p>
                </div>
                <RiArrowDropDownLine className="text-primary" size={18} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                startContent={
                  <IoMdPerson
                    className="text-gray-400 hover:cursor-pointer"
                    size={15}
                  />
                }
                key="m_account"
              >
                <span className="text-xs">Account No.</span>
              </DropdownItem>
              <DropdownItem
                startContent={
                  <RiShieldUserLine
                    className="text-gray-400 hover:cursor-pointer"
                    size={15}
                  />
                }
                key="m_verification"
              >
                <span className="text-xs">Verification</span>
              </DropdownItem>
              <DropdownItem
                startContent={
                  <MdGroup
                    className="text-gray-400 hover:cursor-pointer"
                    size={15}
                  />
                }
                key="m_accounttype"
              >
                {" "}
                <span className="text-xs">Account Type</span>
              </DropdownItem>
              <DropdownItem
                startContent={
                  <PiCardsFill
                    className="text-gray-400 hover:cursor-pointer"
                    size={15}
                  />
                }
                key="m_registration"
              >
                {" "}
                <span className="text-xs"> Registration</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <Spacer className="hidden md:block" x={1} />
        <NavbarItem className="hidden md:block">
          <Dropdown className="min-w-28 rounded-md">
            <DropdownTrigger>
              <Button className="border-2 text-xs gap-unit-1 h-unit-9 rounded-full border-primary">
                English
                <RiArrowDropDownLine />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">Arabic</DropdownItem>
              <DropdownItem key="copy">English</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <Spacer className="hidden md:block" x={1} />
        <NavbarItem>
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
        <Spacer className="hidden md:block" x={1} />
        <NavbarItem className="hidden md:block">
          <Button className="min-w-fit p-0">
            <MdOutlineSupportAgent
              className="hover:cursor-pointer"
              color="gray"
              size={25}
            />
          </Button>
        </NavbarItem>
        <Spacer className="hidden md:block" x={1} />
        <NavbarItem>
          <Dropdown size="sm" className="min-w-28 rounded-sm">
            <DropdownTrigger>
              <Button className="min-w-fit p-0">
                <IoMdSettings
                  className="hover:cursor-pointer"
                  color="gray"
                  size={25}
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                onClick={() =>
                  router.asPath != "/account/settings"
                    ? router.push("/account/settings")
                    : null
                }
                startContent={
                  <IoMdSettings
                    className="text-gray-400 hover:cursor-pointer"
                    size={15}
                  />
                }
                key="m_profile"
              >
                <span className="text-xs">Profile</span>
              </DropdownItem>
              <DropdownItem
                startContent={
                  <RiShieldUserLine
                    className="text-gray-400 hover:cursor-pointer"
                    size={15}
                  />
                }
                key="my_logs"
              >
                <span className="text-xs">Logs</span>
              </DropdownItem>
              <DropdownItem
                startContent={
                  <MdGroup
                    className="text-gray-400 hover:cursor-pointer"
                    size={15}
                  />
                }
                key="my_myreferrals"
              >
                {" "}
                <span className="text-xs">My Referrals</span>
              </DropdownItem>
              <DropdownItem
                startContent={
                  <PiCardsFill
                    className="text-gray-400 hover:cursor-pointer"
                    size={15}
                  />
                }
                key="my_mycards"
              >
                {" "}
                <span className="text-xs"> My Cards</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <Spacer className="hidden md:block" x={1} />
        <NavbarItem>
          <Button
            onClick={() => {
              localStorage.removeItem("babel-coins-user-id");
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
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
