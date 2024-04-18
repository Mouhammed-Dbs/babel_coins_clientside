import { FaSortDown, FaSortUp } from "react-icons/fa6";

export default function SortUpDown({ sort }) {
  return (
    <div className="relative h-full w-2 self-center ml-1 pt-[2px] text-gray-400">
      <FaSortUp className={`absolute ${sort === 1 ? "text-primary" : ""}`} />
      <FaSortDown
        className={`absolute top-1 ${sort === 2 ? "text-primary" : ""}`}
      />
    </div>
  );
}
