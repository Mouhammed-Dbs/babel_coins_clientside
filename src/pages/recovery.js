import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import MyInput from "@/components/utils/MyInput";
import {
  validateCode,
  validateEmail,
  validateInputs,
  validatePassword,
  validateReapeatPassword,
  validateSecretCode,
} from "../../public/global_functions/validation";
import MyMessage from "@/components/utils/MyMessage";
import {
  getForRecoveryPassword,
  recoveryPassword,
} from "../../public/global_functions/auth";
import { useRouter } from "next/router";

export default function Recovery() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  useState(false);
  const [resMsg, setResMsg] = useState({ error: false, msg: "" });
  const [inputEmail, setInputEmail] = useState("");
  const [inputSecret, setInputSecret] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputRepeatNewPassword, setInputRepeatNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState({
    msg: "",
    error: false,
  });
  const getSchemaForm = (newPass, newRepeatPass) => {
    return [
      {
        sort: 0,
        name: "`password`",
        typeValidate: "password",
        data: { password: newPass },
      },
      {
        sort: 1,
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
    <div className="text-white mt-10">
      <Card
        isBlurred
        className="w-full md:w-1/3 mx-2 md:m-auto mt-3 p-8 pb-2 pt-2 text-white"
        style={{ backgroundColor: "rgb(255,255,255,0.1)" }}
      >
        <CardHeader className="justify-center">
          <h1 className="text-center text-2xl">Recovery</h1>
        </CardHeader>
        <CardBody className="py-10 px-5">
          {!show ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                getForRecoveryPassword(inputEmail, inputSecret)
                  .then((res) => {
                    setResMsg({ error: res.error, msg: res.msg });
                    if (!res.error) {
                      setShow(true);
                    }
                    setLoading(false);
                  })
                  .catch((err) => {
                    setLoading(false);
                  });
              }}
              className="contents"
            >
              <MyInput
                textColor="text-white"
                value={inputEmail}
                onChange={async (e) => {
                  setInputEmail(e.target.value);
                  const err = await validateEmail({
                    email: e.target.value,
                  });
                  if (err.length > 0) setValidate({ error: true, msg: err[0] });
                  else setValidate({ error: false, msg: "" });
                  setResMsg({ error: false, msg: "" });
                }}
                item={{
                  name: "email",
                  type: "email",
                  placeholder: "example@gmail.com",
                  label: "Email",
                }}
              />
              <MyInput
                textColor="text-white"
                className="mt-3"
                value={inputSecret}
                onChange={async (e) => {
                  setInputSecret(e.target.value);
                  const err = await validateSecretCode({
                    secretCode: e.target.value,
                  });
                  if (err.length > 0)
                    setValidate({
                      error: true,
                      msg: err[0],
                    });
                  else
                    setValidate({
                      error: false,
                      msg: "",
                    });
                  setResMsg({ error: false, msg: "" });
                }}
                item={{
                  name: "secret_code",
                  type: "text",
                  placeholder: "000000",
                  label: "Secret code",
                }}
                // withLink={{ nameLink: "forget your secret code?", href: "" }}
              />
              <Button
                type="submit"
                isDisabled={
                  !(inputEmail && inputSecret) || validate.error || loading
                }
                className="w-2/5 h-8 mx-auto text-sm font-bold rounded-full bg-orange text-white mt-6"
              >
                {loading ? "Sending" : "Send"}
              </Button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                recoveryPassword(inputEmail, inputCode, inputNewPassword)
                  .then((res) => {
                    setResMsg({ error: res.error, msg: res.msg });
                    if (!res.error) {
                      router.replace("/login");
                    }
                    setLoading(false);
                  })
                  .catch((err) => {
                    setLoading(false);
                  });
              }}
              className="contents"
            >
              <MyInput
                textColor="text-white"
                maxLength={4}
                onChange={(e) => {
                  setInputCode(validateCode(e.target.value));
                }}
                value={inputCode}
                item={{
                  name: "code",
                  type: "text",
                  placeholder: "0000",
                  label: "Code",
                }}
              />
              <MyInput
                textColor="text-white"
                className="mt-3"
                value={inputNewPassword}
                onChange={async (e) => {
                  setInputNewPassword(e.target.value);
                  const err = await validateInputs(
                    getSchemaForm(e.target.value, inputRepeatNewPassword)
                  );
                  if (err.error) {
                    setValidate({
                      msg: err.message,
                      error: true,
                      show: true,
                    });
                  } else setValidate({ msg: "", error: false, show: false });
                }}
                item={{
                  name: "new_password",
                  type: "text",
                  placeholder: "password",
                  label: "Password",
                }}
              />
              <MyInput
                textColor="text-white"
                className="mt-3"
                value={inputRepeatNewPassword}
                onChange={async (e) => {
                  setInputRepeatNewPassword(e.target.value);
                  const err = await validateInputs(
                    getSchemaForm(inputNewPassword, e.target.value)
                  );
                  if (err.error) {
                    setValidate({
                      msg: err.message,
                      error: true,
                      show: true,
                    });
                  } else setValidate({ msg: "", error: false, show: false });
                }}
                item={{
                  name: "repeat_new_password",
                  type: "text",
                  placeholder: "password",
                  label: "Repeat password",
                }}
                // withLink={{ nameLink: "forget your secret code?", href: "" }}
              />
              <Button
                type="submit"
                isDisabled={
                  !(inputCode && inputNewPassword && inputRepeatNewPassword) ||
                  validate.error ||
                  loading
                }
                className="w-2/5 h-8 mx-auto text-sm font-bold rounded-full bg-orange text-white mt-6"
              >
                {loading ? "Recovering.." : "Recovery"}
              </Button>
            </form>
          )}
          <MyMessage show={validate.error} message={validate.msg} />
          <MyMessage show={resMsg.error} message={resMsg.msg} />
        </CardBody>
      </Card>
    </div>
  );
}

{
  /* <div className="relative">
              <input
                onChange={onChangeEmail}
                className="peer/email w-64 self-center text-white placeholder-slate-300 mt-6 rounded-lg border-2 text-xs border-white-500 p-2 bg-inherit focus:outline-none focus:border-cyan-300"
                type="email"
                placeholder="you@example.com"
              ></input>
              <label
                className={`absolute -top-0 -left-0 text-sm ml-1 mb-1 peer-focus/email:text-cyan-300 text-white`}
              >
                Email
              </label>
            </div>
            <div className="relative mt-3">
              <input
                onChange={onChangeSecret}
                className="peer/pass w-64 self-center text-white placeholder-slate-300 mt-6 rounded-lg border-2 text-xs border-white-500 p-2 bg-inherit focus:outline-none focus:border-cyan-300"
                type="text"
                placeholder="000000"
              ></input>
              <Link href={''} className="text-cyan-300 text-xs absolute -bottom-0 -right-0 mb-3 mr-2">forget your secret code?</Link>
              <label
                className={`absolute -top-0 -left-0 text-sm ml-1 mb-1 peer-focus/pass:text-cyan-300 text-white`}
              >
                Secret code
              </label>
            </div> */
}
