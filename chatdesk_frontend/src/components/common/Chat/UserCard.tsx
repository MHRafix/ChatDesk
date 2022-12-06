import { Box, Flex, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleCreateChat } from "../../../hooks/httpServices/httpSendReq";
import { name_heading } from "../../../styles/style";
import { colorSchema } from "../../../utils/special";

const UserCard = ({
  user_data,
  onClose,
}: {
  user_data: ISignupApiRes;
  onClose: () => void;
}) => {
  const user: ISignupApiRes = useSelector(
    (state: ISelectorState) => state.user_info.user_data
  );

  const [loading, setLoading] = useState<boolean>(false);
  const { _id, user_name, user_pic } = user_data;
  const toast = useToast();
  const dispatch = useDispatch();

  const dependencies: IChatCreateDep = {
    _id,
    uid: user?._id,
    setLoading,
    jwt_token: user?.token,
    onClose,
    dispatch,
    toast,
  };

  return (
    <Box
      h="50px"
      display="flex"
      alignItems="center"
      justifyContent="between"
      cursor="pointer"
      borderRadius={5}
      p={1}
      bg={colorSchema.grayWhite}
      shadow="xs"
      marginY={2}
      id="chat_user_card"
      onClick={() => handleCreateChat(dependencies)}
    >
      <Flex alignItems="center" w="16%">
        <Image
          src={user_pic}
          alt="user_pic"
          width={35}
          height={35}
          style={{ borderRadius: "9999999px" }}
        />
      </Flex>

      <Box mx={1.5} w="60%">
        <Text
          style={name_heading}
          letterSpacing="1px"
          textTransform="capitalize"
        >
          {user_name}
        </Text>
        {loading && (
          <Stack>
            <Spinner size="xs" />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default UserCard;
