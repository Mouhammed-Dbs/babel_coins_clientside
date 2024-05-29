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

export default function ContactUs() {
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
            <h1 className="w-full text-center text-xl">CONTACT US</h1>
          </CardHeader>
          <CardBody className="grid md:grid-template-columns md:gap-x-4">
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
                  placeholder: "John",
                  label: "Name",
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
                  placeholder: "you@example.com",
                  label: "Email",
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
              <div className="flex mt-3 ml-1">
                <input
                  onChange={() => {
                    setAgreeValue(!agreeValue);
                  }}
                  checked={agreeValue}
                  value={agreeValue}
                  type="checkbox"
                  className="peer accent-white"
                ></input>
                <label className="text-xs peer-checked:text-cyan-300 text-white text-opacity-65 ml-2">
                  I agree to the processing of the personal data provided
                </label>
              </div>
              <MyMessage show={validate.error} message={validate.msg} />
            </div>
            <div className="hidden md:block pl-1">
              <p>
                If you have any questions, suggestions, or feedback, please feel
                free to contact us using the form below.
                <br />
                We value your input and strive to provide excellent customer
                service.
                <br />
                <br />
                Our team will get back to you as soon as possible to assist you
                with your inquiries.
              </p>
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
              SEND
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
