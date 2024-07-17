import { Button } from "@nextui-org/react";
import MyInput from "../utils/MyInput";
import { useState } from "react";
import MyMessage from "../utils/MyMessage";
import { validateInputs } from "../../../public/global_functions/validation";
import { changePassword } from "../../../public/global_functions/auth";
import { useTranslations } from "next-intl";

export default function Password() {
  const t = useTranslations("Password");
  const t_w = useTranslations("Words");
  const [inputCurrentPassword, setInputCurrentPassword] = useState("");
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputRepeatNewPassword, setInputRepeatNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resMsg, setResMsg] = useState({ msg: "", error: false });
  const [validate, setValidate] = useState({
    msg: "",
    error: false,
    show: false,
  });
  const getSchemaForm = (currentPass, newPass, newRepeatPass) => {
    return [
      {
        sort: 0,
        name: "`current password`",
        typeValidate: "password",
        data: { password: currentPass },
      },
      {
        sort: 1,
        name: "`new password`",
        typeValidate: "password",
        data: { password: newPass },
      },
      {
        sort: 2,
        name: "`repeat password`",
        typeValidate: "repeatPassword",
        data: {
          password: newPass,
          repeatPassword: newRepeatPass,
        },
      },
    ];
  };
  return (
    <div
      className={`w-[78%] md:11/12 mt-5 md:mt-5 rounded-md py-10 md:px-8 px-5 bg-white/55 dark:bg-default-100/55 backdrop-blur-md shadow-md`}
    >
      {/* Title */}
      <div className="w-full border-b">
        <h1 className="text-sm mb-3 font-bold">
          {t("changePassword").toUpperCase()}
        </h1>
      </div>

      {/* Content */}
      <div className="mt-10">
        <MyInput
          defaultValue={inputCurrentPassword}
          onChange={async (e) => {
            setInputCurrentPassword(e.target.value);
            const err = await validateInputs(
              getSchemaForm(
                e.target.value,
                inputNewPassword,
                inputRepeatNewPassword
              )
            );
            if (err.error) {
              setValidate({
                msg: err.message,
                error: true,
                show: true,
              });
            } else setValidate({ msg: "", error: false, show: false });
          }}
          color="border-gray-500"
          className="w-full md:w-64 border-black mb-3"
          item={{
            name: "current_pass",
            type: "text",
            placeholder: "",
            label: t("currentPassword") + ":",
          }}
        />
        <MyInput
          defaultValue={inputNewPassword}
          onChange={async (e) => {
            setInputNewPassword(e.target.value);
            const err = await validateInputs(
              getSchemaForm(
                inputCurrentPassword,
                e.target.value,
                inputRepeatNewPassword
              )
            );

            if (err.error) {
              setValidate({
                msg: err.message,
                error: true,
                show: true,
              });
            } else setValidate({ msg: "", error: false, show: false });
          }}
          color="border-gray-500"
          className="w-full md:w-64 border-black mb-3"
          item={{
            name: "new_pass",
            type: "text",
            placeholder: "",
            label: t("newPassword") + ":",
          }}
        />
        <MyInput
          defaultValue={inputRepeatNewPassword}
          onChange={async (e) => {
            setInputRepeatNewPassword(e.target.value);
            const err = await validateInputs(
              getSchemaForm(
                inputCurrentPassword,
                inputNewPassword,
                e.target.value
              )
            );

            if (err.error) {
              setValidate({
                msg: err.message,
                error: true,
                show: true,
              });
            } else setValidate({ msg: "", error: false, show: false });
          }}
          color="border-gray-500"
          className="w-full md:w-64 border-black mb-3"
          item={{
            name: "repeat_new_pass",
            type: "text",
            placeholder: "",
            label: t("repeatNewPassword") + ":",
          }}
        />
      </div>
      <MyMessage show={validate.show} message={validate.msg} />
      <MyMessage
        show={resMsg.msg.length > 0}
        message={resMsg.msg}
        isSuccess={!resMsg.error}
      />
      <Button
        isDisabled={
          !(
            inputCurrentPassword &&
            inputNewPassword &&
            inputRepeatNewPassword
          ) ||
          validate.error ||
          loading
        }
        onClick={(event) => {
          event.preventDefault();
          setLoading(true);
          changePassword(inputCurrentPassword, inputNewPassword)
            .then((result) => {
              setLoading(false);
              setResMsg({ error: result.error, msg: result.msg });
            })
            .catch((err) => {
              setLoading(false);
            });
        }}
        size="sm"
        className="bg-orange text-sm rounded-full mt-10 p-4 text-white"
      >
        {loading ? t_w("Modifying") + ".." : t_w("Modify")}
      </Button>
    </div>
  );
}
