import { loadMessages } from "@/lib/loadMessages";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Affiliates() {
  const t = useTranslations("Affiliates");
  const router = useRouter();
  return (
    <div className="mx-auto bg-slate-50 dark:bg-default-50">
      <div className="flex w-full p-8 md:p-20 border-b-2 bg-violet-800">
        <div className="w-3/5 md:1/2 text-white">
          <div className="mb-4 w-3/4">
            <span className="block text-sm text-gray-300">
              {t("span-small")}
            </span>
            <span className="block text-lg">{t("span-large")}</span>
            <span className="block text-3xl">BABELCOINS</span>
            <p className="mt-4">{t("p-section1")}</p>
          </div>
          <Button
            onClick={() => {
              router.push("signup");
            }}
            className="bg-orange font-bold rounded-full text-white px-7"
          >
            {t("btn-CreateAccount")}
          </Button>
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
      <div className="pt-8 pb-40 h-max mx-3">
        <div className="h-fit shadow-md border-y-1 backdrop-blur-md">
          <h1 className="w-fit m-auto text-center mt-9 border-b-1 border-primary font-bold">
            {t("h-section2")}
          </h1>
          <div className="md:flex w-full p-8 md:p-20">
            <div className="w-full md:1/2 flex justify-center">
              <Image
                className="md:w-80 md:h-80 h-32 w-fit self-center"
                width={3000}
                height={3000}
                alt=""
                src={"/images/1bb.png"}
              />
            </div>
            <div className="w-full md:1/2 mt-3 md:mt-0 flex">
              <div className="self-center ltr:pl-3 rtl:pr-3">
                <div className="h-fit">
                  <span className="block text-3xl">{t("span-section2")}</span>
                  <p className="mt-4">{t("p-section2")}</p>
                </div>
                <Button
                  onClick={() => {
                    router.push("signup");
                  }}
                  className="bg-orange font-bold rounded-full text-white mt-6 px-7"
                >
                  {t("btn-CreateAccount")}
                </Button>
              </div>
            </div>
          </div>
        </div>
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
