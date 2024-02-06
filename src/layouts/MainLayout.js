import Navbar from "@/components/MainNavbar";
import Sidebar, { SidebarItem } from "@/components/Sidebar";
import { LuWallet } from "react-icons/lu";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { RiExchangeFundsLine } from "react-icons/ri";
import { PiChartLineUpBold } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";

export default function MainLayout(props) {
  return (
    <>
      <main className="w-screen flex text-md">
        <Sidebar>
          <SidebarItem text="Balance" icon={<LuWallet size={20} />} active />
          <SidebarItem text="Add" icon={<IoAddCircleSharp size={20} />} />
          <SidebarItem text="Transfer" icon={<IoIosSend size={20} />} />
          <SidebarItem text="Trade" icon={<PiChartLineUpBold size={20} />} />
          <SidebarItem
            text="Exchange"
            icon={<RiExchangeFundsLine size={20} />}
          />
          <SidebarItem text="History" icon={<FaHistory size={20} />} />
        </Sidebar>
        <div className="w-full">
          <Navbar />
          {props.children}
        </div>
      </main>
    </>
  );
}
