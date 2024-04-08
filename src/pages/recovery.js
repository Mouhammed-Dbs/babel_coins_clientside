import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import MyInput from "@/components/utils/MyInput";

export default function Recovery() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputSecret, setInputSecret] = useState("");
  const onChangeEmail = (event) => {
    setInputEmail(event.target.value);
  };
  const onChangeSecret = (event) => {
    setInputSecret(event.target.value);
  };

  return (
    <div className="text-white mt-10">
      <Card
        isBlurred
        className="w-min m-auto mt-3 p-8 pb-2 pt-2 text-white"
        style={{ backgroundColor: "rgb(255,255,255,0.1)" }}
      >
        <CardHeader className="justify-center">
          <h1 className="text-center text-2xl">Recovery</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={() => {}} className="contents">
            <MyInput
              item={{
                name: "email",
                type: "email",
                placeholder: "example@gmail.com",
                label: "Email",
              }}
              handleChange={onChangeEmail}
              value={inputEmail}
            />
            <MyInput
              className="mt-3"
              handleChange={onChangeSecret}
              value={inputSecret}
              item={{
                name: "text",
                type: "number",
                placeholder: "000000",
                label: "Secret code",
              }}
              withLink={{ nameLink: "forget your secret code?", href: "" }}
            />
            <Button
              type="submit"
              isDisabled={!(inputEmail && inputSecret)}
              className="w-2/5 h-8 mx-auto text-sm font-bold rounded-full bg-orange text-white mt-6"
            >
              Login
            </Button>
          </form>
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
