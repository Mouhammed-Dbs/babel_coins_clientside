import { useEffect, useState } from "react";
import { MdOutlineContentCopy, MdOutlineDownloadDone } from "react-icons/md";

export function CopyButton({ className, copy }) {
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let timer;
    if (timerOn) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          setTimerOn(false);
          setSeconds(5);
          setCopied(false);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [seconds, timerOn]);

  return (
    <span className={className}>
      {copied ? (
        <MdOutlineDownloadDone size={18} className="text-green-700" />
      ) : (
        <MdOutlineContentCopy
          onClick={() => {
            navigator.clipboard.writeText(copy);
            setCopied(true);
            setTimerOn(true);
          }}
          size={18}
          className="text-primary cursor-pointer"
        />
      )}
    </span>
  );
}
