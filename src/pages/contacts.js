import MyInput from "@/components/utils/Input";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useState } from "react";

export default function Contacts() {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messValue, setMessValue] = useState("");
  const [agreeValue, setAgreeValue] = useState(false);
  return (
    <div className="text-white mt-20 md:mt-5">
      <Card
        isBlurred
        className="w-5/6 md:w-2/3 m-auto mt-4 p-4 px-6 text-white"
        style={{ backgroundColor: "rgb(255,255,255,0.1)" }}
      >
        <CardHeader>
          <h1 className="w-full text-center text-xl">CONTACT US</h1>
        </CardHeader>
        <CardBody className="grid md:grid-template-columns md:gap-x-4">
          <form className="w-full">
            <MyInput
              className="w-full md:w-72"
              handleChange={(e) => setNameValue(e.target.value)}
              value={nameValue}
              item={{
                name: "text",
                type: "text",
                placeholder: "John",
                label: "Name",
              }}
            />
            <MyInput
              className="mt-3 w-full md:w-72"
              handleChange={(e) => setEmailValue(e.target.value)}
              value={emailValue}
              item={{
                name: "email",
                type: "email",
                placeholder: "you@example.com",
                label: "Email",
              }}
            />

            <div className="relative mt-3">
              <textarea
                value={messValue}
                onChange={(e) => {
                  setMessValue(e.target.value);
                }}
                className={`peer/email w-full md:w-72 h-24 resize-none self-center text-white placeholder-slate-300 mt-6 rounded-lg border-2 text-xs p-2 bg-inherit focus:outline-none focus:border-cyan-300 scrollbar-hide ${
                  messValue
                    ? "border-cyan-300"
                    : "border-white border-opacity-35"
                }`}
                type="text"
                placeholder="Enter your message"
              ></textarea>
              <label
                className={`absolute -top-0 -left-0 text-sm ml-1 mb-1 peer-focus/email:text-cyan-300 ${
                  messValue ? "text-cyan-300" : "text-white text-opacity-65"
                }`}
              >
                Your message
              </label>
            </div>
            <div className="flex mt-3">
              <input
                onChange={() => {
                  setAgreeValue(!agreeValue);
                }}
                checked={agreeValue}
                value={agreeValue}
                type="checkbox"
                className="peer bg-white text-white"
              ></input>
              <label className="text-xs peer-checked:text-cyan-300 text-white text-opacity-65 ml-1">
                I agree to the processing of the personal data provided
              </label>
            </div>
          </form>
          <div className="hidden md:contents pl-8">
            <p>
              hi you cckals f ef eg rgergre ger g rewgegyjhy uk iol oil 0p; 0 ;
              ik7 uy5hy5hg54 tg45 g3 g43ef324f 4ghy j 8k 798k 8 u7j 6 j6
            </p>
            <div className="w-full flex justify-center mt-8">
              {/* <Image src={'/images/logo.svg'} alt="" width={40} height={40}></Image> */}
            </div>
          </div>
        </CardBody>
        <CardFooter className="p-0 justify-center">
          <Button
            isDisabled={!(agreeValue && nameValue && emailValue && messValue)}
            className="bg-orange rounded-full text-white h-8 w-36 hover:bg-white hover:text-orange"
          >
            SEND
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
