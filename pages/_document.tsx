import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {


  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Cultura Verde oferece os melhores serviços de paisagismo." />
        <meta name="keywords" content="paisagismo, jardinagem, cultura verde" />
        <meta property="og:title" content="Cultura Verde - Excelência em Paisagismo" />
        <meta property="og:description" content="Cultura Verde oferece os melhores serviços de paisagismo." />
        <meta property="og:image" content="https://culturaverde.com.br/logo.png" />
        <meta property="og:url" content="https://culturaverde.com.br" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Cultura Verde - a excelência em paisagismo",
            "url": "https://culturaverde.com.br",
            "logo": "https://culturaverde.com.br/logo.png",
            "sameAs": [
              "https://www.facebook.com/culturaverde",
              "https://www.instagram.com/cultura_verde",
              "https://www.facebook.com/culturaverders"
            ]
          })
        }} />

      </Head>
      <body className="selection:bg-primary-200 selection:text-primary-900 selection:text-opacity-100 selection:bg-opacity-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
