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
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router.js";
import Link from "next/link.js";

export default function MainNavbare() {
  let currentRoute = useRouter().asPath;
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Navbar
      className="backdrop-blur-md bg-white/50 dark:bg-black/50"
      isBlurred={false}
      onMenuOpenChange={setIsMenuOpen}
    >
      <p>Account</p>
    </Navbar>
  );
}
