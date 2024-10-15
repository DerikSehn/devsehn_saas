import { Layout } from "@/components/layout/layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import CookieConsent from 'react-cookie-consent';


import { ToastProvider } from "@/components/providers/toast-provider";
import { ReactLenis } from '@studio-freight/react-lenis';
import { useState } from "react";

import "driver.js/dist/driver.css";
import Link from "next/link";


export default function App({ Component,
  pageProps: { session, ...pageProps },

}: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient())

  return (<QueryClientProvider client={queryClient}>
    <SessionProvider session={pageProps.session}>
      <div key={router.pathname}>
        <ToastProvider>
          <Layout>
            <ReactLenis root options={{ touchMultiplier: 0, syncTouch: false }}>
              <Component {...pageProps} />
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
            </ReactLenis>
          </Layout>
        </ToastProvider>
      </div>
    </SessionProvider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}

  </QueryClientProvider>
  );
}

