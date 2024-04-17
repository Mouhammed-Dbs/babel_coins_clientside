import { Spinner } from "@nextui-org/react";

export default function MyLoading({ color, msg, className }) {
  return (
    <div
      className={`w-fit m-auto px-11 py-5 text-center rounded-lg ${className}`}
    >
      <p className="text-xl md:text-3xl mb-5">{msg}</p>
      <Spinner color={color} />
    </div>
  );
}
