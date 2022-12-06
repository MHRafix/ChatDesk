import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { useAuth } from "../../../../hooks/userInfo/userAuth";
import Header from "../../header/Header";

type Props = { children: JSX.Element };

const MainLayout: React.FC<Props> = ({ children }) => {
  useAuth();
  return (
    <>
      <Head>
        <title>Chat Desk</title>
        <meta
          name="description"
          content='This is "ChatDesk" a real time messaging application.'
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header_main_wrapper">
        <Header />
      </header>
      <main>
        <Box w="100%" h="89vh">
          {children}
        </Box>
      </main>
    </>
  );
};

export default MainLayout;
