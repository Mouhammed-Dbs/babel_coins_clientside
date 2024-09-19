import { Divider } from "@nextui-org/react";
import { getTimeHMFormated } from "../../../public/global_functions/helpers";

export default function TradeHistory({ pairSelected, historyOrders }) {
  const calculateAmountPrice = (amount, price) => {
    return Math.round(amount * price * 10000) / 10000;
  };
  return (
    <div className="w-full h-fit mt-5">
      <div className="rounded-md bg-gray-100 dark:bg-default-100 w-full h-full shadow-md">
        <div className="text-sm flex justify-between p-2">
          <h1 className="font-bold self-end">Trade History</h1>
        </div>
        <Divider />
        <div className="p-2 h-full text-[10px] md:text-[8px] lg:text-[10px]">
          <div className="flex justify-between bg-white/85 dark:bg-default-200/50 font-bold gap-2 p-1">
            <span>Time</span>
            <span>PRICE({pairSelected.secondCurrencyName})</span>
            <span>AMOUNT({pairSelected.firstCurrencyName})</span>
            <span>VALUE({pairSelected.secondCurrencyName})</span>
          </div>
          <Divider />
          <ul
            className={`bg-white/85 dark:bg-default-200/50 rounded-sm w-full h-[200px] md:h-[521px] overflow-scroll no-scrollbar py-1`}
            // style={{ height: heightWindow - 100 + "px" }}
          >
            {historyOrders.map((historyOrder) => (
              <li
                key={historyOrder._id}
                className="flex justify-between text-[11px] px-1 hover:bg-slate-200"
              >
                <span className="w-2/12">
                  {getTimeHMFormated(historyOrder.execuationDate)}
                </span>
                <span
                  className={
                    (historyOrder.orderAction == "sell"
                      ? `text-red-500`
                      : `text-green-500`) + " w-4/12 text-start"
                  }
                >
                  {historyOrder.price}
                </span>
                <span className="w-2/12 text-center">
                  {historyOrder.executedAmount}
                </span>
                <span
                  className={
                    (historyOrder.orderAction == "sell"
                      ? `text-red-500`
                      : `text-green-500`) + " w-4/12 text-end"
                  }
                >
                  {calculateAmountPrice(
                    historyOrder.executedAmount,
                    historyOrder.price
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
