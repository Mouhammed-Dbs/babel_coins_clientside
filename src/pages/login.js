import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TbMoneybag } from "react-icons/tb";
import Link from "next/link";
import { FaLock } from "react-icons/fa6";
import MyInput from "@/components/utils/MyInput";
import { useRouter } from "next/router";
import MyLoading from "@/components/MyLoading";
import { isUserLogged, loginUser } from "../../public/global_functions/auth";
import MyMessage from "@/components/utils/MyMessage";
import {
  validateEmail,
  validatePassword,
} from "../../public/global_functions/validation";
import { useTranslations } from "next-intl";
import { loadMessages } from "@/lib/loadMessages";
export default function Login() {
  const [mounted, setMount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resLogin, setResLogin] = useState({
    msg: { en: "", ar: "" },
    error: false,
  });
  const [validateLogin, setValidateLogin] = useState({
    msgEmail: "",
    msgPassword: "",
    errorEmail: false,
    errorPassword: false,
  });
  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const t = useTranslations("Login");
  const t_w = useTranslations("Words");
  const router = useRouter();

  const login = (event) => {
    event.preventDefault();

    setLoading(true);
    loginUser(inputEmail, inputPass)
      .then((result) => {
        setResLogin({ msg: result.msg, error: result.error });
        if (!result.error) {
          localStorage.setItem("babel-coins-user-token", result.data.token);
          router.push("/");
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setMount(true);
    isUserLogged()
      .then((result) => {
        if (!result.error) {
          router.replace("/");
        } else {
          setPageLoading(false);
        }
      })
      .catch((err) => {
        setPageLoading(false);
      });
  }, [router]);

  if (!mounted)
    return (
      <MyLoading
        msg={t_w("Loading")}
        color="warning"
        className={`text-white mt-24`}
      />
    );
  if (pageLoading)
    return (
      <MyLoading
        msg={t_w("Loading")}
        color="warning"
        className={`text-white mt-24`}
      />
    );

  return (
    <div className="text-white mt-20 md:mt-8">
      <Card
        isBlurred
        className="w-min m-auto mt-3 p-8 pb-2 pt-2 text-white"
        style={{ backgroundColor: "rgb(255,255,255,0.1)" }}
      >
        <CardHeader className="justify-center">
          <h1 className="text-center text-2xl">{t("h-title")}</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={login} className="contents">
            <h1 className="text-center text-sm mb-2">{t("h-des")}</h1>
            <a
              className="w-fit flex justify-center items-center self-center text-xs p-1 px-2 rounded-full text-cyan-300 underline bg-slate-100 bg-opacity-25 cursor-not-allowed"
              style={{ direction: "ltr" }}
            >
              <FaLock className="mr-1" />
              https://babelcoins.com
            </a>
            <MyInput
              textColor="text-white"
              className="w-64 mt-3"
              onChange={async (event) => {
                setInputEmail(event.target.value);
                const err = await validateEmail({
                  email: event.target.value,
                });
                if (err.length > 0)
                  setValidateLogin({
                    ...validateLogin,
                    errorEmail: true,
                    msgEmail: err[0],
                  });
                else
                  setValidateLogin({
                    ...validateLogin,
                    errorEmail: false,
                    msgEmail: "",
                  });
              }}
              value={inputEmail}
              item={{
                name: "email",
                type: "email",
                placeholder: "example@gmail.com",
                label: t_w("Email"),
              }}
              // withLink={{ nameLink: "forget login?", href: "" }}
            />
            <MyInput
              textColor="text-white"
              className="w-64 mt-3"
              onChange={async (event) => {
                setInputPass(event.target.value);
                const err = await validatePassword({
                  password: event.target.value,
                });
                if (err.length > 0)
                  setValidateLogin({
                    ...validateLogin,
                    errorPassword: true,
                    msgPassword: err[0],
                  });
                else
                  setValidateLogin({
                    ...validateLogin,
                    errorPassword: false,
                    msgPassword: validateLogin.msg,
                  });
                setResLogin({ error: false, msg: "" });
              }}
              value={inputPass}
              item={{
                name: "password",
                type: "text",
                placeholder: t_w("Password"),
                label: t_w("Password"),
              }}
              withLink={{ nameLink: t("forgetPassword"), href: "/recovery" }}
            />
            <Button
              type="submit"
              isDisabled={
                !(inputEmail && inputPass) ||
                loading ||
                validateLogin.errorEmail ||
                validateLogin.errorPassword
              }
              className="w-2/5 h-8 mx-auto text-sm font-bold rounded-full bg-orange text-white mt-6"
            >
              {loading ? t("btn-login") + "..." : t("btn-login")}
            </Button>
          </form>
        </CardBody>
      </Card>
      <div className="w-fit m-auto">
        <MyMessage
          show={resLogin.error}
          message={resLogin.msg[router.locale]}
        />
        <MyMessage
          show={validateLogin.errorEmail || validateLogin.errorPassword}
          message={
            validateLogin.msgEmail
              ? validateLogin.msgEmail + "&-&" + validateLogin.msgPassword
              : validateLogin.msgPassword
          }
        />
      </div>
      <div className="flex w-fit m-auto mt-4">
        <p className="text-sm opacity-75 text-white">{t("dontHaveAccount")}</p>
        <Link
          href={"signup"}
          className="flex items-center text-sm text-orange ml-2 hover:underline"
        >
          <TbMoneybag className="mr-1" />
          {t("btn-createAccount")}
        </Link>
      </div>
    </div>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: await loadMessages(locale),
    },
  };
}
