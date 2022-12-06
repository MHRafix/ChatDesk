import { Box, Checkbox, Flex, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeMember, storeMember } from "../../../redux/user_data/action";

const SelectMembers: React.FC<{
  user_data: ICUser;
}> = ({ user_data: { _id, user_name, user_pic } }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <Box
      shadow="md"
      p={2}
      my={2}
      borderRadius={5}
      cursor="pointer"
      _hover={{
        background: "#76cb8030",
        duration: ".3s",
      }}
    >
      <Checkbox colorScheme="green">
        <Flex
          alignItems="center"
          onClick={() => {
            if (checked) {
              setChecked((state: boolean) => (state ? false : true));
              dispatch(removeMember({ id: _id, user_pic }));
            } else {
              setChecked((state: boolean) => (state ? false : true));
              dispatch(storeMember({ id: _id, user_pic }));
            }
          }}
        >
          <Image
            src={user_pic}
            alt="user_pic"
            width={35}
            height={35}
            style={{ borderRadius: "100px" }}
          />
          <Text mx={2} letterSpacing={1.2} fontWeight={500}>
            {user_name}
          </Text>
        </Flex>
      </Checkbox>
    </Box>
  );
};

export default SelectMembers;
