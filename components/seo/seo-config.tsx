import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { CookieConsent } from 'react-cookie-consent';
import Link from "next/link";


export default function SEOConfig() {

    const GA_TRACKING_ID = 'G-KNXRE5QRXP';
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            (window as any).gtag('config', GA_TRACKING_ID, {
                page_path: url,
            });
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (<>
        <CookieConsent
            location="bottom"
            buttonText="Aceitar"
            declineButtonText="Recusar"
            cookieName="culturaVerdeConsent"
            style={{ background: "#2B373B" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}

            declineButtonStyle={{ color: "#fff", background: "#f44336", fontSize: "13px" }}
            expires={150}
        >
            Este site usa cookies para melhorar a experiência do usuário.{" "}
            <Link href="/about/privacy-policy" style={{ color: "#4e9c81" }}>
                Leia mais
            </Link>
        </CookieConsent>
        <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
        />
    </>
    );
}