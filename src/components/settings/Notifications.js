import { Button, Select, SelectItem } from "@nextui-org/react";
import { IoIosArrowDown } from "react-icons/io";
import MyInput from "../utils/MyInput";

export default function Notifications() {
  return (
    <div
      className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white dark:bg-default-100 shadow-md`}
    >
      {/* Title 1 */}
      <div className="w-full border-b">
        <h1 className="text-sm mb-3 font-bold">AUTHENTICATION</h1>
      </div>

      {/* Content 1 */}
      <div className="mt-10">
        <Select
          defaultSelectedKeys={["disabled"]}
          disallowEmptySelection={true}
          label="Notification of successful authorization:"
          style={{ backgroundColor: "inherit" }}
          size="sm"
          labelPlacement="outside"
          selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
          classNames={{
            base: "p-[2px] max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
            trigger: "h-7",
          }}
        >
          <SelectItem key="enabled" value="enabled">
            Enabled
          </SelectItem>
          <SelectItem key="disabled" value="disabled">
            Disabled
          </SelectItem>
        </Select>
      </div>

      {/* Title 2 */}
      <div className="w-full border-b mt-9">
        <h1 className="text-sm mb-3 font-bold">INTERNAL TRANSFERS</h1>
      </div>

      {/* Content 2 */}
      <div className="mt-10">
        <Select
          defaultSelectedKeys={["disabled"]}
          disallowEmptySelection={true}
          label="Incoming payment notification:"
          style={{ backgroundColor: "inherit" }}
          size="sm"
          labelPlacement="outside"
          selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
          classNames={{
            base: "p-[2px] mb-4 max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
            trigger: "h-7",
          }}
        >
          <SelectItem key="disabled" value="disabled">
            Disabled
          </SelectItem>
          <SelectItem key="send_email" value="email">
            Send to email
          </SelectItem>
          <SelectItem key="send_sms" value="sms">
            Send via SMS
          </SelectItem>
        </Select>
        <label className="text-xs md:text-sm pl-1">
          Minimum amount for notification:
        </label>
        <div className="flex items-end gap-1">
          <MyInput
            color="border-gray-500"
            className="w-64 border-black"
            item={{
              name: "minimum_amount",
              type: "number",
              placeholder: "1",
            }}
          />
          <p className="w-fit text-center px-3 pt-[3px] mb-[1px] h-[34px] bg-inherit border-2 dark:border-slate-400 border-black border-opacity-55 rounded-md">
            USD
          </p>
        </div>
      </div>
      <Button
        onClick={() => {}}
        size="sm"
        className="bg-orange text-sm rounded-full mt-10 p-4 text-white"
      >
        CONFIRM
      </Button>
    </div>
  );
}
