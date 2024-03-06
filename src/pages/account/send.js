import { Avatar, Button, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import MyInput from "@/components/utils/MyInput";
import screenIs from "@/screen";

export default function Send(props) {
  const router = useRouter();
  const [templates, setTemplates] = useState(["b23523553", "b29523553"]);
  const [accounts, setAccounts] = useState([
    { type: "crypto", name: "BTC", balance: "200" },
    { type: "crypto", name: "ETH", balance: "50" },
  ]);
  const [fiatAccounts, setFiateAccounts] = useState(["USD", "EUR", "RUB"]);
  const [screenSize, setScreenSize] = useState(false);

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
  return (
    <div className="h-screen container m-auto no-scrollbar overflow-y-scroll pb-[150px]">
      <div className="w-full md:w-[720px] lg:w-[950px] m-auto mt-4 pb-3">
        <div className="w-fit ml-4 md:ml-0 bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50 dark:bg-default-50">
            TRANSFER
          </h1>
        </div>
      </div>
      <div className="p-4 py-10 md:px-8 ml-4 mt-6 md:m-auto md:mt-10 w-11/12 md:w-[720px] lg:w-[950px] md:text-center backdrop-blur-xs bg-white dark:bg-default-100 rounded-lg shadow-md">
        <div className="lg:flex lg:gap-10">
          <div className="lg:w-2/3 lg:ml-5">
            <div className="md:flex m-auto w-full gap-4 items-center">
              <label className="text-right text-sm md:text-base w-36">
                Choose system
              </label>
              <Select
                aria-label="none"
                style={{ backgroundColor: "inherit" }}
                size="sm"
                items={accounts}
                labelPlacement="outside"
                placeholder="CHOOSE SYSTEM"
                selectorIcon={
                  <IoIosArrowDown color="var(--bg-primary-color)" />
                }
                classNames={{
                  base: "p-[2px] max-w-xs peer w-full md:w-64 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                  trigger: "h-6",
                }}
                renderValue={(items) => {
                  return items.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                      <Avatar
                        alt={item.data.name}
                        className="flex-shrink-0 h-6 w-6"
                        size="sm"
                        src={`/images/coins/${item.key}.png`}
                      />
                      <div className="flex flex-col">
                        <span>{item.data.balance}</span>
                        <span className="text-default-500 text-tiny">
                          {item.data.name}
                        </span>
                      </div>
                    </div>
                  ));
                }}
              >
                {(item) => (
                  <SelectItem key={item["name"]} textValue={item["name"]}>
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={item["name"]}
                        className="flex-shrink-0 h-6 w-6"
                        size="sm"
                        src={`/images/coins/${item["name"]}.png`}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{item["balance"]}</span>
                        <span className="text-tiny text-default-400">
                          {item["name"]}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </div>
            <div className="md:flex m-auto w-full gap-4 items-center mt-3">
              <label className="text-right text-sm md:text-base w-36">
                Templates
              </label>
              <Select
                aria-label="none"
                style={{ backgroundColor: "inherit" }}
                size="sm"
                labelPlacement="outside"
                placeholder="CHOOSE TEMPLATE"
                selectorIcon={
                  <IoIosArrowDown color="var(--bg-primary-color)" />
                }
                classNames={{
                  base: "p-[2px] max-w-xs peer w-full md:w-64 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                  trigger: "h-7",
                }}
              >
                {templates.map((template) => (
                  <SelectItem key={template} value={template}>
                    {template}
                  </SelectItem>
                ))}
              </Select>
            </div>
            {/* Account */}
            <div className="md:flex m-auto w-full gap-4 items-center mt-3">
              <label className="hidden md:block text-right text-sm md:text-base w-36 mt-3">
                Account
              </label>
              <MyInput
                color="border-gray-500"
                className="w-full md:w-64 border-black mb-3"
                item={{
                  label: screenSize ? undefined : "Account",
                  name: "account",
                  type: "text",
                  placeholder: "b0320320",
                }}
              />
            </div>
            {/* Comment */}
            <div className="md:flex m-auto w-full  gap-4 items-center">
              <label className="hidden md:block text-right text-sm md:text-base w-36 mt-3">
                Comment
              </label>
              <MyInput
                color="border-gray-500"
                className="w-full md:w-64 border-black mb-3"
                item={{
                  label: screenSize ? undefined : "Comment",
                  name: "comment",
                  type: "text",
                  placeholder: "",
                }}
              />
            </div>
            {/* Secret Code */}
            <div className="flex m-auto w-full md:gap-4 gap-2 items-center">
              <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36 mt-3">
                Secret Code
              </label>
              <MyInput
                color="border-gray-500"
                className="w-full md:w-48 border-black mb-3"
                item={{
                  label: screenSize ? undefined : "Secret Code",
                  name: "secretcode",
                  type: "text",
                  placeholder: "Secret code",
                }}
              />
              <Select
                aria-label="none"
                classNames={{
                  base: "max-w-xs min-w-20 peer mt-3 w-24 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                  trigger: "h-8",
                }}
                size="sm"
                style={{ backgroundColor: "inherit" }}
                labelPlacement="outside-left"
                selectorIcon={
                  <IoIosArrowDown color="var(--bg-primary-color)" />
                }
                placeholder="USD"
              >
                {fiatAccounts.map((account) => (
                  <SelectItem key={account} value={account}>
                    {account}
                  </SelectItem>
                ))}
              </Select>
            </div>
            {/* Amount */}
            <div className="flex m-auto w-full md:gap-4 gap-2 items-center">
              <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36 mt-3">
                Amount
              </label>
              <MyInput
                color="border-gray-500"
                className="w-full md:w-48 border-black mb-3"
                item={{
                  label: screenSize ? undefined : "Amount",
                  name: "amount",
                  type: "number",
                  placeholder: "$0",
                }}
              />
              <p className="w-24 min-w-20 text-center pt-[3px] mt-3 h-[34px] bg-inherit border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md">
                USD
              </p>
            </div>
            {/* Total */}
            <div className="flex m-auto w-full md:gap-4 gap-2 items-center">
              <label className="hidden md:block text-right text-sm md:text-base w-14 md:w-36 mt-3">
                Total
              </label>
              <MyInput
                color="border-gray-500"
                className="w-full md:w-48 border-black mb-3"
                item={{
                  label: screenSize ? undefined : "Total",
                  name: "amount",
                  type: "number",
                  placeholder: "$0",
                }}
              />
              <Select
                aria-label="none"
                classNames={{
                  base: "max-w-xs min-w-20 peer mt-3 w-24 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
                  trigger: "h-8",
                }}
                size="sm"
                style={{ backgroundColor: "inherit" }}
                labelPlacement="outside-left"
                selectorIcon={
                  <IoIosArrowDown color="var(--bg-primary-color)" />
                }
                placeholder="USD"
              >
                {fiatAccounts.map((account) => (
                  <SelectItem key={account} value={account}>
                    {account}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="block w-full h-fit text-start border-l lg:border-l-2 pl-3 mt-4">
            <h1 className="font-bold text-sm">Transfer to BabelCoins Wallet</h1>
            <div className="my-4 text-xs">
              <p>0.2 $/€</p>
              <p className="text-gray-400">Min. per transaction</p>
            </div>
            <div className="my-4 text-xs">
              <p>Instantly</p>
              <p className="text-gray-400">Transfer term</p>
            </div>
          </div>
        </div>

        <div className="w-fit m-auto lg:m-0 lg:ml-44">
          <Button className="bg-orange text-white rounded-full mt-5 px-10">
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
}