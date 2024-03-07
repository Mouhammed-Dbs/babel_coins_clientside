import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TbMoneybag } from "react-icons/tb";
import Link from "next/link";
import { FaLock } from "react-icons/fa6";
import MyInput from "@/components/utils/MyInput";
import axios from "axios";
import { useRouter } from "next/router";
import MyLoading from "@/components/MyLoading";
import { isUserLogged } from "../../public/global_functions/auth";
export default function Signup() {
  const [mounted, setMount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resLogin, setResLogin] = useState({ msg: "", error: false });
  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  const onChangeEmail = (event) => {
    setInputEmail(event.target.value);
  };
  const onChangePass = (event) => {
    setInputPass(event.target.value);
  };
  const login = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.BASE_API_URL}/users/login?email=${inputEmail}&password=${inputPass}`
      );
      const result = res.data;
      setResLogin({ msg: result.msg, error: result.error });
      if (!result.error) {
        localStorage.setItem("babel-coins-user-token", result.data.token);
        router.push("/account");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    setMount(true);
    isUserLogged()
      .then((isLogged) => {
        if (isLogged) {
          router.replace("/");
        } else {
          setPageLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("babel-coins-user-token");
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
    <div className="text-white mt-20 md:mt-8">
      <Card
        isBlurred
        className="w-min m-auto mt-3 p-8 pb-2 pt-2 text-white"
        style={{ backgroundColor: "rgb(255,255,255,0.1)" }}
      >
        <CardHeader className="justify-center">
          <h1 className="text-center text-2xl">Login</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={login} className="contents">
            <h1 className="text-center text-xs mb-2">
              Please check that you are visiting correct URL
            </h1>
            <a className="w-fit flex justify-center items-center self-center text-xs p-1 px-2 rounded-full text-cyan-300 underline bg-slate-100 bg-opacity-25 cursor-not-allowed">
              <FaLock className="mr-1" />
              https://babel.com
            </a>
            <MyInput
              textColor="text-white"
              className="w-64 mt-3"
              handleChange={onChangeEmail}
              value={inputEmail}
              item={{
                name: "email",
                type: "email",
                placeholder: "example@gmail.com",
                label: "Email",
              }}
              withLink={{ nameLink: "forget login?", href: "" }}
            />
            <MyInput
              textColor="text-white"
              className="w-64 mt-3"
              handleChange={onChangePass}
              value={inputPass}
              item={{
                name: "password",
                type: "text",
                placeholder: "password",
                label: "Password",
              }}
              withLink={{ nameLink: "forget password?", href: "" }}
            />
            <Button
              type="submit"
              isDisabled={!(inputEmail && inputPass) || loading}
              className="w-2/5 h-8 mx-auto text-sm font-bold rounded-full bg-orange text-white mt-6"
            >
              {loading ? "login.." : "Login"}
            </Button>
          </form>
          <p
            className={`text-red-900 font-bold text-xs mt-2 text-center ${
              resLogin.error ? "block" : "hidden"
            }`}
          >
            {resLogin.msg}
          </p>
        </CardBody>
      </Card>
      <div className="flex w-fit m-auto mt-6">
        <p className="text-sm opacity-75 text-white">
          {`Don't have an account?`}
        </p>
        <Link
          href={"signup"}
          className="flex items-center text-sm text-orange ml-2 hover:underline"
        >
          <TbMoneybag className="mr-1" />
          Create account
        </Link>
      </div>
    </div>
  );
}
