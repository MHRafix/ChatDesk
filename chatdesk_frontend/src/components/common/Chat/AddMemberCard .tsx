import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateGroupDetalis } from "../../../hooks/httpServices/httpSendReq";
import { colorSchema } from "../../../utils/special";

const AddMemberCard: React.FC<{
  member: ISignupApiRes;
  jwt_token: string | undefined;
  chatId: string;
  setShow: (state: boolean) => void;
}> = ({ member, jwt_token, chatId, setShow }) => {
  const { _id, user_name, user_pic } = member;
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const dispatch = useDispatch();

  // handle rename group
  const handleAddMember = () => {
    setLoading(true);
    const dependency = {
      jwt_token,
      setShow,
      setLoading,
      dispatch,
      toast,
      reqData: { chatId, userId: _id },
      endPoint: "add_member",
    };

    updateGroupDetalis(dependency);
  };

  return (
    <Flex
      alignItems="center"
      w="98%"
      h="70px"
      display="flex"
      cursor="pointer"
      borderRadius={5}
      p={1}
      px={2}
      bg={colorSchema.grayWhite}
      shadow="xs"
      marginX={1}
      marginBottom={2}
      marginTop={0.5}
      id="chat_user_card"
      justifyContent="space-between"
    >
      <Flex alignItems="center">
        <Image
          src={user_pic}
          alt="user_pic"
          width={45}
          height={45}
          style={{ borderRadius: "9999999px" }}
        />
        &nbsp; &nbsp;
        <Text>{user_name}</Text>
      </Flex>
      <Flex alignItems="center">
        <Button
          colorScheme="whatsapp"
          letterSpacing={1.2}
          w="40px"
          h="40px"
          borderRadius={999}
          isLoading={loading}
          onClick={() => handleAddMember()}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={25}>+</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddMemberCard;
