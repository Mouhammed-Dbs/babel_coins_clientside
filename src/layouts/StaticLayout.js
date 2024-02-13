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

export default function StaticLayout(props) {
  const [screenSize, setScreenSize] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(screenIs("md"));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);
  return (
    <div className="h-screen relative bg-white overflow-hidden">
      {screenSize && (
        <>
          <div
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
            style={{
              position: "absolute",
              width: "55%",
              height: "1000px",
              backgroundColor: "rgba(68, 70, 207,0.8)",
              backgroundRepeat: "no-repeat",
              top: "750px",
              left: "-15%",
            }}
          ></div>
        </>
      )}
      <div
        style={{
          position: "absolute",
          width: "1000px",
          height: "1000px",
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
      <Navbar isBlurred="false" style={{ backgroundColor: "unset" }}>
        <NavbarContent>
          <NavbarBrand>
            <Image
              src={"/images/logo.svg"}
              alt=""
              width={25}
              height={25}
            ></Image>
            <h1 className="self-center text-xl ml-2 font-bold text-white">
              Babel coins
            </h1>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="sm:flex gap-4" justify="end">
          <NavbarItem>
            <Dropdown className="bg-white text-black">
              <DropdownTrigger>
                <Button className="border-2 text-xs gap-unit-1 h-unit-9 rounded-full border-white text-white">
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
      </Navbar>
      <main className="w-screen text-md absolute">{props.children}</main>
    </div>
  );
}
