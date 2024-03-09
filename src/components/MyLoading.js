import { Spinner } from "@nextui-org/react";

export default function MyLoading({ color, msg, className }) {
  return (
    <div className={`w-full text-center ${className}`}>
      <p className="text-xl md:text-3xl mb-5">{msg}</p>
      <Spinner color={color} />
    </div>
  );
}
