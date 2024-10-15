import { IoCheckmarkDoneCircleSharp, IoWarning } from "react-icons/io5";

export default function MyMessage({ show, message, isSuccess = false }) {
  return (
    <div
      className={`flex font-bold text-xs mt-2 text-left place-content-center w-fit ${
        !isSuccess ? "text-red-700" : "text-green-600"
      } ${show ? "block" : "hidden"}`}
    >
      {isSuccess ? (
        <IoCheckmarkDoneCircleSharp className="self-center mr-1 text-base w-5 h-5" />
      ) : (
        <IoWarning className="self-center mr-1 text-base w-5 h-5" />
      )}
      {message && (
        <p className="flex flex-col gap-1">
          {message.split("&-&").map((msg) => {
            if (msg.length <= 0) return <></>;
            return (
              <span key={msg} className="h-fit">
                {msg}
              </span>
            );
          })}
        </p>
      )}
    </div>
  );
}
