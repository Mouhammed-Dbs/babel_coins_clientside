import { FaPhone } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <div className="border-t-4 border-indigo-500">
      <div className="grid grid-cols-1 md:grid-cols-4 mx-4 md:mx-16 border-b-1 border-gray-400">
        <div className="p-8 text-lg">
          <Image
            src={"/images/logo/webp/babelcoins-logo-512.webp"}
            alt="babelcoins logo"
            width={80}
            height={80}
          ></Image>
          <h1 className="self-center text-xl font-bold mt-4">Babel coins</h1>
          <p className="text-sm mt-1">
            it has functioned as a symbol of protection, of perfection, of the
            Devil, and of humanity
          </p>
        </div>
        <div className="p-8 mt-10">
          <h2 className="self-center text-xl font-bold">About</h2>
          <ul className="mt-3">
            <li className="my-2">
              <Link href="/about-us">About Us</Link>
            </li>
            <li className="my-2">
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li className="my-2">
              <Link href="/terms-and-service">Terms & Service</Link>
            </li>
            <li className="my-2">
              <Link href="/privacy-policy">Privacy policy</Link>
            </li>
          </ul>
        </div>
        <div className="p-8 mt-10">
          <h2 className="self-center text-xl font-bold">Service</h2>
          <ul className="mt-3">
            <li className="my-2">
              <Link href="/exchange">Exchange</Link>
            </li>
            <li className="my-2">
              <Link href="/solutions">Solutions</Link>
            </li>
            <li className="my-2">
              <Link href="/affiliates">Affiliates</Link>
            </li>
            <li className="my-2">
              <Link href="/fees">Fees</Link>
            </li>
          </ul>
        </div>
        <div className="p-8 mt-10">
          <h2 className="self-center text-xl font-bold">Learn</h2>
          <ul className="mt-3">
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center my-5">2024 © Babel Coins</p>
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
