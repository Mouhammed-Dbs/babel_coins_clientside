import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import { TbMoneybag } from "react-icons/tb";
import Link from "next/link";
import { FaLock } from "react-icons/fa6";
import MyInput from "@/components/utils/Input";

export default function Signup() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");
  const onChangeEmail = (event) => {
    setInputEmail(event.target.value);
  };
  const onChangePass = (event) => {
    setInputPass(event.target.value);
  };
  
  return (
    <div className="text-white mt-10">
      <Card
        isBlurred
        className="w-min m-auto mt-3 p-8 pb-2 pt-2 text-white"
        style={{ backgroundColor: "rgb(255,255,255,0.1)" }}
      >
        <CardHeader className="justify-center">
            <h1 className="text-center text-2xl">Login</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={()=>{}} className='contents'>
            <h1 className="text-center text-xs mb-2">
            Please check that you are visiting correct URL
            </h1>
            <a className="w-fit flex justify-center items-center self-center text-xs p-1 px-2 rounded-full text-cyan-300 underline bg-slate-100 bg-opacity-25 cursor-not-allowed"><FaLock className="mr-1"/>https://babel.com</a>
            <MyInput
              className='mt-3'
              handleChange={onChangeEmail}
              value={inputEmail}
              item={{name:'email',type:'email',placeholder:'example@gmail.com',label:'Email'}} 
              withLink={{nameLink:'forget login?',href:''}}/>
            <MyInput
              className='mt-3'
              handleChange={onChangePass}
              value={inputPass}
              item={{name:'password',type:'text',placeholder:'password',label:'Password'}} 
              withLink={{nameLink:'forget password?',href:''}}/>
            <Button
              type="submit"
              isDisabled={!(inputEmail && inputPass)}
              className="w-2/5 h-8 mx-auto text-sm font-bold rounded-full bg-orange text-white mt-6"
            >
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
      <div className="flex w-fit m-auto mt-6">
        <p className="text-sm opacity-75 text-white">
          {`Don't have an account?`}
        </p>
        <Link href={'signup'} className="flex items-center text-sm text-orange ml-2 hover:underline">
            <TbMoneybag className="mr-1"/>
            Create account
        </Link>
      </div>
    </div>
  );
}
