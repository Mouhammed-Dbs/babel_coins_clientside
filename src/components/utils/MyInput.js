import Link from "next/link";

export default function MyInput({
  item,
  withLink,
  value,
  className,
  defaultValue,
  onChange,
  readOnly = false,
  textColor,
  color,
  selectedBorderColor = "border-cyan-300",
  selectedLabelColor = "text-cyan-300",
  linkColor = "text-cyan-300",
}) {
  //border-cyan-300
  const { name, type, placeholder, label } = item;
  return (
    <div className={`relative ${className}`}>
      <input
        name={name}
        onChange={onChange}
        value={value}
        className={`peer w-full self-center placeholder-slate-300 rounded-lg border-2 text-xs p-2 bg-inherit ${
          item.label ? "mt-6" : ""
        } focus:outline-none focus:${selectedBorderColor} ${
          value
            ? selectedBorderColor
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
          className={`${linkColor} text-xs absolute -bottom-0 ltr:-right-0 rtl:-left-0 mb-9 mr-2`}
        >
          {withLink.nameLink}
        </Link>
      ) : (
        ""
      )}
      <label
        className={`absolute -top-0 ltr:-left-0 rtl:-right-0 text-sm ltr:ml-1 rtl:mr-1 mb-1 peer-focus:${selectedLabelColor} text-opacity-80 ${
          value ? selectedLabelColor : color != undefined ? color : "text-white"
        } ${item.label ? "" : "hidden"}`}
      >
        {label}
      </label>
    </div>
  );
}
