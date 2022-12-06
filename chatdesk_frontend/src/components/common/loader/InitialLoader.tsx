import { Box, Flex, Heading, Progress, Text } from "@chakra-ui/react";
import Lottie from "react-lottie";
import { flexLayout } from "../../../styles/style";
import { colorSchema, initialChatLoaderOptions } from "../../../utils/special";

const InitialLoader = () => {
  return (
    <Box width="100vw" height="100vh" style={flexLayout} textAlign="center">
      <Box style={{ margin: "auto" }}>
        <Lottie
          width="250px"
          height="150px"
          options={initialChatLoaderOptions}
        />
        <Flex alignItems="center" justifyContent="center" cursor="pointer">
          <Heading as="h3" size="xl" letterSpacing={1.5}>
            <Flex alignItems="center">
              <Text color={colorSchema.deepGreen}>Chat</Text>
              <Text color={colorSchema.skyBlue}>Desk</Text>
            </Flex>
          </Heading>
        </Flex>
        <Progress
          size="sm"
          mt={5}
          borderRadius={100}
          colorScheme="green"
          isIndeterminate
        />
      </Box>
    </Box>
  );
};

export default InitialLoader;
