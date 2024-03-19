import { Button } from "@nextui-org/react";
import MyInput from "../utils/MyInput";
import { useState } from "react";

export default function SupportNewTicket() {
  const [numFiles, setNumFiles] = useState(1);
  const [files, setFiles] = useState(["f0"]);
  return (
    <div
      className={`w-full mt-5 rounded-md md:p-6 py-4 px-1 bg-white dark:bg-default-100 shadow-md`}
    >
      <MyInput
        color="border-gray-500"
        className="w-full md:w-96 border-black mb-3 mt-3"
        item={{
          label: "Subject: *",
          name: "subject",
          type: "text",
          placeholder: "",
        }}
      />
      <MyInput
        color="border-gray-500"
        className="w-full md:w-96 border-black mb-3 mt-3"
        item={{
          label: "Operation ID:",
          name: "operation_id",
          type: "text",
          placeholder: "",
        }}
      />
      <div className="relative mt-3">
        <textarea
          className={`w-96 h-44 resize-none self-center placeholder-slate-300 mt-6 rounded-lg border-2 text-xs p-2 bg-inherit scrollbar-hide border-gray-500 focus:outline-none focus:border-cyan-300`}
          type="text"
          placeholder=""
        ></textarea>
        <label
          className={`absolute -top-0 -left-0 text-sm ml-1 mb-1 text-opacity-65`}
        >
          Message *
        </label>
      </div>
      <div className="mt-2">
        <div className="w-fit">
          <label className="block">Files:</label>
          {numFiles && files.map((item) => <ItemFile key={item} id={item} />)}
        </div>
        <Button
          onClick={() => {
            files.push("f" + files.length);
            setNumFiles(numFiles + 1);
          }}
          size="sm"
          className="mt-1 px-1 h-6 w-fit justify-start text-sm underline"
        >
          more
        </Button>
      </div>
    </div>
  );
}

function ItemFile({ id }) {
  const [valFile, setValFile] = useState(null);
  return (
    <div className="block py-1">
      <label
        for={`file-upload-` + id}
        class="p-1 text-sm rounded-md cursor-pointer border-2 border-gray-500"
      >
        Choose a file {valFile}
      </label>
      <input
        type="file"
        id={`file-upload-` + id}
        className="hidden"
        defaultValue={valFile}
        onChange={(e) => {
          setValFile(e.target.files[0].name);
        }}
      />
    </div>
  );
}
