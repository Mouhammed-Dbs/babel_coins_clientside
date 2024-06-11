import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { loadMessages } from "@/lib/loadMessages";
export default function AboutUs() {
  const t = useTranslations("AboutUs");
  return (
    <div className="bg-slate-100 dark:bg-default-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex gap-5 md:gap-10 w-full p-7 md:mt-8 bg-slate-200 dark:bg-default-100 rounded-lg">
          <Image
            width={400}
            height={400}
            src="/images/logo/webp/babelcoins-logo-512.webp"
            alt="Cutting-edge Technology"
            className="w-fit h-20 md:h-44 self-center"
          />
          <div className="w-full md:w-11/12 self-center md:self-start md:px-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-secondary">
              {t("Intro-title")}{" "}
              <span className="text-primary">Babelcoins</span>
            </h1>
            <p className="text-lg hidden md:block">{t("Intro-des")}</p>
          </div>
        </div>
        <p className="text-lg px-7 py-5 block md:hidden">{t("Intro-des")}</p>
        <div className="bg-white dark:bg-default-100 shadow-lg rounded-lg overflow-hidden p-7 my-7 text border-primary border-l-2">
          <h2 className="w-fit text-xl md:text-2xl font-bold mb-2 ">
            {t("section1-title")}
          </h2>
          <p className="text-lg mb-6">{t("section1-des")}</p>
        </div>
        <div className="bg-white dark:bg-default-100 shadow-lg rounded-lg overflow-hidden p-7 my-7">
          <h2 className="w-fit text-xl md:text-2xl font-bold mb-2">
            {t("section2-title")}
          </h2>
          <p className="text-lg mb-6">{t("section2-des")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="border-1 rounded-lg overflow-hidden">
              <Image
                width={50}
                height={50}
                src="/images/2bb.png"
                alt="Cutting-edge Technology"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  {t("section2-card1-title")}
                </h3>
                <p className="text-lg mb-4">{t("section2-card1-des")}</p>
              </div>
            </div>
            <div className="border-1 rounded-lg overflow-hidden">
              <Image
                width={50}
                height={50}
                src="/images/2bb.png"
                alt="Security and Trust"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  {t("section2-card2-title")}
                </h3>
                <p className="text-lg mb-4">{t("section2-card2-des")}</p>
              </div>
            </div>
            <div className="border-1 rounded-lg overflow-hidden">
              <Image
                width={50}
                height={50}
                src="/images/2bb.png"
                alt="User-friendly Interface"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  {t("section2-card3-title")}
                </h3>
                <p className="text-lg mb-4">{t("section2-card3-des")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-default-100 shadow-lg rounded-lg overflow-hidden p-7 my-7">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            {t("section3-title")}
          </h2>
          <p className="text-lg mb-6">{t("section3-des")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="border-1 rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  {t("section3-card1-title")}
                </h3>
                <p className="text-lg mb-4">{t("section3-card1-des")}</p>
              </div>
            </div>
            <div className="border-1 rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  {t("section3-card2-title")}
                </h3>
                <p className="text-lg mb-4">{t("section3-card2-des")}</p>
              </div>
            </div>
            <div className="border-1 rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  {t("section3-card3-title")}
                </h3>
                <p className="text-lg mb-4">{t("section3-card3-des")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-default-100 shadow-lg rounded-lg overflow-hidden p-7 my-7 border-primary border-l-2">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            {t("section4-title")}
          </h2>
          <p className="text-lg mb-6 whitespace-pre-line">
            {t("section4-des")}
          </p>
        </div>
        <div className="bg-white dark:bg-default-100 shadow-lg rounded-lg overflow-hidden p-7 my-7 border-primary border-l-2 w-fit">
          <h2 className="text-2xl font-bold mb-2">{t("section5-title")}</h2>
          <table className="table-auto m-auto">
            <thead>
              <tr>
                <th className="px-8 py-2">PNG</th>
                <th className="px-8 py-2">JPG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-8 py-2">
                  <Image
                    className="m-auto"
                    src="/images/logo/png/babelcoins-logo-64.png"
                    alt="babelcoins logo 64"
                    width={25}
                    height={25}
                  />
                  <Link
                    className="block m-auto text-center"
                    href="/images/logo/png/babelcoins-logo-64.png"
                  >
                    64 × 64
                  </Link>
                </td>
                <td className="border px-8 py-2">
                  <Image
                    className="m-auto"
                    src="/images/logo/jpg/babelcoins-logo-64.jpg"
                    alt="babelcoins logo 64"
                    width={25}
                    height={25}
                  />
                  <Link
                    className="block m-auto text-center"
                    href="/images/logo/jpg/babelcoins-logo-64.jpg"
                  >
                    64 × 64
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border px-8 py-2">
                  <Image
                    className="m-auto"
                    src="/images/logo/png/babelcoins-logo-512.png"
                    alt="babelcoins logo 512"
                    width={50}
                    height={50}
                  />
                  <Link
                    className="block m-auto text-center"
                    href="/images/logo/png/babelcoins-logo-512.png"
                  >
                    512 × 512
                  </Link>
                </td>
                <td className="border px-8 py-2">
                  <Image
                    className="m-auto"
                    src="/images/logo/jpg/babelcoins-logo-512.jpg"
                    alt="babelcoins logo 512"
                    width={50}
                    height={50}
                  />
                  <Link
                    className="block m-auto text-center"
                    href="/images/logo/jpg/babelcoins-logo-512.jpg"
                  >
                    512 × 512
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border px-8 py-2">
                  <Image
                    className="m-auto"
                    src="/images/logo/png/babelcoins-logo-1024.png"
                    alt="babelcoins logo 1024"
                    width={75}
                    height={75}
                  />
                  <Link
                    className="block m-auto text-center"
                    href="/images/logo/png/babelcoins-logo-1024.png"
                  >
                    1024 × 1024
                  </Link>
                </td>
                <td className="border px-8 py-2">
                  <Image
                    className="m-auto"
                    src="/images/logo/jpg/babelcoins-logo-1024.jpg"
                    alt="babelcoins logo 1024"
                    width={75}
                    height={75}
                  />
                  <Link
                    className="block m-auto text-center"
                    href="/images/logo/jpg/babelcoins-logo-1024.jpg"
                  >
                    1024 × 1024
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
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
