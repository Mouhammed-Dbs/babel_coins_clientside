import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Affiliates() {
  const router = useRouter();
  return (
    <div className="mx-auto bg-slate-50 dark:bg-default-50">
      <div className="flex w-full p-8 md:p-20 border-b-2 bg-violet-800">
        <div className="w-1/2 text-white">
          <div className="mb-4 w-3/4">
            <span className="block text-xs text-gray-400">PARTNER PROGRAM</span>
            <span className="block text-lg">EARN WITH</span>
            <span className="block text-3xl">BABELCOINS</span>
            <p className="mt-4">
              6 levels of referrals, up to 25% off all transactions. Instant
              payments, a lot of withdrawal methods available.
            </p>
          </div>
          <Button
            onClick={() => {
              router.push("signup");
            }}
            className="bg-orange font-bold rounded-full text-white px-7"
          >
            Create Account
          </Button>
        </div>
        <div className="w-1/2 flex justify-center">
          <Image
            className="w-80 h-80"
            width={3000}
            height={3000}
            alt=""
            src={"/images/1bb.png"}
          />
        </div>
      </div>
      <div className="pt-8 pb-40 h-max">
        <div className="h-fit shadow-md border-y-1 backdrop-blur-md">
          <h1 className="w-fit m-auto text-center mt-9 border-b-1 border-primary font-bold">
            PARTNER PROGRAM
          </h1>
          <div className="flex w-full p-8 md:p-20">
            <div className="w-1/2 flex justify-center">
              <Image
                className="w-80 h-80"
                width={3000}
                height={3000}
                alt=""
                src={"/images/1bb.png"}
              />
            </div>
            <div className="w-1/2 flex">
              <div className="self-center">
                <div className="h-fit">
                  <span className="block text-3xl">How it works</span>
                  <p className="mt-4">
                    Promote your personal link online and get up to 25% of the
                    revenue from our fees! You can withdraw funds instantly
                    using a variety of methods.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    router.push("signup");
                  }}
                  className="bg-orange font-bold rounded-full text-white mt-6 px-7"
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
