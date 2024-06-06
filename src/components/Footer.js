import { CiLocationOn, CiMail } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <div className="border-t-4 border-indigo-500">
      <div className="md:flex mx-4 md:mx-16 border-b-1 border-gray-400 pb-5">
        <div className="py-8 text-lg w-60">
          <Image
            src={"/images/logo/webp/babelcoins-logo-512.webp"}
            alt="babelcoins logo"
            width={80}
            height={80}
          ></Image>
          <h1 className="self-center text-xl font-bold mt-4">Babel coins</h1>
          <p className="text-sm mt-1"> {t("des")}</p>
          <span className="flex gap-1 items-center text-sm mt-4 font-bold">
            <CiLocationOn />
            {t("location")}
          </span>
        </div>
        <div className="w-fit grid grid-cols-1 md:grid-cols-3 md:gap-10 rtl:md:mr-40 ltr:md:ml-40">
          <div className="py-2 md:py-8 mt-3 md:mt-10">
            <h2 className="self-center text-xl font-bold"> {t("h-About")}</h2>
            <ul className="mt-3">
              <li className="my-2">
                <Link className="hover:text-primary" href="/about-us">
                  {t("a-About")}
                </Link>
              </li>
              <li className="my-2">
                <Link className="hover:text-primary" href="/contact-us">
                  {t("a-Contact")}
                </Link>
              </li>
              <li className="my-2">
                <Link className="hover:text-primary" href="/terms-and-service">
                  {t("a-TermsAndService")}
                </Link>
              </li>
              <li className="my-2">
                <Link className="hover:text-primary" href="/privacy-policy">
                  {t("a-PrivacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="py-2 md:py-8 mt-3 md:mt-10">
            <h2 className="self-center text-xl font-bold">{t("h-Service")}</h2>
            <ul className="mt-3">
              <li className="my-2">
                <Link className="hover:text-primary" href="/fees">
                  {t("a-Fees")}
                </Link>
              </li>
              <li className="my-2">
                <Link className="hover:text-primary" href="/affiliates">
                  {t("a-Affiliates")}
                </Link>
              </li>
              <li className="my-2">
                <Link className="hover:text-primary" href="/exchange">
                  {t("a-Exchange")}
                </Link>
              </li>
              <li className="my-2">
                <Link className="hover:text-primary" href="/solutions">
                  {t("a-Solutions")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="py-2 md:py-8 mt-3 md:mt-10">
            <h2 className="self-center text-xl font-bold">{t("h-Learn")}</h2>
            <ul className="mt-3">
              <li>
                <Link className="hover:text-primary" href="/blog">
                  {t("a-Blog")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-center py-5">2024 © Babelcoins</p>
      {/* <div className="flex justify-self-center mb-6 pb-6 md:pb-0 order-1 md:order-none">
        <div className="w-full self-end">
          <div className="flex justify-between w-64">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
          <p className="text-center mt-3">2024 © Babel Coins</p>
        </div>
      </div>
      <div className="text-left justify-self-start md:justify-self-end p-8 pt-0 md:pt-9 text-lg">
        <h1 className="font-bold text-xl mb-2">Contact Us</h1>
        <div className="flex items-center mb-2">
          <FaPhone className="mr-4" size={20} />
          <p className="text-sm">Phone: +123 456 7890</p>
        </div>
        <div className="flex items-center">
          <CiMail className="mr-4" size={20} />
          <p className="text-sm">Email: example@example.com</p>
        </div>
      </div> */}
    </div>
  );
}
