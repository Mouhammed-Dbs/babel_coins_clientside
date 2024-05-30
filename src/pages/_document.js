import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props) {
  return (
    <Html lang={props.local}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
