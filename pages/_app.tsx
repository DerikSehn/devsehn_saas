import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { Layout } from "@/components/layout/layout";
import { SessionProvider } from "next-auth/react"
import { ToastProvider } from "@/components/providers/toast-provider";

export default function App({ Component,
  pageProps: { session, ...pageProps },

}: AppProps) {
  const router = useRouter();

  return (
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
  );
}

