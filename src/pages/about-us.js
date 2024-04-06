import Link from "next/link";
import Image from "next/image";
export default function AboutUs() {
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
              About <span className="text-primary">Babelcoins</span>
            </h1>
            <p className="text-lg hidden md:block">
              {
                "At Babelcoins, we are dedicated to revolutionizing the way people engage with digital currencies. With a vision to democratize access to the world of cryptocurrencies, we've built a platform that offers seamless, secure, and transparent trading experiences for everyone, from seasoned traders to newcomers."
              }
            </p>
          </div>
        </div>
        <p className="text-lg px-7 py-5 block md:hidden">
          {
            "At Babelcoins, we are dedicated to revolutionizing the way people engage with digital currencies. With a vision to democratize access to the world of cryptocurrencies, we've built a platform that offers seamless, secure, and transparent trading experiences for everyone, from seasoned traders to newcomers."
          }
        </p>
        <div className="bg-white dark:bg-default-100 shadow-lg rounded-lg overflow-hidden p-7 my-7 text border-primary border-l-2">
          <h2 className="w-fit text-xl md:text-2xl font-bold mb-2 ">
            Our Mission
          </h2>
          <p className="text-lg mb-6">
            {
              "Our mission at Babelcoins is clear: to empower individuals and organizations worldwide to harness the full potential of digital currencies. Whether you're looking to diversify your investment portfolio, explore new financial opportunities, or simply learn more about this rapidly evolving space, we're here to support you every step of the way."
            }
          </p>
        </div>
        <div className="bg-white dark:bg-default-100 shadow-lg rounded-lg overflow-hidden p-7 my-7">
          <h2 className="w-fit text-xl md:text-2xl font-bold mb-2">
            Our Commitment to Excellence
          </h2>
          <p className="text-lg mb-6">
            {
              "At Babelcoins, excellence is not just a goal; it's a standard we uphold in everything we do. Here's what sets us apart:"
            }
          </p>
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
                  Cutting-edge Technology
                </h3>
                <p className="text-lg mb-4">
                  We leverage the latest advancements in blockchain technology
                  and security protocols to ensure that our platform is not only
                  robust and reliable but also at the forefront of innovation.
                </p>
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
                <h3 className="text-xl font-bold mb-2">Security and Trust</h3>
                <p className="text-lg mb-4">
                  The security of your assets and personal information is our
                  top priority. We employ industry-leading security measures,
                  including encryption, multi-factor authentication, and cold
                  storage solutions, to safeguard your funds and data.
                </p>
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
                  User-friendly Interface
                </h3>
                <p className="text-lg mb-4">
                  {
                    "We believe that accessing the world of cryptocurrencies should be intuitive and straightforward. That's why we've designed our platform with a user-friendly interface, making it easy for anyone to buy, sell, and trade digital currencies with confidence."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-default-100 shadow-lg rounded-lg overflow-hidden p-7 my-7">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            Our Comprehensive Services
          </h2>
          <p className="text-lg mb-6">
            Babelcoins offers a comprehensive suite of services designed to meet
            the diverse needs of our users:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="border-1 rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  Digital Currency Exchange
                </h3>
                <p className="text-lg mb-4">
                  Our exchange platform allows you to buy, sell, and trade a
                  wide range of digital currencies, including Bitcoin, Ethereum,
                  Litecoin, and more, with competitive fees and lightning-fast
                  execution.
                </p>
              </div>
            </div>
            <div className="border-1 rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  Educational Resources
                </h3>
                <p className="text-lg mb-4">
                  {
                    "Whether you're a novice or an experienced trader, our educational resources are here to help you deepen your understanding of cryptocurrencies and refine your trading strategies. From beginner's guides to advanced technical analysis tutorials, we've got you covered."
                  }
                </p>
              </div>
            </div>
            <div className="border-1 rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">
                  Dedicated Customer Support
                </h3>
                <p className="text-lg mb-4">
                  Have a question or need assistance? Our dedicated customer
                  support team is available 24/7 to provide you with prompt,
                  personalized assistance whenever you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-default-100 shadow-lg rounded-lg overflow-hidden p-7 my-7 border-primary border-l-2">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            Join the Babelcoins Community
          </h2>
          <p className="text-lg mb-6">
            {
              "Join thousands of traders and investors who have chosen Babelcoins as their preferred platform for accessing the world of digital currencies. Whether you're looking to build wealth, diversify your portfolio, or simply explore new opportunities, we invite you to join us on this exciting journey."
            }
          </p>
          <p className="text-lg">
            Thank you for choosing Babelcoins. We look forward to helping you
            achieve your financial goals and empowering you to unlock the full
            potential of digital currencies.
          </p>
          <p className="text-lg">The Babelcoins Team</p>
        </div>
        <div className="bg-white dark:bg-default-100 shadow-lg rounded-lg overflow-hidden p-7 my-7 border-primary border-l-2 w-fit">
          <h2 className="text-2xl font-bold mb-2">Our Logo</h2>
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
