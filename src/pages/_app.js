import React from "react";
import "@/styles/globals.scss";
import Providers from "@/providers";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const MainLayout = dynamic(() => import("@/layouts/MainLayout"));
const HomeLayout = dynamic(() => import("@/layouts/HomeLayout"));
const StaticLayout = dynamic(() => import("@/layouts/StaticLayout"));
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"], weight: "500" });

export default function App({ Component, pageProps }) {
  const currentRoute = useRouter().asPath;
  const namePage = currentRoute.charAt(1).toUpperCase() + currentRoute.slice(2);
  const staticRoutes = ["signup", "contact-us", "login", "recovery"];
  const accountRoutes = ["account"];
  return (
    <Providers>
      <Head>
        <title>{currentRoute == "/" ? "Babel Coins" : namePage}</title>
        <link
          rel="icon"
          href="/images/logo/png/babelcoins-logo-32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/images/logo/png/babelcoins-logo-192.png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="/images/logo/png/babelcoins-logo-180.png"
        />
        <meta
          name="msapplication-TileImage"
          content="/images/logo/png/babelcoins-logo-270.png"
        />
      </Head>
      <main className={montserrat.className}>
        {staticRoutes.filter((router) => currentRoute.includes(router)).length >
        0 ? (
          <StaticLayout>
            <Component {...pageProps} />
          </StaticLayout>
        ) : accountRoutes.filter((router) => currentRoute.includes(router))
            .length > 0 ? (
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
