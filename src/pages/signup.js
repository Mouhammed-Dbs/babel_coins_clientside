import { Button, Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  MdLogin,
  MdOutlineArrowCircleLeft,
  MdOutlineArrowCircleRight,
} from "react-icons/md";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useRouter } from "next/router";
import MyInput from "@/components/utils/MyInput";
import Link from "next/link";
import MyLoading from "@/components/MyLoading";
import {
  getConfirmCode,
  isUserLogged,
  registerUser,
  updateUserInfo,
} from "../../public/global_functions/auth";
import { countries } from "countries-list";
import MyMessage from "@/components/utils/MyMessage";
import {
  validateCode,
  validateEmail,
  validateName,
  validatePassword,
  validateSecretCode,
} from "../../public/global_functions/validation";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslations } from "next-intl";
import { loadMessages } from "@/lib/loadMessages";

export default function Signup(props) {
  const router = useRouter();
  const t = useTranslations("Signup");
  const t_w = useTranslations("Words");
  const t_placeholder = useTranslations("Placeholder");
  const [mounted, setMount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSteps, setShowSteps] = useState(0);
  const [inputEmail, setInputEmail] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [timerOn, setTimerOn] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [validateAccount, setValidateAccount] = useState({
    error: false,
    msg: "",
  });
  const [account, setAccount] = useState({
    accountName: "",
    firstName: "",
    lastName: "",
    secretCode: "",
    password: "",
    msg: { en: "", ar: "" },
    error: false,
  });
  const [myCountries, setMyCountries] = useState(Object.entries(countries));
  const [selectedCountry, setSelectedCountry] = useState("US");

  const reqCode = async () => {
    setLoading(true);
    getConfirmCode(inputEmail)
      .then((result) => {
        if (!result.error) {
          handleStartTimer();
        } else {
          setAccount({
            error: result.error,
            msg: result.msg + " " + result.data.receiveBlockingExpirationDate,
          });
        }
        setLoading(false);
      })
      .then((err) => {
        setLoading(false);
      });
  };
  const createAccount = async (event) => {
    event.preventDefault();
    setLoading(true);
    registerUser(inputEmail, inputCode)
      .then((result) => {
        if (!result.error) {
          setAccount({
            accountName: result.data.accountName,
            secretCode: result.data.secretCode,
            password: result.data.password,
            firstName: "",
            lastName: "",
            msg: result.msg,
            error: result.error,
          });
          localStorage.setItem("babel-coins-user-token", result.data.token);
          setShowSteps(2);
          setLoading(false);
        } else {
          setLoading(false);
          setAccount({ error: result.error, msg: result.msg });
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const updateUserInformation = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      let res = await updateUserInfo(
        account?.password,
        account?.secretCode,
        account?.firstName,
        account?.lastName,
        selectedCountry
      );
      if (!res.error) {
        await router.push("/");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };
  const handleStartTimer = () => {
    setTimerOn(true);
  };
  useEffect(() => {
    let timer;
    if (timerOn) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          setTimerOn(false);
          setSeconds(30);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [seconds, timerOn]);

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
    <div className="text-white mt-14 md:mt-2">
      <div className="flex w-[320px] mx-auto">
        {router.locale == "en" ? (
          <MdOutlineArrowCircleLeft
            className={`w-6 h-6 self-center hover:text-secondary ${
              showSteps == 1 || showSteps == 3 ? "" : "hidden"
            }`}
            onClick={() => {
              setShowSteps(showSteps - 1);
              setInputCode("");
            }}
          />
        ) : (
          <MdOutlineArrowCircleRight
            className={`w-6 h-6 self-center hover:text-secondary ${
              showSteps == 1 || showSteps == 3 ? "" : "hidden"
            }`}
            onClick={() => {
              setShowSteps(showSteps - 1);
              setInputCode("");
            }}
          />
        )}
        <h1 className="text-center w-full text-2xl ltr:ml-2 rtl:mr-2">
          {t("h-title")}
        </h1>
      </div>

      <Card
        isBlurred
        className="w-min m-auto mt-1 p-8 py-4 text-white"
        style={{ backgroundColor: "rgb(255,255,255,0.1)" }}
      >
        <CardBody className="rtl:text-right">
          {/* line steps */}
          <div className="w-full justify-center">
            <div className="flex justify-center px-3">
              <div
                className={`rounded-full border-5 border-cyan-300 bg-white min-w-4 h-4`}
              ></div>
              <div
                className={`w-full h-1 bg-gradient-to-r my-auto ${
                  showSteps > 1
                    ? "from-cyan-300 to-cyan-300"
                    : "ltr:from-cyan-300 ltr:to-gray-300 rtl:from-gray-300 rtl:to-cyan-300"
                }`}
              ></div>
              <div
                className={`rounded-full border-5 bg-white min-w-4 h-4 ${
                  showSteps > 1 ? "border-cyan-300" : "border-gray-300"
                }`}
              ></div>
              <div
                className={`w-full h-1 my-auto ${
                  showSteps > 2
                    ? "bg-gradient-to-r from-cyan-300 to-cyan-300"
                    : showSteps > 1
                    ? "bg-gradient-to-r rtl:from-gray-300 rtl:to-cyan-300 ltr:from-cyan-300 ltr:to-gray-300"
                    : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`rounded-full border-5 bg-white min-w-4 h-4 ${
                  showSteps > 2 ? "border-cyan-300" : "border-gray-300"
                }`}
              ></div>
            </div>
            <div className="grid grid-cols-3 text-sm text-gray-300 mt-2">
              <div className="ltr:text-left rtl:text-right text-cyan-300">
                <p>{t("Step")} 1</p>
              </div>
              <div
                className={`text-center ${
                  showSteps > 1 ? "text-cyan-300" : ""
                }`}
              >
                <p>{t("Step")} 2</p>
              </div>
              <div
                className={`rtl:text-left ltr:text-right ${
                  showSteps > 2 ? "text-cyan-300" : ""
                }`}
              >
                <p>{t("Step")} 3</p>
              </div>
            </div>
          </div>
          {/* First Step */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              reqCode();
              setShowSteps(1);
            }}
            className={showSteps === 0 ? "contents" : "hidden"}
          >
            <h1 className="text-center mt-6 mb-4">{t("h-des-step0")}</h1>
            <MyInput
              className="w-64"
              textColor="text-white"
              onChange={async (event) => {
                setInputEmail(event.target.value);
                const err = await validateEmail({
                  email: event.target.value,
                });
                if (err.length > 0)
                  setValidateAccount({ error: true, msg: err[0] });
                else setValidateAccount({ error: false, msg: "" });
              }}
              value={inputEmail}
              item={{
                name: "email",
                type: "email",
                placeholder: "example@gmail.com",
                label: t_w("Email"),
              }}
            />
            <p className="ltr:text-left rtl:text-right text-xs mb-4 mt-2 opacity-75">
              {t("p-userAgreementStart")}
              <Link className="text-cyan-300" href={""}>
                {" " + t("a-userAgreement") + " "}
              </Link>
              {t("p-userAgreementLast")}
            </p>
            <Button
              type="submit"
              isDisabled={!inputEmail || validateAccount.error}
              className="w-full h-8 mx-auto text-sm font-bold rounded-full bg-orange text-white mt-3"
            >
              {loading ? t("btn-creating") : t("btn-createAccount")}
            </Button>
          </form>
          {/* Step 1 */}
          <form
            className={showSteps === 1 ? "contents" : "hidden"}
            onSubmit={(event) => {
              setAccount({ ...account, error: false, msg: "" });
              createAccount(event);
            }}
          >
            <h1 className="text-center mt-6 mb-4">{t("h-des-step1")}</h1>
            <MyInput
              className="w-64"
              textColor="text-white"
              item={{
                name: "email",
                type: "email",
                placeholder: "example@gmail.com",
                label: t_w("Email"),
              }}
              value={inputEmail}
              readOnly
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="relative">
                <input
                  maxLength={4}
                  onChange={(event) => {
                    setInputCode(validateCode(event.target.value));
                  }}
                  value={inputCode}
                  className="peer/code w-full mt-6 self-center text-white placeholder-slate-300 rounded-lg border-2 text-xs border-white-500 p-2 bg-inherit focus:outline-none focus:border-cyan-300"
                  type="text"
                  placeholder="0000"
                ></input>
                <label
                  className={`absolute -top-0 ltr:-left-0 rtl:-right-0 text-sm ltr:ml-1 rtl:mr-1 mb-1 peer-focus/code:text-cyan-300`}
                >
                  {t_w("Code")}
                </label>
              </div>
              <Button
                onClick={() => {
                  reqCode();
                }}
                isDisabled={timerOn || loading}
                color="warning"
                variant="bordered"
                className="w-full h-8 text-sm font-bold self-end mb-[2px]"
              >
                {t("btn-sendCode")}
              </Button>
            </div>
            <span className={`text-xs ml-4 mt-2 ${timerOn ? "" : "hidden"}`}>
              {t("span-codeCounter")} {seconds}
            </span>
            <Button
              type="submit"
              isDisabled={inputCode.length != 4 || loading}
              onClick={createAccount}
              className="mt-3 font-bold rounded-full bg-orange text-white h-9"
            >
              {t("btn-createAccount")}
            </Button>
          </form>
          {/* Step 2 */}
          {showSteps === 2 && (
            <form
              className={showSteps === 2 ? "contents" : "hidden"}
              onSubmit={(event) => {
                event.preventDefault();
                setAccount({ ...account, error: false, msg: "" });
                setShowSteps(3);
              }}
            >
              <h1 className="text-center my-2">{t("h-des-step2")}</h1>
              <MyInput
                textColor="text-white"
                defaultValue={account?.password}
                onChange={async (e) => {
                  setAccount({ ...account, password: e.target.value });
                  const err = await validatePassword({
                    password: e.target.value,
                  });
                  if (err.length > 0)
                    setValidateAccount({ error: true, msg: err[0] });
                  else setValidateAccount({ error: false, msg: "" });
                }}
                className="w-64 mt-3"
                item={{
                  name: "password",
                  type: "text",
                  placeholder: t_w("Password"),
                  label: t_w("Password"),
                }}
              />
              <MyInput
                textColor="text-white"
                defaultValue={account.secretCode}
                onChange={async (e) => {
                  setAccount({ ...account, secretCode: e.target.value });
                  const err = await validateSecretCode({
                    secretCode: e.target.value,
                  });
                  if (err.length > 0)
                    setValidateAccount({ error: true, msg: err[0] });
                  else setValidateAccount({ error: false, msg: "" });
                }}
                className="w-64 mt-3"
                item={{
                  name: "secretcode",
                  type: "text",
                  placeholder: "000000",
                  label: t_w("SecretCode"),
                }}
              />
              <MyInput
                textColor="text-white"
                value={account?.accountName}
                readOnly
                className="w-64 mt-3"
                item={{
                  name: "accountname",
                  type: "text",
                  placeholder: "b0000000",
                  label: t_w("AccountName"),
                }}
              />
              <Button
                type="submit"
                isDisabled={
                  !(
                    account.accountName &&
                    account.secretCode &&
                    account.password
                  ) || validateAccount.error
                }
                className="w-max h-8 self-center text-sm font-bold rounded-full bg-orange text-white mt-3"
              >
                {t_w("Next")}
                {router.locale === "en" ? (
                  <GrFormNextLink />
                ) : (
                  <GrFormPreviousLink />
                )}
              </Button>
            </form>
          )}
          {/* Step 3 */}
          {showSteps === 3 && (
            <form
              className={showSteps === 3 ? "contents" : "hidden"}
              onSubmit={(event) => {
                setAccount({ ...account, error: false, msg: "" });
                updateUserInformation(event);
              }}
            >
              <h1 className="text-center my-2">{t("h-des-step2")}</h1>
              <MyInput
                defaultValue={account?.firstName}
                textColor="text-white"
                onChange={async (e) => {
                  setAccount({ ...account, firstName: e.target.value });
                  const err = await validateName({
                    name: e.target.value,
                  });
                  if (err.length > 0)
                    setValidateAccount({ error: true, msg: err[0] });
                  else setValidateAccount({ error: false, msg: "" });
                }}
                item={{
                  name: "firstname",
                  type: "text",
                  placeholder: t_placeholder("FirstName"),
                  label: t_w("FirstName"),
                }}
              />
              <MyInput
                defaultValue={account?.lastName}
                textColor="text-white"
                onChange={async (e) => {
                  setAccount({ ...account, lastName: e.target.value });
                  const err = await validateName({
                    name: e.target.value,
                  });
                  if (err.length > 0)
                    setValidateAccount({ error: true, msg: err[0] });
                  else setValidateAccount({ error: false, msg: "" });
                }}
                className={"w-64 mt-3"}
                item={{
                  name: "lastname",
                  type: "text",
                  placeholder: t_placeholder("LastName"),
                  label: t_w("LastName"),
                }}
              />
              <div className="mt-2">
                <label className="text-sm rtl:pr-1 ltr:pl-1">
                  {t_w("Country")}
                </label>
                <Select
                  dir="ltr"
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                  }}
                  disallowEmptySelection={true}
                  selectedKeys={[selectedCountry]}
                  style={{ backgroundColor: "inherit" }}
                  label=""
                  placeholder="Select a country"
                  labelPlacement="outside"
                  aria-label="none"
                  size="sm"
                  className="max-w-xs peer w-full self-center rounded-lg border-2 border-default-300 dark:border-default-600/70 border-opacity-55 text-xs bg-inherit focus:outline-none focus:border-cyan-300"
                  selectorIcon={<IoIosArrowDown />}
                  items={myCountries}
                  renderValue={(items) => {
                    return items.map((item) => (
                      <div key={item.data[0]}>
                        <span className="text-white">{item.data[1].name}</span>
                      </div>
                    ));
                  }}
                >
                  {([code, country]) => (
                    <SelectItem key={code} textValue={country.name}>
                      <div>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              </div>
              <Button
                type="submit"
                isDisabled={
                  !(account.firstName && account.lastName) ||
                  validateAccount.error ||
                  loading
                }
                className="w-max h-8 self-center text-sm font-bold rounded-full bg-orange text-white mt-3"
              >
                {t_w("Done")}
                {router.locale === "en" ? (
                  <GrFormNextLink />
                ) : (
                  <GrFormPreviousLink />
                )}
              </Button>
            </form>
          )}
        </CardBody>
      </Card>
      <div className="w-fit m-auto">
        {/* Error Message */}
        <MyMessage show={account.error} message={account.msg[router.locale]} />
        <MyMessage show={validateAccount.error} message={validateAccount.msg} />
      </div>
      {/* Under Card */}
      <div className="flex w-fit m-auto mt-4">
        <p className="flex items-center mt-1 text-sm opacity-75 text-white">
          {t("haveAccount")}
        </p>
        <Button
          onClick={() => {
            router.push("login");
          }}
          className="border-2 text-xs font-bold gap-unit-1 h-unit-9 rounded-full text-white border-white ltr:ml-3 rtl:mr-3 hover:bg-white hover:text-primary"
        >
          <MdLogin />
          {t("btn-login")}
        </Button>
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
