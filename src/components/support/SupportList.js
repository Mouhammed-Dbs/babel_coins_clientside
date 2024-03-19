import { IoCheckmarkDoneCircle, IoTimeOutline } from "react-icons/io5";

export default function SupportList() {
  return (
    <div
      className={`w-full mt-5 rounded-md md:p-6 py-4 px-1 bg-white dark:bg-default-100 shadow-md`}
    >
      <div className="mx-1 md:mx-4">
        <div className="hidden md:flex md:gap-4 py-2 px-2 mt-3 font-bold text-gray-700 dark:text-gray-300 text-center">
          <h3 className="w-3/12 text-sm text-start">SUBJECT</h3>
          <h3 className="w-2/12 text-sm">DATE</h3>
          <h3 className="w-2/12 text-sm">EDITED</h3>
          <h3 className="w-2/12 text-sm">CNT</h3>
          <h3 className="w-2/12 text-sm">ID</h3>
          <h3 className="w-1/12 text-sm">STATUS</h3>
        </div>
        <ul className="w-full">
          <ItemListSupport
            subject="this is subject box it is responsive on many screens"
            date="16 Jan 2024 23:52"
            edited="2 Jul 2024 23:52"
            cnt="1"
            id="32907430"
            status={false}
          />
          <ItemListSupport
            subject="this is subject box this is subject box it is responsive on many screens"
            date="16 Jan 2024 23:52"
            edited="2 Jul 2024 23:52"
            cnt="1"
            id="32907430"
            status={true}
          />
          <ItemListSupport
            subject="this is subject box it is responsive on many screens"
            date="16 Jan 2024 23:52"
            edited="2 Jul 2024 23:52"
            cnt="1"
            id="32907430"
            status={false}
          />
          <ItemListSupport
            subject="this is subject box it is responsive on many screens"
            date="16 Jan 2024 23:52"
            edited="2 Jul 2024 23:52"
            cnt="1"
            id="32907430"
            status={false}
          />
        </ul>
      </div>
    </div>
  );
}

function ItemListSupport({ subject, date, edited, cnt, id, status }) {
  return (
    <li className="md:flex md:gap-4 border-b-1 md:border-b-2 py-3 px-2 font-bold text-left md:text-center">
      <div className="flex md:w-3/12 w-full py-2 md:py-1">
        <label className="block md:hidden text-sm mr-2 text-center min-w-20">
          SUBJECT
        </label>
        <p className="w-full text-sm opacity-70 self-center md:text-left">
          {subject}
        </p>
      </div>
      <div className="flex md:w-2/12 w-full py-2 md:py-1">
        <label className="block md:hidden text-sm mr-2 text-center min-w-20">
          DATE
        </label>
        <p className="w-full text-sm opacity-70 self-center md:px-4">{date}</p>
      </div>
      <div className="flex md:w-2/12 w-full py-2 md:py-1">
        <label className="block md:hidden text-sm mr-2 text-center min-w-20">
          EDITED
        </label>
        <p className="w-full text-sm opacity-70 self-center md:px-4">
          {edited}
        </p>
      </div>
      <div className="flex md:w-2/12 w-full py-2 md:py-1">
        <label className="block md:hidden text-sm mr-2 text-center min-w-20">
          CNT
        </label>
        <p className="w-full text-sm opacity-70 self-center md:px-4">{cnt}</p>
      </div>
      <div className="flex md:w-2/12 w-full py-2 md:py-1">
        <label className="block md:hidden text-sm mr-2 text-center min-w-20">
          ID
        </label>
        <p className="w-full text-sm opacity-70 self-center md:px-4">{id}</p>
      </div>
      <div className="flex md:w-1/12 w-full overflow-hidden md:place-content-center place-content-start py-2 md:py-1">
        <label className="block md:hidden text-sm mr-2 text-center min-w-20">
          STATUS
        </label>
        {status ? (
          <IoCheckmarkDoneCircle className="w-5 h-5 md:h-8 md:w-8 self-center  text-green-400" />
        ) : (
          <IoTimeOutline className="w-5 h-5 md:h-8 md:w-8 self-center text-gray-500" />
        )}
      </div>
    </li>
  );
}
