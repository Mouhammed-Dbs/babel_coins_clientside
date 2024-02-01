import * as React from "react";
import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.scss";
import { Montserrat } from "next/font/google";
import Providers from "@/providers";
import Head from "next/head";
import { usePathname } from "next/navigation";
import StaticLayout from "@/layouts/StaticLayout";
import { useRouter } from "next/router";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  // const currentRoute = usePathname();
  const currentRoute = useRouter().asPath
  const namePage = currentRoute.charAt(1).toUpperCase() + currentRoute.slice(2);
  return (
    <Providers>
      <Head>
        <title>{currentRoute == "/" ? "Babel Coins" : namePage}</title>
        <link rel="icon" href="/images/logo.svg" sizes="32x32" />
      </Head>
      {currentRoute !== "/signup" && currentRoute !== "/contacts" && currentRoute !== "/login" && currentRoute !== "/recovery" ? (
        <MainLayout className={montserrat.variable}>
          <Component {...pageProps} />
        </MainLayout>
      ) : (
        <StaticLayout>
          <Component {...pageProps} />
        </StaticLayout>
      )}
    </Providers>
  );
}
