import MyInput from "@/components/utils/MyInput";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useState } from "react";
import {
  validateEmail,
  validateInputs,
  validateMessage,
  validateName,
} from "../../public/global_functions/validation";
import MyMessage from "@/components/utils/MyMessage";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ContactUs() {
  const t = useTranslations("Contacts");
  const t_placeholder = useTranslations("Placeholder");
  const t_w = useTranslations("Words");
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messValue, setMessValue] = useState("");
  const [agreeValue, setAgreeValue] = useState(false);
  const [validate, setValidate] = useState({
    msg: "",
    error: false,
  });
  const getSchemaForm = (name, email, message) => {
    return [
      {
        sort: 0,
        name: "`name`",
        typeValidate: "name",
        data: { name },
      },
      {
        sort: 1,
        name: "`email`",
        typeValidate: "email",
        data: { email },
      },
      {
        sort: 2,
        name: "`message`",
        typeValidate: "message",
        data: {
          message,
        },
      },
    ];
  };
  const sendMessage = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-white mt-15 md:mt-4">
      <Card
        isBlurred
        className="w-5/6 md:w-2/3 m-auto mt-4 p-4 px-6 text-white"
        style={{ backgroundColor: "rgb(255,255,255,0.1)" }}
      >
        <form
          onSubmit={(event) => {
            sendMessage(event);
          }}
        >
          <CardHeader>
            <h1 className="w-full text-center text-xl">{t("title")}</h1>
          </CardHeader>
          <CardBody className="grid md:grid-template-columns md:gap-x-4 rtl:text-right">
            <div className="w-full">
              <MyInput
                textColor="text-white"
                className="w-full md:w-72"
                onChange={async (e) => {
                  setNameValue(e.target.value);
                  const err = await validateInputs(
                    getSchemaForm(e.target.value, emailValue, messValue)
                  );
                  if (err.error) {
                    setValidate({
                      msg: err.message,
                      error: true,
                    });
                  } else setValidate({ msg: "", error: false });
                }}
                value={nameValue}
                item={{
                  name: "text",
                  type: "text",
                  placeholder: t_placeholder("Name"),
                  label: t_w("Name"),
                }}
              />
              <MyInput
                textColor="text-white"
                className="mt-3 w-full md:w-72"
                onChange={async (e) => {
                  setEmailValue(e.target.value);
                  const err = await validateInputs(
                    getSchemaForm(nameValue, e.target.value, messValue)
                  );
                  if (err.error) {
                    setValidate({
                      msg: err.message,
                      error: true,
                    });
                  } else setValidate({ msg: "", error: false });
                }}
                value={emailValue}
                item={{
                  name: "email",
                  type: "email",
                  placeholder: t_placeholder("Email"),
                  label: t_w("Email"),
                }}
              />

              <div className="relative mt-3">
                <textarea
                  value={messValue}
                  onChange={async (e) => {
                    setMessValue(e.target.value);
                    const err = await validateInputs(
                      getSchemaForm(nameValue, emailValue, e.target.value)
                    );
                    if (err.error) {
                      setValidate({
                        msg: err.message,
                        error: true,
                      });
                    } else setValidate({ msg: "", error: false });
                  }}
                  className={`peer/email w-full h-24 resize-none self-center text-white placeholder-slate-300 mt-6 rounded-lg border-2 text-xs p-2 bg-inherit focus:outline-none focus:border-cyan-300 scrollbar-hide ${
                    messValue
                      ? "border-cyan-300"
                      : "border-white border-opacity-35"
                  }`}
                  type="text"
                  placeholder={t_placeholder("Message")}
                ></textarea>
                <label
                  className={`absolute rtl:-right-0 -top-0 ltr:-left-0 text-sm ltr:ml-1 rtl:mr-1 mb-1 peer-focus/email:text-cyan-300 ${
                    messValue ? "text-cyan-300" : "text-white text-opacity-65"
                  }`}
                >
                  {t_w("Message")}
                </label>
              </div>
              <div className="flex mt-3 ltr:ml-1 rtl:mr-1">
                <input
                  onChange={() => {
                    setAgreeValue(!agreeValue);
                  }}
                  checked={agreeValue}
                  value={agreeValue}
                  type="checkbox"
                  className="peer accent-white"
                ></input>
                <label className="text-xs peer-checked:text-cyan-300 text-white text-opacity-65 ltr:ml-2 rtl:mr-2">
                  {t("agree")}
                </label>
              </div>
              <MyMessage show={validate.error} message={validate.msg} />
            </div>
            <div className="hidden md:block md:px-5 px-1">
              <p>{t("des")}</p>
              <div className="w-full flex justify-center mt-8">
                {/* <Image
                  src={"/images/logo.svg"}
                  alt=""
                  width={40}
                  height={40}
                ></Image> */}
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              isDisabled={
                !(agreeValue && nameValue && emailValue && messValue) ||
                validate.error
              }
              className="bg-orange rounded-full block m-auto text-white h-8 w-36 hover:bg-white hover:text-orange"
            >
              {t_w("Send")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
