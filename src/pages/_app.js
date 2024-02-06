import * as React from "react";
import HomeLayout from "@/layouts/HomeLayout";
import "@/styles/globals.scss";
import { Montserrat } from "next/font/google";
import Providers from "@/providers";
import Head from "next/head";
import StaticLayout from "@/layouts/StaticLayout";
import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
const montserrat = Montserrat({ subsets: ["latin"], weight: "600" });

export default function App({ Component, pageProps }) {
  // const currentRoute = usePathname();
  const currentRoute = useRouter().asPath;
  const namePage = currentRoute.charAt(1).toUpperCase() + currentRoute.slice(2);
  const staticRoutes = ["signup", "contacts", "login", "recovery"];
  return (
    <Providers>
      <Head>
        <title>{currentRoute == "/" ? "Babel Coins" : namePage}</title>
        <link rel="icon" href="/images/logo.svg" sizes="32x32" />
      </Head>
      <main className={montserrat.className}>
        {staticRoutes.indexOf(currentRoute.slice(1)) > 0 ? (
          <StaticLayout>
            <Component {...pageProps} />
          </StaticLayout>
        ) : currentRoute.slice(1) === "account" ? (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        ) : (
          <HomeLayout>
            <Component {...pageProps} />
          </HomeLayout>
        )}
      </main>
    </Providers>
  );
}
