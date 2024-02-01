import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button, Divider } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { TbMoneybag } from "react-icons/tb";
import { MdLogin } from "react-icons/md";
import Canva from "@/components/utils/Canva.js";
import screenIs from "../screen.js";

export default function Home() {
  const router = useRouter();
  const styleSwiperSlider = {
   // width: "140px",
    height: "fit-content",
    top: "5%",
    marginRight: "5px",
    margin: "20px",
    borderRadius: "13px",
    //boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 8px 0 rgba(0, 0, 0, 0.19)",
  };
  const data = [
    "ali",
    "ahmad",
    "ali",
    "ahmad",
    "ali",
    "ahmad",
    "ali",
    "ahmad",
    "ali",
    "ahmad",
    "ali",
    "ahmad",
    "ali",
    "ahmad",
  ];

  return (
    <div className="mx-auto">
      <div className="section1 w-full text-center pt-16 pb-16 pl-2 pr-2 md:pr-4 md:pl-4">
        <h1 className="font-bold text-2xl">
          Send, Exchange or Accept fiat and Cryptocurrency
          <br />
          on your personal Account or Website.
        </h1>
        <div className="flex justify-center mt-6">
          <Button onClick={()=>{router.push('signup')}} className='bg-orange font-bold rounded-full text-white'>
            <TbMoneybag />
            Create Account
          </Button>
          <Button onClick={()=>{router.push('login')}} className="bg-inherit ml-4 font-bold rounded-full border-2 border-primary">
            <MdLogin />
            Login
          </Button>
        </div>
        <div className="mx-2 md:mx-8">
          <Swiper
            className="my-10 h-48"
            slidesPerView="auto"
            spaceBetween={20}
            loop={false}
            autoplay={{
              delay: 2000,
            }}
          >
            {data.map((value, index) => (
              <SwiperSlide style={{width:'140px',height:'fit-content'}} className="shadow-lg mx-3 top-[5%]" key={index}>
                <Slide coinPair="BTC/USD" price="500$">
                  {value}
                </Slide>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="section2 bg-neutral-100 dark:bg-default-50 p-6 pt-28 pb-24">
        <div className="md:w-5/6 w-full m-auto text-center grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 text-sm md:text-base lg:text-lg opacity-40 pl-4">
          <h6>Name Coin</h6>
          <h6>Last Price</h6>
          <h6 className="hidden sm:block">24 Change</h6>
          <h6 className="hidden md:block">Last Order</h6>
          <h6>7 days chart</h6>
        </div>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
        <RowCard></RowCard>
      </div>

      <div className="section3 h-screen pt-20 pb-20 bg-primary dark:dark:bg-cyan-200">
        <div className="relative">
          <p className="absolute">adFSGHDGDSFHHHHHHHHHHHHHHHHDDDDDDDDH</p>
          <Card
            isBlurred
            className="absolute w-screen rounded-none bg-opacity-0"
          >
            <CardBody>
              <p className="pl-2 lg:pl-8">
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="section4 bg-neutral-100 grid grid-rows-2 gap-3 pb-12 pl-10 pr-10">
        <h1 className="text-center text-3xl font-bold p-6 md:p-10">
          Why Trade on Babel Coins
        </h1>
        <Card isBlurred className="dark:bg-cyan-950 bg-neutral-200">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Card isBlurred className="dark:bg-cyan-950 bg-neutral-200">
            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
          </Card>
          <Card isBlurred className="dark:bg-cyan-950 bg-neutral-200">
            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Slide({ coinPair, price, inc, loss }) {
  return (
    <Card
      style={{ width: "inherit" }}
      shadow="sm"
      isBlurred
      isPressable
      className={`bg-background/60 dark:bg-default-100/50 max-w-[140px]`}
    >
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={18}
          radius="sm"
          src="/images/logo.svg"
          width={18}
        />
        <div className="flex flex-col text-left">
          <p className="text-md">{coinPair}</p>
          <p className="text-xs text-default-500">{price}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="p-0 pt-3 pb-3">
        <Canva
          value={[400, 210, 700, 270, 530, 1000, 610, 800, 210, 300]}
          color="green"
          width="140px"
          height="60px"
        ></Canva>
      </CardBody>
      <Divider />
      <CardFooter></CardFooter>
    </Card>
  );
}

function RowCard() {
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
      className="md:w-5/6 w-full bg-neutral-100 dark:bg-default-100 bg-opacity-100 m-auto mt-3 hover:shadow-[0_0px_3px_2px_rgba(255,179,15,0.3)] dark:hover:text-orange"
    >
      <CardBody>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 justify-items-center gap-1 md:gap-4 text-sm md:text-base lg:text-lg">
          <div className="flex">
            <Image
              className="ml-1 md:ml-4"
              src={"/images/logo.svg"}
              alt=""
              width={20}
              height={20}
            />
            <p className="ml-2 md:ml-4 self-center">Bitcoin</p>
          </div>
          <p className="self-center">$44000</p>
          <p className="self-center hidden sm:block">+0.11%</p>
          <p className="self-center hidden md:block">0.0003 BTC</p>
          <Canva
            value={[400, 210, 700, 270, 530, 1000, 610, 800, 210, 700]}
            color="red"
            step={0.14}
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
