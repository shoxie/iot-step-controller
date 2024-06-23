import DefaultLayout from "@/components/Layout/Default";
import theme from "@/lib/theme";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps & { Component: { Layout?: any } }) {
  const LayoutWrapper = Component.Layout || DefaultLayout;

  return (
    <ChakraProvider theme={theme}>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ChakraProvider>
  )
}
