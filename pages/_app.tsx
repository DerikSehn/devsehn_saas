import { Layout } from "@/components/layout/layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";


import { ToastProvider } from "@/components/providers/toast-provider";
import { ReactLenis } from '@studio-freight/react-lenis';
import { useState } from "react";

import "driver.js/dist/driver.css";


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
            </ReactLenis>
          </Layout>
        </ToastProvider>
      </div>
    </SessionProvider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}

  </QueryClientProvider>
  );
}

