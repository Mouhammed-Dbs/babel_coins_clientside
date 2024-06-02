import "@/styles/globals.css";
import Providers from "@/providers";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const MainLayout = dynamic(() => import("@/layouts/MainLayout"));
const HomeLayout = dynamic(() => import("@/layouts/HomeLayout"));
const StaticLayout = dynamic(() => import("@/layouts/StaticLayout"));
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
const montserrat = Montserrat({ subsets: ["latin"], weight: "500" });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noMetaTags = ["login", "signup"];
  const currentRoute = router.asPath;
  const namePage =
    currentRoute.charAt(1).toUpperCase() +
    currentRoute.slice(2).replaceAll("-", " ");
  const staticRoutes = ["signup", "contact-us", "login", "recovery"];
  const accountRoutes = ["account"];

  return (
    <Providers pageProps={pageProps}>
      <Head>
        <title>{currentRoute === "/" ? "Babel Coins" : namePage}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* PWA */}
        <link
          rel="mask-icon"
          href="/images/logo/maskable/maskable-babelcoins-logo-192.png"
          color="#FFFFFF"
        />
        <meta name="theme-color" content="#6138f4" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          href="/images/logo/png/babelcoins-logo-180.png"
        />
        {!noMetaTags.includes(currentRoute.slice(1)) ? (
          <>
            <meta
              name="robots"
              content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
            />
            <link
              rel="canonical"
              href={`https://babelcoins.com${currentRoute}`}
            />
            <meta property="og:locale" content="en_US" />
            <link rel="profile" href="http://gmpg.org/xfn/11" />
            <link
              rel="alternate"
              hrefLang="en"
              href={`https://babelcoins.com${currentRoute}`}
            />
            <meta
              property="og:updated_time"
              content="2021-11-26T10:11:59+00:00"
            />
            <meta property="og:image" content="main image url" />
            <meta property="og:image:secure_url" content="main image url" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="675" />
            <meta property="og:image:alt" content="main image alt" />
            <meta property="og:image:type" content="image/jpeg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={namePage} />
            <meta name="twitter:description" content="" />
            <meta name="twitter:site" content="@babelcoins" />
            <meta name="twitter:creator" content="@babelcoins" />
            <meta name="twitter:image" content="main image url" />
            <meta name="twitter:label1" content="Time to read" />
            <meta name="twitter:data1" content="3 minutes" />
            {/* For Home Page Only */}
            {currentRoute === "/" ? (
              <meta property="og:type" content="website" />
            ) : (
              <>
                <meta property="og:type" content="article" />
                <meta
                  property="article:publisher"
                  content="https://babelcoins.com"
                />
                <meta
                  property="article:author"
                  content="https://babelcoins.com"
                />
                <meta
                  property="article:published_time"
                  content="2021-11-26T09:31:26+00:00"
                />
                <meta
                  property="article:modified_time"
                  content="2021-11-26T10:11:59+00:00"
                />
              </>
            )}
          </>
        ) : (
          <>
            <meta
              name="robots"
              content="max-image-preview:large, noindex, noarchive"
            />
          </>
        )}

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

        <meta
          name="msapplication-TileImage"
          content="/images/logo/png/babelcoins-logo-270.png"
        />
      </Head>

      <main
        className={montserrat.className}
        style={{ direction: router.locale === "ar" ? "rtl" : "ltr" }}
      >
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
