import { useRouter } from "next/router";

export default function Referrals() {
  const router = useRouter();
  return (
    <div className="h-screen container m-auto no-scrollbar overflow-y-scroll pb-[150px]">
      <div className="w-full md:w-[720px] lg:w-[950px] m-auto mt-4 pb-3">
        <div className="w-fit pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50/15 dark:bg-default-50/15 backdrop-blur-xs">
            MY CARDS
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]"></div>
        </div>
      </div>
      <div className="mt-6 md:m-auto md:mt-10 w-11/12 md:w-[720px] lg:w-[950px] py-8 px-3 md:px-6 backdrop-blur-xs bg-white dark:bg-default-100 rounded-lg shadow-md">
        {/* Title */}
        <div className="w-full border-b">
          <h1 className="text-sm text-primary font-bold mb-3">
            LIST OF MY CARDS
          </h1>
        </div>
      </div>
      <div></div>
    </div>
  );
}
