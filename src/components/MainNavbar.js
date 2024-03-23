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
import Link from "next/link";

export default function MainNavbare({ accountName }) {
  const router = useRouter();
  const currentRoute = router.asPath.slice(1);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [infoAccountIsOpen, setInfoAccountIsOpen] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  useEffect(() => {
    setMounted(true);

    const touchstart = (e) => {
      console.log(e);
      if (
        !e.target.classList.value.split(" ").includes("dropxxxblure") &&
        !e.target.parentNode.classList.value.split(" ").includes("dropxxxblure")
      ) {
        setSettingsIsOpen(false);
        setInfoAccountIsOpen(false);
      }
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
        <NavbarItem className="flex items-center hover:cursor-pointer">
          <Dropdown
            size="sm"
            className="min-w-28 rounded-sm"
            isOpen={infoAccountIsOpen}
          >
            <DropdownTrigger>
              <Button
                onClick={() => {
                  setInfoAccountIsOpen(!infoAccountIsOpen);
                }}
                className="min-w-fit p-0 dropxxxblure"
                onMouseEnter={() => {
                  setInfoAccountIsOpen(true);
                  setSettingsIsOpen(false);
                }}
              >
                <IoMdPerson
                  className={`dropxxxblure ${
                    currentRoute === "account"
                      ? "text-primary"
                      : "text-gray-500"
                  }`}
                  size={25}
                />

                <div className="dropxxxblure ml-1 text-xs text-gray-500">
                  <label className="dropxxxblure">Account No.</label>
                  <p className="dropxxxblure text-center text-black dark:text-white">
                    {accountName}
                  </p>
                </div>
                <RiArrowDropDownLine
                  className="dropxxxblure text-primary"
                  size={18}
                />
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
                onClick={(e) => {
                  setInfoAccountIsOpen(false);
                }}
                startContent={
                  <IoMdPerson className="text-gray-400" size={20} />
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
                    className="dropxxxblure min-w-10 p-0 ml-2 h-4 text-primary self-end"
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
                onClick={() => setInfoAccountIsOpen(false)}
                startContent={
                  <RiShieldUserLine className="text-gray-400" size={20} />
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
                    className="dropxxxblure min-w-11 p-0 ml-2 h-5 text-primary self-end"
                    onClick={() => {
                      router.push("/account/settings");
                      setInfoAccountIsOpen(false);
                    }}
                  >
                    Go
                  </Button>
                </div>
              </DropdownItem>
              <DropdownItem
                onClick={() => setInfoAccountIsOpen(false)}
                startContent={
                  <MdOutlineSwitchAccount className="text-gray-400" size={20} />
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
                onClick={() => setInfoAccountIsOpen(false)}
                startContent={
                  <MdDateRange className="text-gray-400" size={20} />
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
              <DropdownItem
                textValue="toggel"
                onClick={() => setInfoAccountIsOpen(false)}
              >
                <div className="flex justify-around gap-4">
                  <ToggelItemMenue
                    label="IP Security"
                    value={true}
                    link="/account/settings?tab=security"
                  />
                  <ToggelItemMenue
                    label="SMS Security"
                    value={false}
                    link="/account/settings?tab=security"
                  />
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
        <NavbarItem className="hidden md:block">
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
                className="dropxxxblure min-w-fit p-0"
                onMouseEnter={() => {
                  setSettingsIsOpen(true);
                  setInfoAccountIsOpen(false);
                }}
              >
                <IoMdSettings
                  className="dropxxxblure hover:cursor-pointer"
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
                onClick={() => {
                  setSettingsIsOpen(false);
                  router.asPath != "/account/settings"
                    ? router.push("/account/settings")
                    : null;
                }}
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
                onClick={() => {
                  setSettingsIsOpen(false);
                  router.asPath != "/account/log"
                    ? router.push("/account/log")
                    : null;
                }}
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
                onClick={() => {
                  setSettingsIsOpen(false);
                  router.asPath != "/account/referrals"
                    ? router.push("/account/referrals")
                    : null;
                }}
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
                onClick={() => {
                  setSettingsIsOpen(false);
                  router.asPath != "/account/mycards"
                    ? router.push("/account/mycards")
                    : null;
                }}
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

function ToggelItemMenue({ label, value, link }) {
  return (
    <div className="dropxxxblure grid grid-rows-2 gap-2">
      <span className="dropxxxblure text-gray-500 self-center">{label}</span>
      <Link
        href={link}
        className={`dropxxxblure flex justify-between border-1 rounded-md min-w-10 text-center w-fit ${
          value ? "border-green-500 bg-green-500" : "border-red-500 bg-red-500"
        }`}
      >
        {value && (
          <span className="dropxxxblure w-2 h-full bg-white rounded-s-xl rounded-e-md"></span>
        )}
        <span className="dropxxxblure w-full text-white">
          {value ? "On" : "Off"}
        </span>
        {!value && (
          <span className="dropxxxblure w-2 h-full bg-white rounded-e-xl rounded-s-md"></span>
        )}
      </Link>
    </div>
  );
}
