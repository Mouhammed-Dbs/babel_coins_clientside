import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button, Divider } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { LuWallet } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { MdLogin } from "react-icons/md";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import Canva from "@/components/utils/Canva.js";
import screenIs from "../screen.js";
import axios from "axios";
import MyLoading from "@/components/MyLoading.js";
import { isUserLogged } from "../../public/global_functions/auth.js";
import BGShapes from "@/components/utils/BGShapes.js";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");
  const t_w = useTranslations("Words");
  const [mounted, setMount] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([
    { name: "ETHERUM", symbol: "ETH", price: 25000, change24d: 15 },
    { name: "MATIC", symbol: "MATIC", price: 1.2, change24d: 20 },
    { name: "USDT", symbol: "USDT", price: 1, change24d: -15 },
    { name: "TRON", symbol: "TRX", price: 1.2, change24d: 20 },
  ]);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  const getCoins = useCallback(async () => {
    const myCoins = [
      "BTC",
      "ETH",
      "TRX",
      "BCH",
      "LTC",
      "DASH",
      "DOGE",
      "BNB",
      "MATIC",
    ];
    try {
      const res = await axios.get(`/api/coins?symbols=` + myCoins.join(","));
      const result = res.data;
      let arrayCoins = Array();
      myCoins.forEach((coin) => {
        arrayCoins.push({
          name: result[coin][0]["name"],
          symbol: result[coin][0]["symbol"],
          price: result[coin][0]["quote"]["USD"]["price"].toFixed(2),
          change24d:
            result[coin][0]["quote"]["USD"]["percent_change_24h"].toFixed(2),
        });
      });
      return arrayCoins;
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  useEffect(() => {
    setMount(true);
    Promise.all([
      isUserLogged()
        .then((result) => {
          if (result.error) {
            setIsLogged(false);
            setLoading(false);
          } else {
            setLoading(false);
            setIsLogged(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          setIsLogged(false);
        }),
      getCoins()
        .then((coins) => {
          setCoins(coins);
        })
        .catch((err) => {
          setPageLoading(false);
        }),
    ]).then(() => {
      setPageLoading(false);
    });
  }, [getCoins]);

  if (!mounted)
    return (
      <MyLoading
        msg={t_w("Loading")}
        color="primary"
        className={`h-screen text-black dark:text-white mt-24`}
      />
    );

  if (pageLoading)
    return (
      <MyLoading
        msg={t_w("Loading")}
        color="primary"
        className={`h-screen text-black dark:text-white mt-24`}
      />
    );

  return (
    <div className="relative mx-auto">
      <div className="section1 bg-white/85 dark:bg-gray-950 w-full h-fit text-center pt-16 pb-16 pl-2 pr-2 md:pr-4 md:pl-4">
        <h1 className="font-bold text-xl md:text-2xl relative z-10 whitespace-pre-line">
          {t("section1-p")}
        </h1>
        {!loading ? (
          <div className="flex justify-center mt-6">
            {!isLogged ? (
              <div>
                <Button
                  onClick={() => {
                    router.push("signup");
                  }}
                  className="bg-orange font-bold rounded-full text-white"
                >
                  <TbMoneybag />
                  {t("section1-btn-createAccount")}
                </Button>
                <Button
                  onClick={() => {
                    router.push("login");
                  }}
                  className="bg-inherit ltr:ml-4 rtl:mr-4 font-bold rounded-full border-2 border-primary"
                >
                  <MdLogin />
                  {t("section1-btn-login")}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  router.push("account");
                }}
                className="bg-orange font-bold rounded-full text-white"
              >
                <LuWallet />
                {t("section1-btn-myAccount")}
              </Button>
            )}
          </div>
        ) : (
          <MyLoading />
        )}
        <div className="mx-2 md:mx-8">
          <Swiper
            className="my-10 h-52 max-w-min"
            slidesPerView="auto"
            spaceBetween={10}
            loop={false}
            autoplay={{
              delay: 2000,
            }}
          >
            {coins.map((value, index) => (
              <SwiperSlide
                style={{ width: "140px", height: "fit-content" }}
                className="shadow-lg mx-3 top-[5%] rounded-xl"
                key={index}
              >
                <Slide
                  coinPair={`${value["symbol"]}/USD`}
                  symbol={value["symbol"]}
                  price={value["price"]}
                  change={value["change24d"]}
                >
                  {value}
                </Slide>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="section2 h-fit dark:bg-slate-950/75 bg-slate-50/95 p-3 md:p-6 pt-20 md:py-28 pb-24">
        <BGShapes
          style={{ paddingTop: "0px" }}
          showThree={true}
          fillColor="dark:bg-slate-950 bg-slate-50"
          className="w-[93%] h-fit"
        />
        <div className="md:w-5/6 py-1 w-full m-auto text-center grid grid-cols-4 sm:grid-cols-5 text-sm md:text-base lg:text-lg pl-4 dark:bg-slate-950/35 bg-slate-50/35 backdrop-blur-md rounded-md">
          <h6 className="">{t("section2-h-nameCoin")}</h6>
          <h6>{t("section2-h-lastPrice")}</h6>
          <h6 className="hidden sm:block">{t("section2-h-24Change")}</h6>
          <h6 className="hidden">{t("section2-h-LastOrder")}</h6>
          <h6>{t("section2-h-7DaysChart")}</h6>
        </div>
        <ul className="flex flex-col gap-6 mt-3">
          {coins.map((value) => (
            <RowCard
              key={value["name"]}
              name={value["name"]}
              symbol={value["symbol"]}
              price={value["price"]}
              change={value["change24d"]}
            />
          ))}
        </ul>
      </div>

      <div className="section3 flex items-center h-[450px] bg-primary dark:bg-slate-900">
        {/* <p className="absolute">xxxxxxxxxxxxxxxxxxxxx</p> */}
        <div className="md:flex items-center h-[300px] rounded-none py-3 dark:bg-slate-950/55">
          <p className="md:w-1/2 ltr:pl-2 ltr:lg:pl-8 rtl:pr-2 rtl:lg:pr-8 text-white text-center my-3 md:my-0 text-xl">
            {t("section3-p")}
          </p>
          <div className="flex md:w-1/2 justify-center md:justify-end p-1 md:p-3">
            <Image
              className="w-3/4 rounded-lg border-3 border-black border-b-4"
              width={3000}
              height={3000}
              alt=""
              src={"/images/screen.png"}
            />
          </div>
        </div>
      </div>

      <div className="section4 bg-neutral-100 dark:bg-gray-950 pb-12 px-4 md:px-10">
        <h1 className="text-center text-3xl font-bold p-6 md:p-10">
          {t("section4-h")}
        </h1>
        <div className="grid grid-rows-1 gap-3">
          <Card isBlurred className={`dark:bg-slate-800/55 bg-white/85 `}>
            <CardBody className={router.locale === "ar" && "text-right"}>
              <div className="flex justify-between">
                <p className="text-xs md:text-base self-center px-4">
                  {t("section4-p-card1")}
                </p>
                <Image
                  alt=""
                  width={5000}
                  height={5000}
                  src={"/images/3bb.png"}
                  className="w-1/3"
                />
              </div>
            </CardBody>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Card isBlurred className="dark:bg-slate-800/55 bg-white/85">
              <CardBody className={router.locale === "ar" && "text-right"}>
                <div className="flex justify-between h-full">
                  <p className="w-2/3 text-xs md:text-base self-center px-4">
                    {t("section4-p-card2")}
                  </p>
                  <div className="flex justify-center w-1/3">
                    <Image
                      alt=""
                      width={5000}
                      height={5000}
                      src={"/images/1bb.png"}
                      className="w-full self-center"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card isBlurred className="dark:bg-slate-800/55 bg-white/85">
              <CardBody className={router.locale === "ar" && "text-right"}>
                <div className="flex justify-between h-full">
                  <p className="w-2/3 text-xs md:text-base self-center  px-4">
                    {t("section4-p-card3")}
                  </p>
                  <div className="flex justify-end w-1/3">
                    <Image
                      alt=""
                      width={5000}
                      height={5000}
                      src={"/images/2bb.png"}
                      className="w-full h-48 md:h-full"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide({ coinPair, symbol, price, change }) {
  return (
    <Card
      style={{ width: "inherit" }}
      shadow="sm"
      isBlurred
      isPressable
      className={`bg-white/65 dark:bg-slate-900/55 max-w-[140px] shadow-md`}
    >
      <CardHeader className="flex gap-3">
        <Image
          className="w-6 h-6"
          alt="nextui logo"
          height={18}
          radius="sm"
          src={`/images/coins/${symbol}.png`}
          width={18}
        />
        <div className="flex flex-col text-left">
          <p className="text-sm">{coinPair}</p>
          <p className="text-xs text-default-700">${price}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="p-0 py-2">
        <Canva
          vstep={0.11}
          value={[400, 210, 700, 270, 530, 1200, 610, 800, 210, 300]}
          color={change > 0 ? "green" : "red"}
          width="140px"
          height="70px"
        ></Canva>
      </CardBody>
      <Divider />
      <CardFooter className="p-2 flex justify-between">
        <p
          style={{ direction: "ltr" }}
          className={`${
            change > 0 ? "text-green-500" : "text-red-600"
          } text-xs`}
        >
          {change > 0 ? "+" + change : change}%
        </p>
        <CgArrowsExchangeAltV className="text-default-700" />
      </CardFooter>
    </Card>
  );
}

function RowCard({ name, symbol, price, change, lastOrder, weekly }) {
  const [data, setData] = useState(null);
  const t = useTranslations("Index");

  useEffect(() => {
    setData(screenIs("md"));
    const handleResize = () => {
      setData(screenIs("md"));
    };
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);
  return (
    <Card
      shadow="md"
      className="md:w-5/6 w-full border-1 border-default-200 bg-white/55 dark:bg-slate-900/55 backdrop-blur-md m-auto hover:shadow-[0_0px_3px_2px_rgba(255,179,15,0.3)] dark:hover:text-orange"
    >
      <CardBody>
        <div className="grid grid-cols-4 sm:grid-cols-5 justify-items-center gap-1 md:gap-4 text-sm md:text-base">
          <div className="flex justify-self-start">
            <Image
              className="md:ml-4 w-9 h-9"
              src={`/images/coins/${symbol}.png`}
              alt=""
              width={20}
              height={20}
            />
            <p className="rtl:mr-2 rtl:mr4 ltr:ml-2 ltr:md:ml-4 text-xs self-center">
              {name}
            </p>
          </div>
          <p className="self-center text-xs">{price}</p>
          <p
            style={{ direction: "ltr" }}
            className={`${
              change > 0 ? "text-green-500" : "text-red-600"
            } self-center text-xs hidden sm:block`}
          >
            {change > 0 ? "+" + change : change}%
          </p>
          <p className="self-center hidden">{lastOrder}--</p>
          <Canva
            value={[400, 210, 700, 270, 530, 1000, 610, 800, 210, 700]}
            color={change > 0 ? "green" : "red"}
            hstep={0.14}
            vstep={0.11}
          ></Canva>
          <Button
            size={data ? "md" : "sm"}
            className="rounded-full font-bold w-fit text-orange hover:bg-orange hover:text-white"
            color="warning"
            variant="bordered"
          >
            {t("section2-btn-rowCardTrade")}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
