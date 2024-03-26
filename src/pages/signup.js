import { Button, Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdLogin, MdOutlineArrowCircleLeft } from "react-icons/md";
import { GrFormNextLink } from "react-icons/gr";
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
import {
  validateCode,
  validateEmail,
} from "../../public/global_functions/validation";
export default function Signup() {
  const router = useRouter();
  const [mounted, setMount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSteps, setShowSteps] = useState(0);
  const [inputEmail, setInputEmail] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [timerOn, setTimerOn] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [account, setAccount] = useState({
    accountName: "",
    firstName: "",
    lastName: "",
    country: "",
    secretCode: "",
    password: "",
    msg: "",
    error: false,
  });

  const handleStartTimer = () => {
    setTimerOn(true);
  };
  const onChangeEmail = (event) => {
    setInputEmail(event.target.value);
  };
  const onChangeCode = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    setInputCode(newValue);
  };
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
          console.log(result.msg);
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
            country: "",
            msg: result.msg,
            error: result.error,
          });
          localStorage.setItem("babel-coins-user-token", result.data.token);
          setShowSteps(2);
          setLoading(false);
        } else {
          setLoading(false);
          setAccount({ error: result.error, msg: result.msg });
          console.log(result.msg);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
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
        msg="Loading BabelCoins.."
        color="warning"
        className={`text-white mt-24`}
      />
    );
  if (pageLoading)
    return (
      <MyLoading
        msg="Loading BabelCoins.."
        color="warning"
        className={`text-white mt-24`}
      />
    );

  return (
    <div className="text-white mt-20 md:mt-5">
      <div className="flex justify-center">
        <MdOutlineArrowCircleLeft
          className={`w-6 h-6 self-center hover:text-secondary ${
            showSteps == 1 ? "" : "hidden"
          }`}
          onClick={() => {
            setShowSteps(showSteps - 1);
          }}
        />
        <h1 className="text-center text-2xl ml-2">Create Your Account</h1>
      </div>

      <Card
        isBlurred
        className="w-min m-auto mt-3 p-8 pb-2 pt-2 text-white"
        style={{ backgroundColor: "rgb(255,255,255,0.1)" }}
      >
        <CardBody>
          {/* line steps */}
          <div className="w-full justify-center">
            <div className="flex justify-center px-3">
              <div
                className={`rounded-full border-5 border-cyan-300 bg-white min-w-4 h-4`}
              ></div>
              <div
                className={`w-full h-1 bg-gradient-to-r from-cyan-300 my-auto ${
                  showSteps > 1 ? "to-cyan-300" : "to-gray-300"
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
                    ? "bg-gradient-to-r from-cyan-300 to-gray-300"
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
              <div className="text-left text-cyan-300">
                <p>STEP 1</p>
              </div>
              <div
                className={`text-center ${
                  showSteps > 1 ? "text-cyan-300" : ""
                }`}
              >
                <p>STEP 2</p>
              </div>
              <div
                className={`text-right ${showSteps > 2 ? "text-cyan-300" : ""}`}
              >
                <p>STEP 3</p>
              </div>
            </div>
          </div>
          {/* First Step */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              validateEmail({ email: inputEmail })
                .then(() => {
                  reqCode();
                  setShowSteps(1);
                })
                .catch((error) => {
                  setAccount({ error: true, msg: error[0] });
                });
            }}
            className={showSteps === 0 ? "contents" : "hidden"}
          >
            <h1 className="text-center mt-6 mb-4">
              You can create an account in one minute!
            </h1>
            <MyInput
              className="w-64"
              textColor="text-white"
              onChange={onChangeEmail}
              value={inputEmail}
              item={{
                name: "email",
                type: "email",
                placeholder: "example@gmail.com",
                label: "Email",
              }}
            />
            <p className="text-left text-xs mb-4 mt-2 opacity-75">
              By confirming the registration, I accept the
              <Link className="text-cyan-300" href={""}>
                {" user agreement "}
              </Link>
              of the payment system
            </p>
            <Button
              type="submit"
              isDisabled={inputEmail.length < 5}
              className="w-full h-8 mx-auto text-sm font-bold rounded-full bg-orange text-white mt-3"
            >
              {loading ? "Creating" : "Create Account"}
            </Button>
          </form>
          {/* Step 1 */}
          <form
            className={showSteps === 1 ? "contents" : "hidden"}
            onSubmit={reqCode}
          >
            <h1 className="text-center mt-6 mb-4">
              Check your email and enter confirmation code
            </h1>
            <MyInput
              className="w-64"
              textColor="text-white"
              item={{
                name: "email",
                type: "email",
                placeholder: "example@gmail.com",
                label: "Email",
              }}
              value={inputEmail}
              readOnly
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="relative">
                <input
                  maxLength={6}
                  onChange={onChangeCode}
                  value={inputCode}
                  className="peer/code w-full mt-6 self-center text-white placeholder-slate-300 rounded-lg border-2 text-xs border-white-500 p-2 bg-inherit focus:outline-none focus:border-cyan-300"
                  type="text"
                  placeholder="0000"
                ></input>
                <label
                  className={`absolute -top-0 -left-0 text-sm ml-1 mb-1 peer-focus/code:text-cyan-300`}
                >
                  Code
                </label>
              </div>
              <Button
                onClick={() => {
                  validateCode({ code: inputCode })
                    .then(() => reqCode())
                    .catch((error) => {
                      setAccount({ error: true, msg: error[0] });
                    });
                }}
                isDisabled={timerOn || loading}
                color="warning"
                variant="bordered"
                className="w-full h-8 text-sm font-bold self-end mb-[2px]"
              >
                Send Code
              </Button>
            </div>
            <span className={`text-xs ml-4 mt-2 ${timerOn ? "" : "hidden"}`}>
              you can request new code after: {seconds}
            </span>
            <Button
              type="submit"
              isDisabled={inputCode.length != 4 || loading}
              onClick={createAccount}
              className="mt-3 font-bold rounded-full bg-orange text-white h-9"
            >
              Create Account
            </Button>
          </form>
          {/* Step 2 */}
          {showSteps === 2 && (
            <form
              className={showSteps === 2 ? "contents" : "hidden"}
              onSubmit={(event) => {
                event.preventDefault();
                setShowSteps(3);
              }}
            >
              <p className="text-center my-2">Please save it in a save place</p>
              <MyInput
                textColor="text-white"
                defaultValue={account?.password}
                onChange={(e) => {
                  setAccount({ ...account, password: e.target.value });
                }}
                className="w-64 mt-3"
                item={{
                  name: "password",
                  type: "text",
                  placeholder: "password",
                  label: "Password",
                }}
              />
              <MyInput
                textColor="text-white"
                defaultValue={account.secretCode}
                onChange={(e) => {
                  setAccount({ ...account, secretCode: e.target.value });
                }}
                className="w-64 mt-3"
                item={{
                  name: "secretcode",
                  type: "text",
                  placeholder: "000000",
                  label: "Secret code",
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
                  label: "Account name",
                }}
              />
              <Button
                type="submit"
                isDisabled={
                  !(
                    account.accountName &&
                    account.secretCode &&
                    account.password
                  )
                }
                className="w-max h-8 self-center text-sm font-bold rounded-full bg-orange text-white mt-3"
              >
                Next
                <GrFormNextLink />
              </Button>
            </form>
          )}
          {/* Step 3 */}
          {showSteps === 3 && (
            <form
              className={showSteps === 3 ? "contents" : "hidden"}
              onSubmit={async (event) => {
                try {
                  event.preventDefault();
                  setLoading(true);
                  let res = await updateUserInfo(
                    account?.password,
                    account?.secretCode,
                    account?.firstName,
                    account?.lastName,
                    account?.country
                  );
                  if (!res.error) {
                    await router.push("/");
                    setLoading(false);
                  }
                } catch (err) {
                  setLoading(false);
                  console.log(err);
                }
              }}
            >
              <p className="text-center my-2">Please save it in a save place</p>
              <MyInput
                textColor="text-white"
                onChange={(e) => {
                  setAccount({ ...account, firstName: e.target.value });
                }}
                item={{
                  name: "firstname",
                  type: "text",
                  placeholder: "John",
                  label: "First Name",
                }}
              />
              <MyInput
                textColor="text-white"
                onChange={(e) => {
                  setAccount({ ...account, lastName: e.target.value });
                }}
                className={"w-64 mt-3"}
                item={{
                  name: "lastname",
                  type: "text",
                  placeholder: "Smith",
                  label: "Last name",
                }}
              />
              <MyInput
                textColor="text-white"
                value="Syria"
                readOnly
                className={"w-64 mt-3"}
                item={{
                  name: "country",
                  type: "text",
                  placeholder: "Albania",
                  label: "Country",
                }}
              />
              <Button
                type="submit"
                isDisabled={loading}
                className="w-max h-8 self-center text-sm font-bold rounded-full bg-orange text-white mt-3"
              >
                Done
                <GrFormNextLink />
              </Button>
            </form>
          )}
          {/* Error Message */}
          <p
            className={`text-red-900 font-bold text-xs mt-2 text-center ${
              account.error ? "block" : "hidden"
            }`}
          >
            {account.msg}
          </p>
        </CardBody>
      </Card>
      {/* Under Card */}
      <div className="flex w-fit m-auto mt-6">
        <p className="mt-1 text-sm opacity-75 text-white">
          Already have an account?
        </p>
        <Button
          onClick={() => {
            router.push("login");
          }}
          className="border-2 text-xs font-bold gap-unit-1 h-unit-9 rounded-full text-white border-white ml-3 hover:bg-white hover:text-primary"
        >
          <MdLogin />
          Login
        </Button>
      </div>
    </div>
  );
}
