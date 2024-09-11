import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="selection:bg-primary-200 selection:text-primary-900 selection:text-opacity-100 selection:bg-opacity-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
