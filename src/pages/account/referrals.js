import MyInput from "@/components/utils/MyInput";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FaRegCopy } from "react-icons/fa6";
export default function Referrals(props) {
  const router = useRouter();
  return (
    <div className="h-screen container m-auto no-scrollbar overflow-y-scroll pb-[150px]">
      <div className="w-full md:w-[520px] lg:w-[790px] m-auto mt-4 pb-3">
        <div className="w-fit ml-4 md:ml-0 bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50 dark:bg-default-50">
            REFERRALS
          </h1>
        </div>
      </div>
      <div className="ml-4 mt-6 md:m-auto md:mt-10 w-11/12 md:w-[520px] lg:w-[790px] py-8 px-3 md:px-6 backdrop-blur-xs bg-white dark:bg-default-100 rounded-lg shadow-md">
        {/* Title */}
        <div className="w-full border-b">
          <h1 className="text-sm text-primary font-bold mb-3">MY REFERRALS</h1>
        </div>

        {/* Box 1 Referrals */}
        <div className="w-full border border-secondary text-gray-600 dark:text-gray-200 rounded-md mt-5 py-5 px-2">
          <div className="flex w-20 h-20 text-2xl m-auto p-5 rounded-full bg-secondary text-white">
            <span className="self-center">10%</span>
          </div>
          <p className="w-fit mt-4 text-sm text-secondary m-auto">
            CURRENT PLAN
          </p>
          <p className="w-fit mt-1 text-xs m-auto">{"< 100$"}</p>
          <p className="w-fit mt-1 text-xs m-auto">{"Total earning: 0.00$"}</p>
          <div className="max-w-max m-auto mt-10">
            <h1 className="font-bold text-sm">Your partner links:</h1>
            <div className="flex mt-3">
              <div className="flex w-3/4 p-1 border text-sm rounded-sm">
                <p className="self-center break-all">
                  {"http://localhost:3000/account/referrals"}
                </p>
              </div>
              <Button className="h-10 min-w-unit-0 md:min-w-unit-20 bg-orange text-white rounded-full text-xs ml-2 self-center">
                <FaRegCopy className="block md:hidden text-base" />
                <span className="hidden md:block">{"COPY"}</span>
              </Button>
            </div>
            <div className="flex mt-3">
              <div className="flex w-3/4 p-1 border text-sm rounded-sm">
                <p className="self-center break-all">
                  {
                    "http://localhost:3000/account/referrals/account/referrals/account/referrals"
                  }
                </p>
              </div>
              <Button className="h-10 min-w-unit-0 md:min-w-unit-20 bg-orange text-white rounded-full text-xs ml-2 self-center">
                <FaRegCopy className="block md:hidden text-base" />
                <span className="hidden md:block">{"COPY"}</span>
              </Button>
            </div>
            <div className="flex mt-3">
              <div className="flex w-3/4 p-1 border text-sm rounded-sm">
                <p className="self-center break-all">
                  {"http://localhost:3000/account/referrals"}
                </p>
              </div>
              <Button className="h-10 min-w-unit-0 md:min-w-unit-20 bg-orange text-white rounded-full text-xs ml-2 self-center">
                <FaRegCopy className="block md:hidden text-base" />
                <span className="hidden md:block">{"COPY"}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Box 2 Referrals */}
        <div className="w-full border-b border-gray-500 text-gray-600 dark:text-gray-200 mt-5 py-6">
          <div className="flex w-20 h-20 text-2xl m-auto p-5 rounded-full bg-gray-400 text-white">
            <span className="self-center">10%</span>
          </div>
          <p className="w-fit mt-4 text-sm text-secondary m-auto">
            CURRENT PLAN
          </p>
          <p className="w-fit mt-1 text-xs m-auto">{"< 100$"}</p>
          <p className="w-fit mt-1 text-xl m-auto">{"100.00 $ LEFT"}</p>
          <p className="w-fit mt-1 text-[11px] m-auto">
            {"To Go To The Next Level"}
          </p>
        </div>

        {/* Box form */}
        <div className="md:flex md:gap-5 w-full mt-16 px-4">
          <MyInput
            color="border-gray-500"
            className="w-64 border-black mb-3"
            item={{
              name: "name_user",
              type: "text",
              placeholder: "",
              label: "User:",
            }}
          />
          <MyInput
            color="border-gray-500"
            className="w-64 border-black mb-3"
            item={{
              name: "from_user",
              type: "text",
              placeholder: "",
              label: "From:",
            }}
          />
          <MyInput
            color="border-gray-500"
            className="w-64 border-black mb-3"
            item={{
              name: "to_user",
              type: "text",
              placeholder: "",
              label: "To:",
            }}
          />
          <Button className="h-10 bg-orange text-white rounded-full text-sm md:ml-2 self-center">
            APPLY
          </Button>
        </div>

        {/* Table */}
        <div className="mt-6 md:m-auto md:mt-10 w-full pb-3 text-center backdrop-blur-xs bg-white dark:bg-default-100">
          <div className="flex p-3 py-5">
            <h3 className="text-primary text-sm md:text-base w-1/3 break-words">
              DATE OF REGESTRATION
            </h3>
            <h3 className="text-primary text-sm md:text-base w-1/3">USER</h3>
            <h3 className="text-primary text-sm md:text-base w-1/3">PROFIT</h3>
          </div>
          <ul className="w-full">
            <ItemList
              date={"31 Aug 2023 00:27"}
              user={"Mouhammed"}
              profit="0.25 %"
            />
            <ItemList date={"21 Oct 2023 00:27"} user={"Ali"} profit="0.7 %" />
          </ul>
        </div>
      </div>
    </div>
  );
}

function ItemList({ date, user, profit }) {
  return (
    <li className="flex md:p-3 p-1 border-b-1 border-gray-400 py-5">
      <div className="flex w-1/3">
        <p className="w-full text-xs opacity-70 self-center md:px-4 break-words">
          {date}
        </p>
      </div>
      <div className="flex w-1/3">
        <p className="w-full text-xs opacity-70 self-center md:px-4 break-words">
          {user}
        </p>
      </div>
      <div className="flex w-1/3">
        <p className="w-full text-xs opacity-70 self-center md:px-4 break-words">
          {profit}
        </p>
      </div>
    </li>
  );
}
