import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import MyLoading from "@/components/MyLoading";
import { getBalanceCoins } from "../../../public/global_functions/coins";
import { useTranslations } from "next-intl";
import { loadMessages } from "@/lib/loadMessages";

export default function Balance() {
  const [pageLoading, setPageLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const t_w = useTranslations("Words");
  const t = useTranslations("AccountIndex");
  useEffect(() => {
    getBalanceCoins()
      .then((result) => {
        if (!result.error) setCoins(result.data);
        setPageLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPageLoading(false);
      });
  }, []);

  if (pageLoading)
    return (
      <MyLoading
        msg={t_w("Loading")}
        color="primary"
        className={`text-black dark:text-white bg-white/55 dark:bg-default-100/55 backdrop-blur-md mt-24`}
      />
    );

  return (
    <div className="container h-screen m-auto no-scrollbar overflow-y-scroll">
      <div className="w-full md:w-[520px] lg:w-[790px] m-auto mt-4 pb-3 md:m-auto">
        <div className="w-fit pb-[2px]">
          <h1 className="w-fit text-lg md:text-2xl font-bold bg-slate-50/15 dark:bg-default-50/15 backdrop-blur-xs">
            {t_w("Balance")}
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]"></div>
        </div>
        <p className="text-xs opacity-75 mt-1">{t("des")}</p>
      </div>

      <div className="w-full pb-44 md:m-auto md:w-full text-center">
        <div className="w-full">
          <div className="w-fit m-auto my-4 pb-[2px]">
            <h1 className="w-fit text-xl font-bold bg-slate-50/15 dark:bg-default-50/15 backdrop-blur-sm">
              {t("title")}
            </h1>
            <div className="w-full h-[1px] bg-gradient-to-r from-black dark:from-slate-300 via-gray-600 to-default-300 dark:bg-default-50 pb-[2px]"></div>
          </div>
        </div>

        <div className="w-fit m-auto pt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {coins.map((coin) => (
            <Card
              key={coin.network + "_" + coin.symbol}
              symbol={coin.symbol}
              currencyName={coin.currencyName}
              network={coin.network}
              validDepositeBalance={coin.validDepositeBalance}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ symbol, currencyName, network, validDepositeBalance }) {
  const router = useRouter();
  const t = useTranslations("AccountIndex");
  useEffect(() => {}, []);
  return (
    <div className="relative w-64 h-min mt-2 ltr:mr-2 rtl:ml-2 p-4 border-1 dark:border-default-100 border-gray-200 bg-white/55 dark:bg-black/55 text-center rounded-md shadow-lg backdrop-blur-sm">
      <div className="absolute shadow-inner overflow-hidden bg-slate-50/55 dark:bg-default-50/55 border-t-1 border-default-100 rounded-full w-14 h-14 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm">
        <div className="absolute w-full h-1/2 top-1/2 bg-white/55 dark:bg-black/15"></div>
      </div>
      <div className="absolute bg-white/55 dark:bg-default-100/15 rounded-full w-12 h-12 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm">
        <Image
          className="p-1"
          src={`/images/coins/${symbol}.png`}
          width={50}
          height={50}
          alt=""
        ></Image>
      </div>

      <div className="w-full mt-3">
        <h1 className="text-lg">{currencyName}</h1>
        <h1 className="text-sm">{network.includes(",") ? "-" : network}</h1>
        <h1 className="font-bold text-lg mt-1 mb-3">
          {validDepositeBalance.toFixed(2)}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-1 mb-2">
        <Button
          onClick={() =>
            router.push({
              pathname: "/account/add",
              query: { curr: currencyName },
            })
          }
          className="text-primary dark:text-secondary text-xs ltr:mr-2 rtl:ml-2 px-2 border-1 border-primary dark:border-secondary rounded-full h-7 hover:bg-primary dark:hover:bg-secondary hover:text-white"
        >
          {t("Deposit")}
        </Button>
        <Button
          onClick={() =>
            router.push({
              pathname: "/account/send",
              query: { curr: currencyName },
            })
          }
          className="text-primary dark:text-secondary text-xs ltr:ml-2 rtl:mr-2 px-2 border-1 border-primary dark:border-secondary rounded-full h-7 hover:bg-primary dark:hover:bg-secondary hover:text-white"
        >
          {t("Withdrawal")}
        </Button>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: await loadMessages(locale),
    },
  };
}
