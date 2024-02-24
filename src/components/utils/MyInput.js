import Link from "next/link";

export default function MyInput({
  item,
  withLink,
  handleChange,
  value,
  className,
  defaultValue,
  readOnly = false,
  textColor,
  color,
  selectedBorderColor,
  selectedLabelColor,
}) {
  const { name, type, placeholder, label } = item;
  return (
    <div className={`relative ${className}`}>
      <input
        name={name}
        onChange={handleChange}
        value={value}
        className={`peer w-full self-center placeholder-slate-300 mt-6 rounded-lg border-2 text-xs p-2 bg-inherit focus:outline-none focus:border-cyan-300 ${
          value
            ? "border-cyan-300"
            : color != undefined
            ? color
            : "border-white border-opacity-35"
        } ${textColor != undefined ? textColor : "text-black dark:text-white"}`}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={readOnly}
      ></input>
      {withLink !== undefined ? (
        <Link
          href={withLink.href}
          className="text-cyan-300 text-xs absolute -bottom-0 -right-0 mb-3 mr-2"
        >
          {withLink.nameLink}
        </Link>
      ) : (
        ""
      )}
      <label
        className={`absolute -top-0 -left-0 text-sm ml-1 mb-1 peer-focus:text-cyan-300 text-opacity-80 ${
          value ? "text-cyan-300" : color != undefined ? color : "text-white"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
