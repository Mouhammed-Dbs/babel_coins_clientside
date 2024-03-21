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
import {
  MdOutlineSupportAgent,
  MdGroup,
  MdOutlineSwitchAccount,
  MdDateRange,
} from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { PiCardsFill } from "react-icons/pi";

export default function MainNavbare({ accountName }) {
  const router = useRouter();
  const currentRoute = router.asPath.slice(1);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [infoAccountIsOpen, setInfoAccountIsOpen] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const touchstart = () => {
      setSettingsIsOpen(false);
      setInfoAccountIsOpen(false);
    };
    document?.addEventListener("touchstart", touchstart);
    return () => {
      document?.removeEventListener("touchstart", touchstart);
    };
  }, []);

  if (!mounted) return null;

  return (
    <Navbar
      onMouseLeave={() => {
        setInfoAccountIsOpen(false);
        setSettingsIsOpen(false);
      }}
      className="backdrop-blur-md bg-white/65 dark:bg-black/50"
      isBlurred={false}
    >
      <NavbarContent>
        <Button className="hidden text-sm text-green-500 gap-unit-1 h-unit-9 rounded-full shadow-sm shadow-slate-400 dark:shadow-gray-700 bg-white dark:bg-default-50">
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
          <Dropdown
            size="sm"
            className="min-w-28 rounded-sm"
            isOpen={infoAccountIsOpen}
          >
            <DropdownTrigger>
              <Button
                onClick={() => setInfoAccountIsOpen(!infoAccountIsOpen)}
                className="min-w-fit p-0"
                onMouseEnter={() => {
                  setInfoAccountIsOpen(true);
                  setSettingsIsOpen(false);
                }}
              >
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
                    {accountName}
                  </p>
                </div>
                <RiArrowDropDownLine className="text-primary" size={18} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              onMouseEnter={() => {
                setInfoAccountIsOpen(true);
              }}
              onMouseLeave={() => {
                setInfoAccountIsOpen(false);
              }}
            >
              <DropdownItem
                startContent={
                  <IoMdPerson
                    className="text-gray-400 hover:cursor-pointer"
                    size={20}
                  />
                }
                textValue="Account No."
                key="m_account"
              >
                <div className="flex justify-between h-8">
                  <div className="self-center">
                    <span className="block text-xs text-gray-500">
                      Account No.
                    </span>
                    <span className="block text-xs font-bold mt-[2px]">
                      {accountName}
                    </span>
                  </div>

                  <Button
                    size="md"
                    className="min-w-10 p-0 ml-2 h-4 text-primary self-end"
                    onClick={(e) => {
                      e.target.style.color = "green";
                      e.target.innerText = "copied";
                      navigator.clipboard.writeText(accountName);
                    }}
                  >
                    copy
                  </Button>
                </div>
              </DropdownItem>
              <DropdownItem
                startContent={
                  <RiShieldUserLine
                    className="text-gray-400 hover:cursor-pointer"
                    size={20}
                  />
                }
                textValue="Verification"
                key="m_verification"
              >
                <div className="flex justify-between h-8">
                  <div className="self-center">
                    <span className="block text-xs text-gray-500">
                      Verification
                    </span>
                    <span className="block text-xs font-bold mt-[2px]">No</span>
                  </div>
                  <Button
                    size="md"
                    className="min-w-10 p-0 ml-2 h-4 text-primary self-end"
                    onClick={() => {
                      router.push("/account/settings");
                    }}
                  >
                    Go
                  </Button>
                </div>
              </DropdownItem>
              <DropdownItem
                startContent={
                  <MdOutlineSwitchAccount
                    className="text-gray-400 hover:cursor-pointer"
                    size={20}
                  />
                }
                textValue="Account Type"
                key="m_accounttype"
              >
                <div className="flex justify-between h-8">
                  <div className="self-center">
                    <span className="block text-xs text-gray-500">
                      Account Type
                    </span>
                    <span className="block text-xs font-bold mt-[2px]">
                      Registered
                    </span>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem
                startContent={
                  <MdDateRange
                    className="text-gray-400 hover:cursor-pointer"
                    size={20}
                  />
                }
                textValue="Registration"
                key="m_registration"
              >
                <div className="flex justify-between h-8">
                  <div className="self-center">
                    <span className="block text-xs text-gray-500">
                      Registration
                    </span>
                    <span className="block text-xs font-bold mt-[2px]">
                      4/3/2024
                    </span>
                  </div>
                </div>
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
          <Button
            className="min-w-fit p-0"
            onClick={() => {
              router.push("/account/support");
            }}
          >
            <MdOutlineSupportAgent
              className="hover:cursor-pointer"
              color="gray"
              size={25}
            />
          </Button>
        </NavbarItem>
        <Spacer className="hidden md:block" x={1} />
        <NavbarItem>
          <Dropdown
            size="sm"
            className="min-w-28 rounded-sm"
            isOpen={settingsIsOpen}
          >
            <DropdownTrigger>
              <Button
                onClick={() => {
                  setSettingsIsOpen(!settingsIsOpen);
                }}
                className="min-w-fit p-0"
                onMouseEnter={() => {
                  setSettingsIsOpen(true);
                  setInfoAccountIsOpen(false);
                }}
              >
                <IoMdSettings
                  className="hover:cursor-pointer"
                  color="gray"
                  size={20}
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              onMouseEnter={() => {
                setSettingsIsOpen(true);
              }}
              onMouseLeave={() => {
                setSettingsIsOpen(false);
              }}
            >
              <DropdownItem
                onClick={() =>
                  router.asPath != "/account/settings"
                    ? router.push("/account/settings")
                    : null
                }
                startContent={
                  <IoMdSettings
                    className="text-gray-400 hover:cursor-pointer"
                    size={20}
                  />
                }
                textValue="Profile"
                key="m_profile"
              >
                <span className="text-xs font-bold">Profile</span>
              </DropdownItem>
              <DropdownItem
                onClick={() =>
                  router.asPath != "/account/log"
                    ? router.push("/account/log")
                    : null
                }
                startContent={
                  <RiShieldUserLine
                    className="text-gray-400 hover:cursor-pointer"
                    size={20}
                  />
                }
                textValue="Logs"
                key="my_logs"
              >
                <span className="text-xs font-bold">Logs</span>
              </DropdownItem>
              <DropdownItem
                onClick={() =>
                  router.asPath != "/account/referrals"
                    ? router.push("/account/referrals")
                    : null
                }
                startContent={
                  <MdGroup
                    className="text-gray-400 hover:cursor-pointer"
                    size={20}
                  />
                }
                textValue="My Referrals"
                key="my_myreferrals"
              >
                <span className="text-xs font-bold">My Referrals</span>
              </DropdownItem>
              <DropdownItem
                startContent={
                  <PiCardsFill
                    className="text-gray-400 hover:cursor-pointer"
                    size={20}
                  />
                }
                textValue="My Cards"
                key="my_mycards"
              >
                <span className="text-xs font-bold">My Cards</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <Spacer className="hidden md:block" x={1} />
        <NavbarItem>
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
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
