import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import screenIs from '../screen.js';
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

export default function HomeNavbare() {
    let currentRoute = useRouter().asPath
    const [ mounted, setMounted ] = useState(false)
    const { theme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    if (currentRoute == '/')
        currentRoute = '/home'
    const menuItems = [
        "HOME",
        "EXCHANGE",
        "SOLUTIONS",
        "Fees",
        "Affiliates",
        "Contacts",
    ];
    const styleActiveLink = {
        color: 'var(--primary-color)',
        fontWeight: 'bold',
        borderBottom: '3px solid var(--secondary-color)'
    }

    useEffect(()=>{
        setMounted(true);
    },[])

    if(!mounted) return null
    

    return (
        <Navbar className="backdrop-blur-md bg-white/50 dark:bg-black/50" isBlurred={false} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden"
                />
                <NavbarBrand>
                    <Image src={"/images/logo.svg"} alt="" width={25} height={25}></Image>
                    <h1 className="self-center text-xl ml-2 font-bold">Babel coins</h1>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="sm:flex gap-4" justify="end">
                <div className="hidden md:flex gap-4 justify-end">
                    <NavbarItem isActive={currentRoute === "/home"}>
                        <Link href={"/"} className="text-foreground me-3" style={currentRoute === "/home"?styleActiveLink:{}}>
                            HOME
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive={currentRoute === "/exchange"}>
                        <Link href={"/exchange"} className="text-foreground me-3" style={currentRoute === "/exchange"?styleActiveLink:{}}>
                            EXCHANGE
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive={currentRoute === "/solutions"}>
                        <Link href={"/solutions"} className="text-foreground me-3" style={currentRoute === "/solutions"?styleActiveLink:{}}>
                            SOLUTIONS
                        </Link>
                    </NavbarItem>
                </div>
                <div className="hidden lg:flex gap-4 justify-end">
                    <NavbarItem isActive={currentRoute === "/fees"}>
                        <Link href={'/fees'} className="text-foreground me-2" style={currentRoute === "/fees"?styleActiveLink:{}}>Fees</Link>
                    </NavbarItem>
                    <NavbarItem isActive={currentRoute === "/affiliates"}>
                        <Link href={'/affiliates'} className="text-foreground me-2" style={currentRoute === "/affiliates"?styleActiveLink:{}}>Affiliates</Link>
                    </NavbarItem>
                    <NavbarItem isActive={currentRoute === "/contacts"}>
                        <Link href={'/contacts'} className="text-foreground me-4" style={currentRoute === "/contacts"?styleActiveLink:{}}>Contacts</Link>
                    </NavbarItem>
                </div>
                
                <NavbarItem className="sm:flex">
                    <Switch
                        isSelected={theme === 'dark'}
                        size="sm"
                        startContent={<FaMoon />}
                        endContent={<IoIosSunny />}
                        onClick={() => { 
                            theme === 'dark'? setTheme('light') : setTheme('dark')
                        }}
                    ></Switch>
                </NavbarItem>
                <NavbarItem>
                    <Dropdown>
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
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem hidden={index<3 && screenIs('md')} key={`${item}-${index}`}>
                        <Link
                            
                            color={
                                item.toLowerCase() === currentRoute.slice(1)
                                    ? "primary"
                                    : "foreground"
                            }
                            className={item.toLowerCase() === currentRoute.slice(1)?'font-bold':{}}
                            href={"/"+item.toLowerCase()}
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
