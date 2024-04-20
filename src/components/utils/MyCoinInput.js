import { useState } from "react";

export default function MyCoinInput({ symbol, label, onChange }) {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <label
        style={{ fontFamily: "unset", fontStyle: "normal" }}
        className="text-sm"
      >
        {label}
      </label>
      <div
        className={`flex border-3 w-full max-w-64 h-9 rounded-md hover:border-primary hover:bg-primary hover:text-white ${
          selected
            ? "border-primary bg-primary text-white"
            : "border-gray-400 bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <input
          onChange={onChange}
          className="peer outline-none w-full px-2 rounded-l-md text-black dark:text-white"
          onFocus={() => setSelected(true)}
          onBlur={() => setSelected(false)}
        />
        <span className="self-center w-fit text-center px-1 text-xs pt-[2px]">
          {symbol}
        </span>
      </div>
    </div>
  );
}
