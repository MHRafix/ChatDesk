import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Logo from "../../../../assets/images/logo_icons/logo.png";
import { colorSchema } from "../../../../utils/special";
import LoginForm from "../AccountContent/Login/LoginForm";
import RegistrationForm from "../AccountContent/Registration/RegistrationForm";

const AccountMain: React.FC = () => {
  return (
    <>
      <Head>
        <title>Chat Desk - Account</title>
        <meta
          name="description"
          content='This is "ChatDesk" a real time messaging application.'
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          w="100%"
          h="100vh"
          bgGradient="linear(to-r, #8BECBB, #3CC9F7)"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            w={{ base: "310px", sm: "600px" }}
            h="auto"
            py={0.5}
            px={2}
            borderRadius={7}
            bg={colorSchema.white}
            color={colorSchema.black}
          >
            <Box w="100%" mx="auto" my={2} textAlign="center">
              <Flex
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
              >
                <Image src={Logo} alt="logo" width={53} height={53} />
                &nbsp;
                <Heading as="h3" size="xl" letterSpacing={1.5}>
                  <Flex alignItems="center">
                    <Text color={colorSchema.green}>Chat</Text>
                    <Text color={colorSchema.skyBlue}>Desk</Text>
                  </Flex>
                </Heading>
              </Flex>
            </Box>
            <Flex my={1}>
              <Tabs variant="soft-rounded" colorScheme="green" w="100%">
                <TabList>
                  <Tab
                    color={colorSchema.skyBlue}
                    w="50%"
                    h="35px"
                    letterSpacing={1.2}
                  >
                    Login
                  </Tab>
                  <Tab
                    color={colorSchema.skyBlue}
                    w="50%"
                    h="35px"
                    letterSpacing={1.2}
                  >
                    Registration
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel px={1}>
                    <LoginForm />
                  </TabPanel>
                  <TabPanel px={1}>
                    <RegistrationForm />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default AccountMain;
