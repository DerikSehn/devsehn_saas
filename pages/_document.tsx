

import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager-script" dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NZDTDC5B');`
        }} />
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KNXRE5QRXP"></Script>
        <Script id="google-analytics" dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KNXRE5QRXP');
          `
        }} />
      </Head>
      <body className="selection:bg-primary-200 selection:text-primary-900 selection:text-opacity-100 selection:bg-opacity-50">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NZDTDC5B"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}