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

export default function Home() {
  const [mounted, setMount] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [idUser, setIdUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [myCoins, setMyCoins] = useState([
    "BTC",
    "ETH",
    "TRX",
    "BCH",
    "LTC",
    "DASH",
    "DOGE",
    "BNB",
    "MATIC",
  ]);
  const router = useRouter();
  const getCoins = useCallback(async () => {
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
  }, [myCoins]);

  useEffect(() => {
    setMount(true);
    setIdUser(localStorage.getItem("babel-coins-user-token"));

    getCoins()
      .then((coins) => {
        setCoins(coins);
        setPageLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPageLoading(false);
      });
  }, [getCoins]);

  if (!mounted)
    return (
      <MyLoading
        msg="Loading BabelCoins.."
        color="primary"
        className={`text-black dark:text-white mt-24`}
      />
    );
  if (pageLoading)
    return (
      <MyLoading
        msg="Loading BabelCoins.."
        color="primary"
        className={`text-black dark:text-white mt-24`}
      />
    );

  return (
    <div className="mx-auto">
      <div className="section1 bg-neutral-200 dark:bg-default-50 w-full text-center pt-16 pb-16 pl-2 pr-2 md:pr-4 md:pl-4">
        <h1 className="font-bold text-xl md:text-2xl">
          Send, Exchange or Accept fiat and Cryptocurrency
          <br />
          on your personal Account or Website.
        </h1>
        <div className="flex justify-center mt-6">
          {!idUser ? (
            <div>
              <Button
                onClick={() => {
                  router.push("signup");
                }}
                className="bg-orange font-bold rounded-full text-white"
              >
                <TbMoneybag />
                Create Account
              </Button>
              <Button
                onClick={() => {
                  router.push("login");
                }}
                className="bg-inherit ml-4 font-bold rounded-full border-2 border-primary"
              >
                <MdLogin />
                Login
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
              My Account
            </Button>
          )}
        </div>
        <div className="mx-2 md:mx-8">
          <Swiper
            className="my-10 h-52"
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
      <div className="section2 bg-neutral-100 dark:bg-slate-900 p-3 md:p-6 pt-20 md:pt-28 pb-24">
        <div className="md:w-5/6 w-full m-auto text-center grid grid-cols-4 sm:grid-cols-5 text-sm md:text-base lg:text-lg opacity-40 pl-4">
          <h6>Name Coin</h6>
          <h6>Last Price</h6>
          <h6 className="hidden sm:block">24 Change</h6>
          <h6 className="hidden">Last Order</h6>
          <h6>7 days chart</h6>
        </div>
        {coins.map((value, index) => (
          <RowCard
            key={value["name"]}
            name={value["name"]}
            symbol={value["symbol"]}
            price={value["price"]}
            change={value["change24d"]}
          />
        ))}
      </div>

      <div className="section3 flex items-center h-[550px] pt-20 pb-20 bg-primary dark:bg-slate-800">
        {/* <p className="absolute">xxxxxxxxxxxxxxxxxxxxx</p> */}
        <div className="md:flex items-center h-3/4 rounded-none bg-white/15 py-3">
          <p className="md:w-1/2 pl-2 lg:pl-8 text-white md:text-left text-center my-3 md:my-0">
            Experience Seamless Crypto Mangment with <b>Babel Coins</b> Where
            Trust Meets Technology!
          </p>
          <div className="flex md:w-1/2 justify-center md:justify-end p-1 md:p-3">
            <Image
              className="w-11/12 md:w-3/4 rounded-lg border-3 border-black border-b-4"
              width={3000}
              height={3000}
              alt=""
              src={"/images/screen.png"}
            />
          </div>
        </div>
      </div>

      <div className="section4 bg-neutral-100 dark:bg-slate-900 pb-12 px-4 md:px-10">
        <h1 className="text-center text-3xl font-bold p-6 md:p-10">
          Why Trade on Babel Coins
        </h1>
        <div className="grid grid-rows-1 gap-3">
          <Card isBlurred className="dark:bg-slate-800 bg-neutral-200">
            <CardBody>
              <div className="flex justify-between">
                <p className="text-xs md:text-base self-center">
                  Make beautiful websites regardless of your design experience.
                </p>
                <Image
                  alt=""
                  width={5000}
                  height={5000}
                  src={"/images/3bb.png"}
                  className="w-1/2"
                />
              </div>
            </CardBody>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Card isBlurred className="dark:bg-slate-800 bg-neutral-200">
              <CardBody>
                <div className="flex justify-between h-full">
                  <p className="w-1/2 text-xs md:text-base self-center">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                  <div className="flex justify-end w-1/2">
                    <Image
                      alt=""
                      width={5000}
                      height={5000}
                      src={"/images/1bb.png"}
                      className="w-2/3 self-end"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card isBlurred className="dark:bg-slate-800 bg-neutral-200">
              <CardBody>
                <div className="flex justify-between h-full">
                  <p className="w-1/2 text-xs md:text-base self-center">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                  <div className="flex justify-end w-1/2">
                    <Image
                      alt=""
                      width={5000}
                      height={5000}
                      src={"/images/2bb.png"}
                      className="w-2/3 h-48 md:h-full"
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
      className={`bg-neutral-100/70 dark:bg-default-100/50 max-w-[140px] shadow-md`}
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
  }, []);
  return (
    <Card
      shadow="md"
      className="md:w-5/6 w-full dark:bg-slate-800 bg-neutral-100 bg-opacity-100 m-auto mt-3 hover:shadow-[0_0px_3px_2px_rgba(255,179,15,0.3)] dark:hover:text-orange"
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
            <p className="ml-2 md:ml-4 text-xs self-center">{name}</p>
          </div>
          <p className="self-center text-xs">{price}</p>
          <p
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
            Trade
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
