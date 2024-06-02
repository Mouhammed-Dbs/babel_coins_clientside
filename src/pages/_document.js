import { Html, Head, Main, NextScript } from "next/document";
import { getLangDir } from "rtl-detect";

export default function Document(props) {
  const direction = getLangDir(props.locale);
  return (
    <Html dir={direction}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
