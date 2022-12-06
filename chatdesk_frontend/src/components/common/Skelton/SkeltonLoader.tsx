import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";
import { colorSchema } from "../../../utils/special";

const SkeltonLoader: React.FC = () => {
  return (
    <>
      <Box
        padding="2"
        boxShadow="xs"
        margin={1}
        bg={colorSchema.grayWhite}
        borderRadius={5}
      >
        <SkeletonCircle size="7" />
        <SkeletonText mt="1" noOfLines={2} spacing="2" />
      </Box>
      <Box
        padding="2"
        boxShadow="xs"
        margin={1}
        bg={colorSchema.grayWhite}
        borderRadius={5}
      >
        <SkeletonCircle size="7" />
        <SkeletonText mt="1" noOfLines={2} spacing="2" />
      </Box>
      <Box
        padding="2"
        boxShadow="xs"
        margin={1}
        bg={colorSchema.grayWhite}
        borderRadius={5}
      >
        <SkeletonCircle size="7" />
        <SkeletonText mt="1" noOfLines={2} spacing="2" />
      </Box>
      <Box
        padding="2"
        boxShadow="xs"
        margin={1}
        bg={colorSchema.grayWhite}
        borderRadius={5}
      >
        <SkeletonCircle size="7" />
        <SkeletonText mt="1" noOfLines={2} spacing="2" />
      </Box>
      <Box
        padding="2"
        boxShadow="xs"
        margin={1}
        bg={colorSchema.grayWhite}
        borderRadius={5}
      >
        <SkeletonCircle size="7" />
        <SkeletonText mt="1" noOfLines={2} spacing="2" />
      </Box>
    </>
  );
};

export default SkeltonLoader;
