import { useEffect, useState } from "react";

const { Button, Card } = require("@nextui-org/react");
const { default: Link } = require("next/link");
const { IoIosCloseCircleOutline } = require("react-icons/io");
const { IoCallOutline } = require("react-icons/io5");

export default function CallAlert({ isShow, onSubmit }) {
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
          minWidth: "350px",
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
      >
        <IoIosCloseCircleOutline
          className="text-white h-6 w-6 self-end"
          onClick={() => setShowAlert(false)}
        />
        <IoCallOutline className="text-white h-12 w-12 m-auto" />

        <p className="text-xl font-medium mt-6">Waiting for an incoming call</p>
        <p className="mt-3">
          To confirm <b>+98765874878</b>,
          <br />
          You need to mak a call to the number:
        </p>
        <p className="font-bold my-4">+96386796968</p>
        <p className="text-xs">After the call click the confirm button</p>
        <Button
          onClick={onSubmit}
          className="text-white bg-orange w-fit m-auto text-sm rounded-full mt-6"
          style={{ paddingLeft: "25px", paddingRight: "25px" }}
        >
          Confirm
        </Button>
        <Link href={""} className="underline text-orange text-sm mt-4">
          Send a SMS
        </Link>
      </Card>
    </div>
  );
}
