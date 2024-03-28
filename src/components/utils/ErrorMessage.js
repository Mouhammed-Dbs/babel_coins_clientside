import { IoWarning } from "react-icons/io5";

export default function ErrorMessage({ show, message }) {
  return (
    <div
      className={`flex text-red-600 font-bold text-xs mt-2 text-left place-content-center w-fit ${
        show ? "block" : "hidden"
      }`}
    >
      <IoWarning className="self-center mr-1 text-base w-5 h-5" />
      <p className="self-center">{message}</p>
    </div>
  );
}
