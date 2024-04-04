import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Solutions() {
  const router = useRouter();
  const scrollSection = () => {
    const sectionId = "seconds_section";
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto bg-slate-50 dark:bg-default-50">
      <div className="flex w-full p-8 md:p-20 border-b-2 bg-violet-800 md:py-28">
        <div className="w-3/5 md:1/2 text-white">
          <div className="mb-4 w-3/4">
            <span className="block text-sm">WE PROVIDE</span>
            <span className="block text-4xl font-bold">
              BABELCOINS® Solutions
            </span>
            <span className="block text-3xl font-bold">
              for business and individuals
            </span>
            <p className="mt-5">
              BABELCOINS is ready to provide payment services for your personal
              needs and your business, we work with merchants and crypto
              services around the world.
            </p>
          </div>
          <div className="flex">
            <Button
              onClick={() => {
                router.push("signup");
              }}
              className="bg-white border-2 border-white rounded-full text-black text-lg py-7 px-8"
            >
              Create Account
            </Button>
            <Button
              onClick={() => {
                scrollSection();
              }}
              className="rounded-full border-2 border-white/40 text-white text-lg py-7 px-8 ml-4"
            >
              Find Out
            </Button>
          </div>
        </div>
        <div className="w-2/5 md:1/2 flex justify-center">
          <Image
            className="md:w-80 md:h-80 w-full h-fit self-center"
            width={3000}
            height={3000}
            alt=""
            src={"/images/1bb.png"}
          />
        </div>
      </div>
      <div id="seconds_section" className="pt-20 h-max mx-3 text-center">
        <h1 className="text-3xl font-bold">
          <span className="text-primary">BABELCOINS®</span> Account
        </h1>
        <p className="text-2xl mt-4">
          One wallet for all your Individual and Business needs
        </p>
      </div>
      <div className="w-fit m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 lg:gap-7 justify-items-center py-14 text-center">
        <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
          <Image
            className="m-auto w-max h-20"
            src={"/images/solutions/multi.png"}
            alt=""
            width={100}
            height={100}
          />
          <p className="mt-4 font-bold">Multi-currency Payeer Account</p>
        </div>
        <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
          <Image
            className="m-auto w-max h-20"
            src={"/images/solutions/internal.png"}
            alt=""
            width={100}
            height={100}
          />
          <p className="mt-4 font-bold">Internal transfers</p>
        </div>
        <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
          <Image
            className="m-auto w-max h-20"
            src={"/images/solutions/buy.png"}
            alt=""
            width={100}
            height={100}
          />
          <p className="mt-4 font-bold">Buy and Sell Crypto</p>
        </div>
        <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
          <Image
            className="m-auto w-max h-20"
            src={"/images/solutions/trading.png"}
            alt=""
            width={100}
            height={100}
          />
          <p className="mt-4 font-bold">Trading crypto platform</p>
        </div>
        <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
          <Image
            className="m-auto w-max h-20"
            src={"/images/solutions/payments.png"}
            alt=""
            width={100}
            height={100}
          />
          <p className="mt-4 font-bold">Payments accepting on website</p>
        </div>
        <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
          <Image
            className="m-auto w-max h-20"
            src={"/images/solutions/methods.png"}
            alt=""
            width={100}
            height={100}
          />
          <p className="mt-4 font-bold">25+ international payment methods</p>
        </div>
      </div>
      <div className="from-orange-500 to-orange-300 bg-gradient-to-r w-full py-16 text-center text-white">
        <Image
          className="m-auto w-max h-48"
          src={"/images/screen.png"}
          alt=""
          width={1000}
          height={1000}
        />
        <h1 className="mt-8 text-2xl font-bold">Babelcoins® Exchange</h1>
        <p className="m-auto mt-5 text-xl w-3/5">
          Trade and exchange various cryptocurrencies on our website or download
          applications for Android and IOS smartphones
        </p>
        <Button
          onClick={() => {
            router.push("exchange");
          }}
          className="rounded-full border-2 border-white text-white py-5 px-6 ml-4 mt-5 hover:bg-white hover:text-orange"
        >
          LEARN MORE
        </Button>
      </div>
      <div className="py-20 text-center">
        <h1 className="m-auto text-2xl font-bold w-1/2">
          Visa, MasterCard, Maestro/Cirrus Acquiring Babelcoins, Advcash, Spea
        </h1>
        <p className="text-lg mt-3">for crypto-services and merchants</p>
        <div className="w-fit m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 lg:gap-7 justify-items-center py-11">
          <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
            <Image
              className="m-auto w-max h-20"
              src={"/images/solutions/serv1.png"}
              alt=""
              width={100}
              height={100}
            />
            <p className="mt-4 font-bold">127 countries accepted</p>
          </div>
          <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
            <Image
              className="m-auto w-max h-20"
              src={"/images/solutions/serv2.png"}
              alt=""
              width={100}
              height={100}
            />
            <p className="mt-4 font-bold">
              High <br /> Limits
            </p>
          </div>
          <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
            <Image
              className="m-auto w-max h-20"
              src={"/images/solutions/serv3.png"}
              alt=""
              width={100}
              height={100}
            />
            <p className="mt-4 font-bold">
              99.5%
              <br /> conversation
            </p>
          </div>
          <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
            <Image
              className="m-auto w-max h-20"
              src={"/images/solutions/serv4.png"}
              alt=""
              width={100}
              height={100}
            />
            <p className="mt-4 font-bold">
              no
              <br />
              chargebacks
            </p>
          </div>
        </div>
        <p className="w-2/3 m-auto">
          You dont need a bank account, you will receive fiat to your Babelcoins
          account instantly, you can withdraw funds to crypto, mass payments to
          Babelcoins accounts or bank cards VISA, MasterCard from all over the
          world.
        </p>
        <Button
          onClick={() => {}}
          className="my-12 rounded-full border-2 border-primary text-primary py-5 px-6 ml-4 hover:bg-primary hover:text-white"
        >
          Demo Merchant
        </Button>
        <div className="relative flex justify-center mb-16 m-auto w-56">
          <Image
            className="overlapping-image absolute rounded-full shadow-md w-12 h-12"
            style={{ top: 0, left: 0 }}
            src={"/images/coins/USDT.png"}
            alt=""
            width={100}
            height={100}
          />
          <Image
            className="overlapping-image absolute rounded-full shadow-md w-12 h-12"
            style={{ top: 0, left: 35 }}
            src={"/images/coins/BTC.png"}
            alt=""
            width={100}
            height={100}
          />
          <Image
            className="overlapping-image absolute rounded-full shadow-md w-12 h-12"
            style={{ top: 0, left: 70 }}
            src={"/images/coins/ETH.png"}
            alt=""
            width={100}
            height={100}
          />
          <Image
            className="overlapping-image absolute rounded-full shadow-md  w-12 h-12"
            style={{ top: 0, left: 105 }}
            src={"/images/coins/MATIC.png"}
            alt=""
            width={100}
            height={100}
          />
          <Image
            className="overlapping-image absolute rounded-full shadow-md w-12 h-12"
            style={{ top: 0, left: 140 }}
            src={"/images/coins/BNB.png"}
            alt=""
            width={100}
            height={100}
          />
          <Image
            className="overlapping-image absolute rounded-full shadow-md w-12 h-12"
            style={{ top: 0, left: 175 }}
            src={"/images/coins/TRX.png"}
            alt=""
            width={100}
            height={100}
          />
        </div>
        <h1 className="m-auto text-2xl font-bold w-1/2">Cryptoacquiring</h1>
        <p className="text-lg mt-3">for Individuals and Business</p>
        <div className="w-fit m-auto grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5 justify-items-center py-11">
          <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
            <Image
              className="m-auto w-max h-20"
              src={"/images/solutions/p1.png"}
              alt=""
              width={100}
              height={100}
            />
            <p className="mt-4 font-bold">
              Instantly converted
              <br /> to USD, EUR.
            </p>
          </div>
          <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
            <Image
              className="m-auto w-max h-20"
              src={"/images/solutions/p2.png"}
              alt=""
              width={100}
              height={100}
            />
            <p className="mt-4 font-bold">
              no risks
              <br /> with rates
            </p>
          </div>
          <div className="w-56 p-5 border-1 shadow-lg rounded-lg dark:border-none dark:shadow-none">
            <Image
              className="m-auto w-max h-20"
              src={"/images/solutions/p3.png"}
              alt=""
              width={100}
              height={100}
            />
            <p className="mt-4 font-bold">
              no
              <br /> chargebacks
            </p>
          </div>
        </div>
        <p className="w-2/3 m-auto">
          Start accepting crypto on your website in few steps, all payments via
          BTC, LTC, ETH, USDT, DASH, XRP, BCH will be converted to USD, EUR or
          RUB (no risks with rates) and deposited to your Babelcoins account,
          instantly use balance for crypto payouts.
        </p>
        <Button
          onClick={() => {}}
          className="my-14 rounded-full border-2 border-primary text-primary py-5 px-6 ml-4 hover:bg-primary hover:text-white"
        >
          Demo Merchant
        </Button>
      </div>
    </div>
  );
}
