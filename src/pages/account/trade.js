import { Divider } from "@nextui-org/react";
export default function Trade() {
  return (
    <div className="flex w-full">
      <div className="w-[400px]">
        <div className="rounded-md m-2 bg-gray-200 w-full">
          <div className="flex justify-between p-2">
            <h1 className="font-bold self-end">BTC/USD</h1>
            <span className="text-sm self-end text-gray-500">68312.12</span>
            <span className="text-sm self-end text-green-500">+5.1%</span>
          </div>
          <Divider />
          <div className="p-2">
            <div className="flex justify-between text-[11px]">
              <span>PRICE(USD)</span>
              <span>AMOUNT(BTC)</span>
              <span>VALUE(USD)</span>
            </div>
            <ul className="bg-white">
              <li className="flex justify-between text-[11px] px-1">
                <span>44231.22</span>
                <span>0.000213</span>
                <span>200.32</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span>0.000213</span>
                <span className="text-green-500">200.32</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-green-500">44231.22</span>
                <span>0.000213</span>
                <span className="text-green-500">200.32</span>
              </li>
              <li className="flex justify-between text-[11px] px-1">
                <span className="text-red-500">44231.22</span>
                <span>0.000213</span>
                <span className="text-red-500">200.32</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full"></div>
      <div className="w-72"></div>
    </div>
  );
}
