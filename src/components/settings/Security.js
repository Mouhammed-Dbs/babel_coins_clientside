import { Button, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Security() {
  const [enableMasterKey, setEnableMasterKey] = useState(false);
  return (
    <div
      className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white/55 dark:bg-default-100/55 backdrop-blur-md shadow-md`}
    >
      {/* Title 1 */}
      <div className="w-full border-b">
        <h1 className="text-sm mb-3 font-bold">{"AUTHENTICATION (2FA)"}</h1>
      </div>

      {/* Content 1 */}
      <div className="mt-10">
        <div>
          <Select
            defaultSelectedKeys={["never_send"]}
            disallowEmptySelection={true}
            label="Send verification code:"
            style={{ backgroundColor: "inherit" }}
            size="sm"
            labelPlacement="outside"
            selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
            classNames={{
              base: "p-[2px] max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
              trigger: "h-7",
            }}
          >
            <SelectItem key="never_send" value="never_send">
              Never send verification code
            </SelectItem>
            <SelectItem key="subnet_change_send" value="subnet_change_send">
              Send when subnet change
            </SelectItem>
            <SelectItem key="ip_address_change" value="ip_address_change">
              Send when IP-address change
            </SelectItem>
            <SelectItem key="always_send" value="always_send">
              Always send code
            </SelectItem>
          </Select>
        </div>
        <div className="mt-8">
          <Select
            defaultSelectedKeys={["email"]}
            disallowEmptySelection={true}
            label="Confirmation method:"
            style={{ backgroundColor: "inherit" }}
            size="sm"
            labelPlacement="outside"
            selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
            classNames={{
              base: "p-[2px] max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
              trigger: "h-7",
            }}
          >
            <SelectItem key="email" value="email">
              E-mail
            </SelectItem>
            <SelectItem key="sms" value="sms">
              SMS
            </SelectItem>
            <SelectItem key="telegram" value="telegram">
              Telegram
            </SelectItem>
          </Select>
        </div>
      </div>

      {/* Title 2 */}
      <div className="w-full border-b mt-9">
        <h1 className="text-sm mb-3 font-bold">RESTORE PASSWORDS</h1>
      </div>

      {/* Content 2 */}
      <div className="mt-10">
        <Select
          defaultSelectedKeys={["never_send"]}
          disallowEmptySelection={true}
          label="Method of sending code:"
          style={{ backgroundColor: "inherit" }}
          size="sm"
          labelPlacement="outside"
          selectorIcon={<IoIosArrowDown color="var(--bg-primary-color)" />}
          classNames={{
            base: "p-[2px] max-w-xs peer w-full md:w-74 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300",
            trigger: "h-7",
          }}
        >
          <SelectItem key="never_send" value="never_send">
            Never Send verification code
          </SelectItem>
          <SelectItem key="email" value="email">
            E-mail
          </SelectItem>
          <SelectItem key="sms" value="sms">
            SMS
          </SelectItem>
          <SelectItem key="telegram" value="telegram">
            Telegram
          </SelectItem>
        </Select>
      </div>

      {/* Title 2 */}
      <div className="w-full border-b mt-9">
        <h1 className="text-sm mb-3 font-bold">MASTER KEY</h1>
      </div>

      {/* Content 3 */}
      <div className="flex items-center mt-10">
        <input
          onChange={() => {
            setEnableMasterKey(!enableMasterKey);
          }}
          checked={enableMasterKey}
          value={enableMasterKey}
          type="checkbox"
          className="accent-primary h-4 w-4"
        ></input>
        <label className="text-sm text-opacity-65 ml-2">
          ENABLE MASTER KEY
        </label>
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
