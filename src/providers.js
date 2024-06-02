"use client";

import { NextUIProvider } from "@nextui-org/system";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";

export default function Providers({ children, pageProps }) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Europe/Amsterdam"
      messages={pageProps.messages}
    >
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </NextUIProvider>
    </NextIntlClientProvider>
  );
}
