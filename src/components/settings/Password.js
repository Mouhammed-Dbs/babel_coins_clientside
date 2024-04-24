import { Button } from "@nextui-org/react";
import MyInput from "../utils/MyInput";
import { useState } from "react";
import ErrorMessage from "../utils/ErrorMessage";
import {
  validatePassword,
  validateReapeatPassword,
} from "../../../public/global_functions/validation";

export default function Password() {
  const [inputCurrentPassword, setInputCurrentPassword] = useState("");
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputRepeatNewPassword, setInputRepeatNewPassword] = useState("");
  const [validate, setValidate] = useState({ msg: "", error: false });
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
          defaultValue={inputCurrentPassword}
          onChange={(e) => {
            setInputCurrentPassword(e.target.value);
            validatePassword({
              password: e.target.value,
            })
              .then(() => {
                setValidate({ error: false, msg: "" });
              })
              .catch((error) => {
                setValidate({ error: true, msg: error[0] });
              });
          }}
          color="border-gray-500"
          className="w-full md:w-64 border-black mb-3"
          item={{
            name: "current_pass",
            type: "text",
            placeholder: "",
            label: "Your password:",
          }}
        />
        <MyInput
          defaultValue={inputNewPassword}
          onChange={(e) => {
            setInputNewPassword(e.target.value);
            validatePassword({
              password: e.target.value,
            })
              .then(() => {
                setValidate({ error: false, msg: "" });
                if (inputRepeatNewPassword.length > 0)
                  validateReapeatPassword(e.target.value, {
                    repeatPassword: inputRepeatNewPassword,
                  })
                    .then(() => {
                      setValidate({ error: false, msg: "" });
                    })
                    .catch((error) => {
                      setValidate({ error: true, msg: error[0] });
                    });
              })
              .catch((error) => {
                setValidate({ error: true, msg: error[0] });
              });
          }}
          color="border-gray-500"
          className="w-full md:w-64 border-black mb-3"
          item={{
            name: "new_pass",
            type: "text",
            placeholder: "",
            label: "New password:",
          }}
        />
        <MyInput
          defaultValue={inputRepeatNewPassword}
          onChange={(e) => {
            setInputRepeatNewPassword(e.target.value);
            validateReapeatPassword(inputNewPassword, {
              repeatPassword: e.target.value,
            })
              .then(() => {
                setValidate({ error: false, msg: "" });
              })
              .catch((error) => {
                setValidate({ error: true, msg: error[0] });
              });
          }}
          color="border-gray-500"
          className="w-full md:w-64 border-black mb-3"
          item={{
            name: "repeat_new_pass",
            type: "text",
            placeholder: "",
            label: "Repeat new password:",
          }}
        />
      </div>
      <ErrorMessage show={validate.error} message={validate.msg} />
      <Button
        isDisabled={
          !(
            inputCurrentPassword &&
            inputNewPassword &&
            inputRepeatNewPassword
          ) || validate.error
        }
        onClick={() => {}}
        size="sm"
        className="bg-orange text-sm rounded-full mt-10 p-4 text-white"
      >
        MODIFY
      </Button>
    </div>
  );
}
