import { LuMessageSquare } from "react-icons/lu";
import MyInput from "../MyInput";
import { useEffect, useState } from "react";

const { Button, Card } = require("@nextui-org/react");
const { IoIosCloseCircleOutline } = require("react-icons/io");

export default function AccessLockedAlert({ isShow, onSubmit }) {
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setShowAlert(isShow);
  }, [isShow]);
  return (
    <div
      className={`${
        showAlert ? "flex" : "hidden"
      } absolute justify-center items-center w-screen h-screen bg-primary z-50`}
      style={{ opacity: "0.95" }}
    >
      <Card
        isBlurred
        className="bg-primary shadow-lg text-center text-white rounded-xl py-6"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          width: "350px",
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
      >
        <IoIosCloseCircleOutline
          className="text-white h-6 w-6 self-end"
          onClick={() => setShowAlert(false)}
        />
        <LuMessageSquare className="text-white h-12 w-12 m-auto" />

        <p className="text-xl font-medium mt-6">Access Locked</p>
        <div className="flex self-center">
          <p className="text-sm">
            Enter your <b>master key</b> to unlock
          </p>
        </div>
        <div className="flex gap-3 self-center mt-5">
          <input
            className="h-12 w-10 bg-inherit border-2 rounded-md text-3xl text-center outline-none focus:border-cyan-300"
            type="number"
          />
          <input
            className="h-12 w-10 bg-inherit border-2 rounded-md text-3xl text-center outline-none focus:border-cyan-300"
            type="number"
          />
          <input
            className="h-12 w-10 bg-inherit border-2 rounded-md text-3xl text-center outline-none focus:border-cyan-300"
            type="number"
          />
        </div>
        <Button
          onClick={onSubmit}
          className="text-white bg-orange w-fit m-auto text-sm rounded-full mt-6"
          style={{ paddingLeft: "25px", paddingRight: "25px" }}
        >
          Unlock
        </Button>
      </Card>
    </div>
  );
}
