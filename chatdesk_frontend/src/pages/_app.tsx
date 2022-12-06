import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";
import MainLayout from "../components/common/layout/page_layout/MainLayout";
import InitialLoader from "../components/common/loader/InitialLoader";
import { wrapper } from "../redux/store";
import "../styles/global.css";

// theme config
const colors = {
  brand: {
    900: "#000",
    800: "#000",
    700: "#000",
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  const { route } = useRouter();
  const [loader, setLoader] = useState<boolean>(true);

  setTimeout(() => {
    setLoader(false);
  }, 4000);

  return (
    <ChakraProvider theme={theme}>
      {loader ? (
        <InitialLoader />
      ) : (
        <>
          {route === "/" ? (
            <Component {...pageProps} />
          ) : (
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          )}
        </>
      )}
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
