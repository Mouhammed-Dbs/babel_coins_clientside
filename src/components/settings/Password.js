import { Button } from "@nextui-org/react";
import MyInput from "../utils/MyInput";

export default function Password() {
  return (
    <div
      className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white dark:bg-default-100 shadow-md`}
    >
      {/* Title */}
      <div className="w-full border-b">
        <h1 className="text-sm mb-3 font-bold">CHANGE PASSWORD</h1>
      </div>

      {/* Content */}
      <div className="mt-10">
        <MyInput
          color="border-gray-500"
          className="w-full border-black mb-3"
          item={{
            name: "current_pass",
            type: "text",
            placeholder: "",
            label: "Your password:",
          }}
        />
        <MyInput
          color="border-gray-500"
          className="w-full border-black mb-3"
          item={{
            name: "new_pass",
            type: "text",
            placeholder: "",
            label: "New password:",
          }}
        />
        <MyInput
          color="border-gray-500"
          className="w-full border-black mb-3"
          item={{
            name: "repeat_new_pass",
            type: "text",
            placeholder: "",
            label: "Repeat new password:",
          }}
        />
      </div>

      <Button
        onClick={() => {}}
        size="sm"
        className="bg-orange text-sm rounded-full mt-10 p-4 text-white"
      >
        MODIFY
      </Button>
    </div>
  );
}
