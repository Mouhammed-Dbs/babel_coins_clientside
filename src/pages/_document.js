import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="installContainer" className="hidden">
          <button id="butInstall" type="button">
            Install
          </button>
        </div>
        <script src="/app/script.js" defer></script>
        <div
          className="glitchButton"
          style={{ position: "fixed", top: "20px", right: "20px" }}
        ></div>
        <script src="/app/button.js" defer></script>
      </body>
    </Html>
  );
}
